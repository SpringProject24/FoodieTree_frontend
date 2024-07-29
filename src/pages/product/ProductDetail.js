import React from 'react';
import styles from './ProductDetailModal.module.scss';

const ProductDetail = ({ productDetail }) => {
    if (!productDetail || !productDetail.storeInfo) return null;

    const { storeAddress, pickUpTime, price, desc } = productDetail.storeInfo;

    return (
        <div className={styles.productDetail}>
            <p>Special Pack Information</p>
            <div className={styles.map}>
                <div className={styles.mapImg}>Map Placeholder</div>
                <div className={styles.storeAddress}>
                    <p>Pickup Address</p>
                    <p>{storeAddress}</p>
                </div>
            </div>
            <div className={styles.sectionLine}></div>
            <div className={styles.pickUpTimeInfo}>
                <p>Pickup Time</p>
                <p>{pickUpTime}</p>
            </div>
            <div className={styles.sectionLine}></div>
            <div className={styles.productInfo}>
                <div className={styles.price}>
                    <p>Product Price</p>
                    <p>{price}</p>
                </div>
                <div className={styles.sectionLine}></div>
                <div className={styles.productDes}>
                    <p>Product Description</p>
                    <p className={styles.productTextDesc}>{desc}</p>
                </div>
            </div>
        </div>
    );
};

export default ProductDetail;
