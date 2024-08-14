import React, {useState} from 'react';
import styles from "./SearchList.module.scss";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faBoxOpen, faHeart as faHeartSolid, faWonSign} from "@fortawesome/free-solid-svg-icons";
import {faHeart as faHeartRegular} from "@fortawesome/free-regular-svg-icons";
import {DEFAULT_IMG, imgErrorHandler} from "../../utils/error";
import {useModal} from "../../pages/common/ModalProvider";
import {FAVORITESTORE_URL} from "../../config/host-config";
import {authFetch, getRefreshToken, getToken} from "../../utils/authUtil";
import {useSearchParams} from "react-router-dom";

const toggleFavorite = async (storeId) => {
    try {
        const response = await authFetch(`${FAVORITESTORE_URL}/${storeId}`, {
            method: 'POST',
        });
        const data = await response.json();
        if (response.ok) {
            console.log(data);
        } else {
            console.error(data);
        }
    } catch (error) {
        console.error('⚠️Error toggling:', error);
    }
};

const SearchList = ({stores = []}) => {
    const {openModal} = useModal();
    const [favorites, setFavorites] = useState({});
    const [keyword, setKeyword] = useSearchParams();

    const favClickHandler = async (e, storeId) => {
        e.stopPropagation();
        await toggleFavorite(storeId);
        setFavorites(prevFavorites => ({
            ...prevFavorites,
            [storeId]: !prevFavorites[storeId]
        }));
    };

    const clickHandler = (store) => {
        openModal('productDetail', { productDetail: store });
    };

    return (
        <div className={styles.list}>
            <h1
                className={`${styles.storeList} ${stores.length === 0 && styles.empty}`}>
                검색 결과{ stores.length > 0 ? ` '${keyword.get('q')}'` : '가 없습니다.' }
            </h1>
            <div className={styles.categoryContainer}>
                {
                    stores.length > 0 &&
                    stores.map((store, index) => (
                        <div
                            key={index}
                            className={`${styles.categoryItem} ${store.productCnt === 1 ? styles['low-stock'] : ''}`}
                            onClick={() => clickHandler(store)}
                        >
                            <div
                                className={`${styles.heartIcon} ${favorites[store.storeId] ? styles.favorited : styles.notFavorited}`}
                                onClick={(e) => favClickHandler(e, store.storeId)}
                            >
                                <FontAwesomeIcon
                                    icon={favorites[store.storeId] ? faHeartSolid : faHeartRegular}
                                />
                            </div>
                            <img src={store.storeImg || DEFAULT_IMG} alt={store.storeName}
                                 className={styles.categoryImage} onError={imgErrorHandler}/>
                            {store.productCnt === 1 && <div className={styles.overlay}>SOLD OUT</div>}
                            <p className={styles.categoryName}>{store.storeName}</p>
                            <span className={styles.storePrice}><FontAwesomeIcon
                                icon={faWonSign}/> {store.price}원</span>
                            <span className={styles.productCnt}><FontAwesomeIcon
                                icon={faBoxOpen}/> {store.productCnt}/{store.productCnt}</span>
                        </div>
                    ))
                }
            </div>
        </div>
    );
};

export default SearchList;