import React, { useState } from 'react';
import styles from './ProductDetailModal.module.scss';
import { faMinus, faPlus, faShoppingCart, faStar, faTag } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const PaymentBox = () => {
    const [initialCount, setInitialCount] = useState(1);

    const handleIncrease = () => {
        setInitialCount(prevCount => prevCount + 1);
    };

    const handleDecrease = () => {
        if (initialCount > 1) {
            setInitialCount(prevCount => prevCount - 1);
        }
    };

    return (
        <section className={styles.paymentBox}>
            <div>
                <p className={styles.amountDesText}>구매하고자 하는 스페셜 팩의 수량을 알려주세요</p>
                <div className={styles.productAmtAdjustBtn}>
                    <button className={styles.adjustBtn} onClick={handleDecrease} disabled={initialCount <= 1}>
                        <FontAwesomeIcon icon={faMinus} />
                    </button>
                    <p className={styles.initialCnt}>{initialCount}</p>
                    <button className={styles.adjustBtn} onClick={handleIncrease}>
                        <FontAwesomeIcon icon={faPlus} />
                    </button>
                </div>
            </div>

            <div className={styles.pay}>
                <p className={styles.saving}>
                    <FontAwesomeIcon icon={faStar} />
                    12000원을 아끼고 있어요!
                </p>
                <div className={styles.reservationBtn}>
                    <p>Place Order</p>
                    <p>5900원</p>
                </div>
            </div>
            <div className={styles.orderSum}>
                <FontAwesomeIcon icon={faShoppingCart} />
                <p className={styles.orderAmount}>총 주문 수량</p>
                <p>1 개</p>
            </div>
            <div className={styles.sectionLine}></div>
            <div className={styles.promoCode}>
                <FontAwesomeIcon icon={faTag} />
                <p className={styles.promoText}>Promo codes, rewards & gift Cards</p>
            </div>
            <div className={styles.sectionLine}></div>
            <div className={styles.billSection}>
                <div className={styles.originPrice}>
                    <p>실제 판매 가격</p>
                    <p>20000원</p>
                </div>
                <div className={styles.discount}>
                    <p>얼만큼 할인 되었는지</p>
                    <p>14100원</p>
                </div>
                <div className={styles.sectionLine}></div>
                <div className={styles.totalBill}>
                    <p className={styles.totalPrice}>총액 </p>
                    <p className={styles.totalAmount}>5900원</p>
                </div>
            </div>
        </section>
    );
};

export default PaymentBox;