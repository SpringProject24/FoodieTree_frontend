import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleUser, faStore } from "@fortawesome/free-solid-svg-icons";
import styles from "./MyInfo.module.scss";
import { useNavigate } from "react-router-dom";
import {getRefreshToken, getToken, getUserRole} from "../../utils/authUtil";

// 내 정보 들어가기
const MyInfo = () => {
    const [userInfo, setUserInfo] = useState(null); // 사용자 정보를 저장할 상태
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUserInfo = async () => {
            try {
                console.log("유저 이미지 가져오기 ! ");
                const response = await fetch(`/user/info`, {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ` + getToken(),
                        "refreshToken" : getRefreshToken()
                    }
                });

                if (response.ok) {
                    const data = await response.json();
                    console.log("fetched userInfo data : ", data);

                    // 유저 타입에 따라 다른 키와 값을 로컬 스토리지에 저장
                    if (getUserRole() === 'store') {
                        localStorage.setItem('userImage', data.productImg);
                    } else if (getUserRole() === 'customer') {
                        localStorage.setItem('userImage', data.profileImage);
                    }

                    setUserInfo(data);
                } else {
                    console.error("Failed to fetch user info");
                }
            } catch (error) {
                console.error("Error fetching user info", error);
            }
        };

        fetchUserInfo();
    }, []); // 빈 배열로 설정해 컴포넌트가 마운트될 때 한 번만 호출되도록 함

    const handleIconClick = (path) => {
        navigate(path);
    };

    if (!userInfo) {
        return null; // 로딩 중이거나 정보가 없을 때는 아무것도 렌더링하지 않음
    }

    return (
        <div className={styles.myInfoContainer}>
            <span className={styles.myInfo}>안녕하세요 {userInfo.email}님!</span>
            <div className={styles.myIconContainer}>
                {getUserRole() === 'store' ? (
                    <>
                        {/* Store 아이콘과 프로필 이미지 */}
                        <img
                            src={userInfo.productImg}
                            alt="Store Profile"
                            className={styles.profileImage}
                            onClick={() => handleIconClick("/store")}
                        />
                        <FontAwesomeIcon
                            icon={faStore}
                            onClick={() => handleIconClick("/store")}
                            className={styles.myIcon}
                        />
                    </>
                ) : getUserRole() === 'customer' ? (
                    <>
                        {/* Customer 아이콘과 프로필 이미지 */}
                        <img
                            src={userInfo.profileImage}
                            alt="Customer Profile"
                            className={styles.profileImage}
                            onClick={() => handleIconClick("/customer")}
                        />
                        <FontAwesomeIcon
                            icon={faCircleUser}
                            onClick={() => handleIconClick("/customer")}
                            className={styles.myIcon}
                        />
                    </>
                ) : null}
            </div>
        </div>
    );
};

export default MyInfo;