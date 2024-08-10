import React, { useState, useEffect } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import styles from './FoodNav.module.scss'; // 수정된 SCSS 파일 경로
import { useModal } from '../../pages/common/ModalProvider';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWonSign, faBoxOpen, faHeart as faHeartSolid } from "@fortawesome/free-solid-svg-icons";
import { faHeart as faHeartRegular } from "@fortawesome/free-regular-svg-icons";
import { FAVORITESTORE_URL } from '../../config/host-config';
import {getUserData, getUserEmail} from "../../utils/authUtil";
import { DEFAULT_IMG, imgErrorHandler } from '../../utils/error';

// 하트 상태를 토글하고 서버에 저장하는 함수
const toggleFavorite = async (storeId, customerId) => {
    try {
        const response = await fetch(`${FAVORITESTORE_URL}/${storeId}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ customerId }),
        });

        const contentType = response.headers.get('Content-Type');
        if (contentType && contentType.includes('application/json')) {
            const data = await response.json();
        } else {
            const text = await response.text();
            console.error('⚠️Unexpected response format:', text);
        }

    } catch (error) {
        console.error('⚠️Error toggling:', error);
    }
};

// 사용자의 모든 찜 상태 조회
const fetchFavorites = async (customerId, setFavorites) => {
    try {
        const response = await fetch(`${FAVORITESTORE_URL}/${customerId}`);
        
        const contentType = response.headers.get('Content-Type');
        if (contentType && contentType.includes('application/json')) {
            const data = await response.json();
            const favorites = data.reduce((acc, store) => {
                acc[store.storeId] = true;
                return acc;
            }, {});
            setFavorites(favorites);
        } else {
            const text = await response.text();
            console.error('⚠️Unexpected response format:', text);
        }

    } catch (error) {
        console.error('⚠️Error fetching:', error);
    }
};

const BestStoreList = ({ stores = [] }) => {
    const { openModal } = useModal();
    const [favorites, setFavorites] = useState({});

    // customerId 더미값
    // const customerId = 'test@gmail.com';
    const customerId = getUserEmail();

    useEffect(() => {
        if (customerId) {
            fetchFavorites(customerId, setFavorites);
        }
    }, [customerId]);

    const handleClick = (store) => {
        openModal('productDetail', { productDetail: store });
    };

    const handleFavoriteClick = async (storeId) => {
        try {
            await toggleFavorite(storeId, customerId);

            setFavorites(prevFavorites => ({
                ...prevFavorites,
                [storeId]: !prevFavorites[storeId]
            }));
        } catch (error) {
            console.error('⚠️Error toggling:', error);
        }
    };

    const settings = {
        slidesToShow: 5,
        slidesToScroll: 5,
        infinite: true,
        arrows: true,
        dots: true,
        centerMode: true,
        centerPadding: '0',
        responsive: [
            {
                breakpoint: 400,
                settings: {
                    dots: false,
                    slidesToShow: 2,
                    centerPadding: '10%',
                },
            },
        ],
    };

    return (
        <div className={styles.list}>
            <h2 className={styles.title}>추천 가게</h2>
            <Slider {...settings} className={styles.slider}>
                {stores.length === 0 ? (
                    <div>No stores available</div>
                ) : (
                    stores.map((store, index) => (
                        <div
                            key={index}
                            className={`${styles.storeItem} ${store.productCnt === 1 ? styles['low-stock'] : ''}`}
                            onClick={() => handleClick(store)} 
                        >
                            <div 
                                className={`${styles.heartIcon} ${favorites[store.storeId] ? styles.favorited : styles.notFavorited}`} 
                                onClick={(e) => {
                                    e.stopPropagation();
                                    handleFavoriteClick(store.storeId);
                                }}
                            >
                                <FontAwesomeIcon 
                                    icon={favorites[store.storeId] ? faHeartSolid : faHeartRegular} 
                                />
                            </div>
                            <img src={store.storeImg || DEFAULT_IMG} alt={store.storeName}  onError={imgErrorHandler}/>
                            {store.productCnt === 1 && <div className={styles.overlay}>SOLD OUT</div>}
                            <p className={styles.storeName}>{store.storeName}</p>
                            <span className={styles.storePrice}><FontAwesomeIcon icon={faWonSign} /> {store.price}</span>
                            <span className={styles.productCnt}><FontAwesomeIcon icon={faBoxOpen} /> 수량: {store.productCnt}</span>
                        </div>
                    ))
                )}
            </Slider>
        </div>
    );
};

export default BestStoreList;
