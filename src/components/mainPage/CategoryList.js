import React, { useState, useEffect } from 'react';
import styles from './CategoryList.module.scss';
import { useModal } from '../../pages/common/ModalProvider';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWonSign, faBoxOpen, faHeart as faHeartSolid } from "@fortawesome/free-solid-svg-icons";
import { faHeart as faHeartRegular } from "@fortawesome/free-regular-svg-icons";

// 하트 상태를 토글하고 서버에 저장하는 함수
const toggleFavorite = async (storeId, customerId) => {
    try {
        const response = await fetch(`http://localhost:8083/api/favorites/${storeId}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ customerId }),
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const data = await response.json();
        console.log('Favorite toggled successfully:', data);
    } catch (error) {
        console.error('Error toggling favorite:', error);
    }
};

const fetchFavorites = async (customerId, setFavorites) => {
    try {
        const response = await fetch(`http://localhost:8083/api/favorites/user/${customerId}`);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        const favorites = data.reduce((acc, store) => {
            acc[store.storeId] = true;
            return acc;
        }, {});
        setFavorites(favorites);
    } catch (error) {
        console.error('Error fetching favorites:', error);
    }
};

const CategoryList = ({ stores }) => {
    const { openModal } = useModal();
    const [favorites, setFavorites] = useState({});

    // 실제 customerId와 storeId 설정
    const customerId = 'test@gmail.com'; // 실제 customerId
    const storeId = 'thdghtjd115@naver.com'; // 실제 storeId

    const handleClick = (store) => {
        openModal('productDetail', { productDetail: store });
    };

    const handleFavoriteClick = async (storeId) => {
        try {
            await toggleFavorite(storeId, customerId);

            // 찜 상태를 토글
            setFavorites(prevFavorites => ({
                ...prevFavorites,
                [storeId]: !prevFavorites[storeId]
            }));
        } catch (error) {
            console.error('Error toggling favorite:', error);
        }
    };

    useEffect(() => {
        if (customerId) {
            fetchFavorites(customerId, setFavorites);
        }
    }, [customerId]);

    return (
        <div className={styles.list}>
            <h1 className={styles.storeList}>우리 동네 가게 리스트</h1>
            <div className={styles.categoryContainer}>
                {stores.map((store, index) => (
                    <div 
                        key={index} 
                        className={`${styles.categoryItem} ${store.productCnt === 1 ? styles['low-stock'] : ''}`}
                        onClick={() => handleClick(store)}
                    >
                        <div 
                            className={styles.heartIcon} 
                            onClick={(e) => {
                                e.stopPropagation();
                                handleFavoriteClick(store.storeId);
                            }}
                        >
                            <FontAwesomeIcon 
                                icon={favorites[store.storeId] ? faHeartSolid : faHeartRegular} 
                                className={favorites[store.storeId] ? styles.favorited : styles.notFavorited}
                            />
                        </div>
                        <img src={store.storeImg} alt={store.storeName} className={styles.categoryImage} />
                        {store.productCnt === 1 && <div className={styles.overlay}>SOLD OUT</div>}
                        <p className={styles.categoryName}>{store.storeName}</p>
                        
                        <span className={styles.storePrice}><FontAwesomeIcon icon={faWonSign} /> {store.price}원</span>
                        <span className={styles.productCnt}><FontAwesomeIcon icon={faBoxOpen} /> {store.productCnt}/{store.productCnt}</span>
                    </div>
                ))}
            </div> 
        </div>
    );
}

export default CategoryList;
