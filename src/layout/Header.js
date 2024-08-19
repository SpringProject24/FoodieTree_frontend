import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getToken } from '../utils/authUtil';
import styles from './Header.module.scss';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import SideBarBtn from "../components/store/mypage-edit/SideBarBtn";
import { library } from '@fortawesome/fontawesome-svg-core';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import MyInfo from "../components/header/MyInfo";
import { getCurrentLocation, initializeNaverMapsForHeader, reverseGeocode } from "../utils/locationUtil";
import SidebarModal from "../components/header/SidebarModal";
import SearchInput from "../components/search/SearchInput";
import FavAreaSelector from '../components/mainPage/FavAreaSelector';

// 아이콘을 라이브러리에 추가
library.add(faMagnifyingGlass);

const Header = () => {
    const navigate = useNavigate();
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [width, setWidth] = useState(window.innerWidth);
    const [address, setAddress] = useState('위치를 불러오는 중...');
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedArea, setSelectedArea] = useState('');

    useEffect(() => {
        if (getToken()) {
            setIsAuthenticated(true);
        } else {
            setIsAuthenticated(false);
        }

        const fetchLocationAndAddress = () => {
            getCurrentLocation()
                .then(({ lat, lng }) => reverseGeocode(lat, lng))
                .then(address => {
                    setAddress(address);
                })
                .catch(error => {
                    console.error('위치 정보 또는 주소 변환 오류:', error);
                    setAddress('위치를 가져오는데 실패했습니다.');
                });
        };

        initializeNaverMapsForHeader()
            .then(fetchLocationAndAddress)
            .catch(error => {
                console.error('Naver Maps API 초기화 실패:', error);
                setAddress('지도 API 오류');
            });

        const storedAddress = sessionStorage.getItem('userAddress');
        if (storedAddress) {
            setAddress(JSON.parse(storedAddress));
        }

        // sessionStorage에서 selectedArea 가져오기
        const storedSelectedArea = sessionStorage.getItem('selectedArea');
        if (storedSelectedArea) {
            setSelectedArea(storedSelectedArea);
        }
    }, [isAuthenticated]);

    
  

    const handleAreaSelect = (area) => {
        setSelectedArea(area);
        sessionStorage.setItem('selectedArea', area);
    };

    const toggleModal = () => {
        setModalVisible(prev => !prev);
    };

    const handleClick = () => {
        navigate('/reviewMain');
    };

    return (
        <header className={styles.header}>
            {/* 햄버거 버튼 */}
            {width > 400 && <SideBarBtn onShow={toggleModal}/>}

            {/* 로고 */}
            <div className={styles.logoBtn}></div>

            {/* 지역 선택 */}
            <FavAreaSelector onAreaSelect={handleAreaSelect} />

            {/* 상점 검색 칸 */}
            {getToken() && (
                <div className={styles.searchStoreSection}>
                    <button className={styles.magnifyClickBtn}>
                        <FontAwesomeIcon icon="magnifying-glass" className={styles.magnifyIcon}/>
                    </button>
                    <SearchInput/>
                </div>
            )}

            {/* 리뷰 커뮤니티 메인 */}
            <div className={styles.reviewMainIcon} onClick={handleClick}></div>

            {/* 로그인 및 회원가입 버튼 */}
            <div className={styles.loginBtnSection}>
                {isAuthenticated ? (
                    <MyInfo/>
                ) : (
                    <>
                        <button className={styles.signInBtn} onClick={() => navigate('/sign-in')}> Sign in</button>
                        <div className={styles.dot}>・</div>
                        <button className={styles.signUpBtn} onClick={() => navigate('/sign-up')}> Sign up</button>
                    </>
                )}
            </div>

            {/* 모달 */}
            {modalVisible && <SidebarModal onClose={toggleModal} />}
        </header>
    );
}

export default Header;
