import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getToken, getRefreshToken } from '../utils/authUtil';
import styles from './Header.module.scss';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import SideBarBtn from "../components/store/mypage-edit/SideBarBtn";
import { library } from '@fortawesome/fontawesome-svg-core';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import MyInfo from "../components/header/MyInfo";

// 아이콘을 라이브러리에 추가
library.add(faMagnifyingGlass);

const Header = () => {
    const navigate = useNavigate();
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [show, setShow] = useState(false); // 햄버거 버튼 상태 관리
    const [width, setWidth] = useState(window.innerWidth);

    useEffect(() => {
        if (getToken() && getRefreshToken()) {
            setIsAuthenticated(true);
        } else {
            setIsAuthenticated(false);
        }
    }, []);

    const showHandler = () => {
        setShow(prev => !prev);
    }

    return (
        <header className={styles.header}>
            {/* 햄버거 버튼 */}
            {width > 400 && <SideBarBtn  className={styles.sideBarBtn} onShow={showHandler} />}

            {/* 로고 */}
            <div className={styles.logoBtn}></div>

            {/* 현재 위치 */}
            <div className={styles.locationPinIcon}></div>
            <div className={styles.areaName}>
                현재 위치를 확인할 수 없어요.
            </div>
            <div className={styles.dot}>・︎</div>
            <div className={styles.selectedAreaCategory}> Now </div>
            <button className={styles.selectedAreaCategoryBtn}></button>

            {/* 상점 검색 칸 */}
            <form className={styles.searchStoreSection}>
                <button className={styles.magnifyClickBtn}>
                    <FontAwesomeIcon icon="fa-solid fa-search" className={styles.magnifyIcon} />
                </button>
                <input
                    type="text"
                    placeholder="여기에 음식점 혹은 위치를 검색해보세요."
                />
            </form>

            {/* 로그인 및 회원가입 버튼 */}
            {isAuthenticated ?
                <MyInfo /> :
                <div className={styles.loginBtnSection}>
                    <button className={styles.signInBtn} onClick={() => navigate('/sign-in')}> Sign in</button>
                    <div className={styles.dot}>・︎</div>
                    <button className={styles.signUpBtn} onClick={() => navigate('/sign-up')}> Sign up</button>
                </div>
            }
        </header>
    );
}

export default Header;