import React from 'react';
import styles from './ProductDetailModal.module.scss';

const ProductDetail = ({ productDetail }) => {
    if (!productDetail || !productDetail.storeInfo) return null;

    const { storeAddress, openAt, closedAt, price } = productDetail.storeInfo;

    return (
        <div className={styles.productDetail}>
            <p>스페셜팩 정보</p>
            <div className={styles.map}>
                <div className={styles.mapImg}>지도 들어갈 자리</div>
                <div className={styles.storeAddress}>
                    <p>픽업 주소</p>
                    <p>{storeAddress}</p>
                </div>
            </div>
            <div className={styles.sectionLine}></div>
            <div className={styles.pickUpTimeInfo}>
                <p>픽업 시간</p>
                <p>{openAt} ~ {closedAt}</p>
            </div>
            <div className={styles.sectionLine}></div>
            <div className={styles.productInfo}>
                <div className={styles.price}>
                    <p>상품 가격</p>
                    <p>{price}원</p>
                </div>
            </div>
        </div>
    );
};

export default ProductDetail;
