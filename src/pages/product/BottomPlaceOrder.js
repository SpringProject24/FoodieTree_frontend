import React from 'react';
import styles from "./BottomPlaceOrder.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMinus, faPlus } from "@fortawesome/free-solid-svg-icons";

const BottomPlaceOrder = ({ makeReservation, productDetail, initialCount, handleIncrease, handleDecrease }) => {

    // productDetail의 존재를 확인하고, 없으면 기본 값을 사용
    const remainingProduct = productDetail?.storeInfo?.remainProduct || Infinity;

    // 구매하기 버튼 클릭 핸들러
    const handleMakeReservation = () => {
        console.log(initialCount);
        makeReservation(initialCount);
    }

    return (
        <div className={styles.bottomPlaceOrder}>
            <div className={styles.productAmtAdjustBtn}>
                <button 
                    className={styles.adjustBtn} 
                    onClick={handleDecrease} 
                    disabled={initialCount <= 1}
                >
                    <FontAwesomeIcon icon={faMinus} />
                </button>
                <p className={styles.initialCnt}>{initialCount}</p>
                <button 
                    className={styles.adjustBtn} 
                    onClick={handleIncrease} 
                    disabled={initialCount >= remainingProduct}
                >
                    <FontAwesomeIcon icon={faPlus} />
                </button>
            </div>
            <div className={styles.placeOrderBtn} onClick={handleMakeReservation}>
                <p>구매하기</p>
            </div>
        </div>
    );
};

export default BottomPlaceOrder;
