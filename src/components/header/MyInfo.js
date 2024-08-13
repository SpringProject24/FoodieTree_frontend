import React from 'react';
import {getUserEmail, getUserRole} from "../../utils/authUtil";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCircleUser, faStore} from "@fortawesome/free-solid-svg-icons";
import styles from "./MyInfo.module.scss";
import {useNavigate} from "react-router-dom";

// 내 정보 들어가기
const MyInfo = () => {
    const navigate = useNavigate();

    const handleIconClick = (path) => {
        navigate(path);
    };

    return (
        <>
            <div>
                {/*이메일 대신 nickname 가져오기*/}
                {getUserRole() === 'store' ? (
                    <>
                       <span className={styles.myInfo}> 안녕하세요 {getUserEmail()}님! </span>
                        {/*아이콘 안에 유저의 사진 넣기*/}
                        <FontAwesomeIcon icon={faStore} onClick={() => handleIconClick("/store")} className={styles.myIcon}/>
                    </>
                ) : getUserRole() === 'customer' ? (
                    <>
                        <span className={styles.myInfo}> 안녕하세요 {getUserEmail()}님! </span>
                        <FontAwesomeIcon icon={faCircleUser} onClick={() => handleIconClick("/customer")} className={styles.myIcon}/>
                    </>
                ) : null
                }

            </div>
        </>
    );
};

export default MyInfo;