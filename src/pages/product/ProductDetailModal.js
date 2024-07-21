import React, { useState } from 'react';
import { useModal } from "../common/ModalProvider";
import styles from './ProductDetailModal.module.scss';
import { faMinus, faPlus, faShoppingCart, faStar, faTag } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const ProductDetailModal = () => {

    const { closeModal } = useModal(); // useModal에서 closeModal 함수 가져오기

    const [initialCount, setInitialCount] = useState(1);
    const [updateCount, setUpdateCount] = useState(0);

    const handleIncrease = () => {
        setInitialCount(prevCount => prevCount + 1);
        setUpdateCount(prevCount => prevCount + 1);
    };

    const handleDecrease = () => {
        if (initialCount > 1) { // 0이 아니라 1로 수정
            setInitialCount(prevCount => prevCount - 1);
            setUpdateCount(prevCount => prevCount - 1);
        }
    };

    return (
        <section className={styles.productDetailModal}>
            <section className={styles.infoBox}>
                <div className={styles.storeInfo}>
                    <img className={styles.storeImg} src="" alt="storeImg" />
                    <div className={styles.fromWhere}>
                        <p className={styles.cart}>your cart from</p>
                        <p className={styles.storeName}>가게 이름 &gt;</p> {/* 해당 가게 페이지로 이동  // 네이버 지도?라던가... */}
                    </div>
                </div>
                <div className={styles.productDetail}>
                    <p>2. Product Details</p>
                    <div className={styles.map}>
                        <div className={styles.mapImg}>지도 들어갈 자리</div>
                        <p>픽업 주소</p>
                    </div>
                    <div className={styles.sectionLine}></div>
                    <div className={styles.pickUpTimeInfo}>
                        <p>픽업 시간</p>
                    </div>
                    <div className={styles.sectionLine}></div>
                    <div className={styles.productInfo}>
                        <div className={styles.price}>
                            <p>상품 가격</p>
                            <p>5900</p>
                        </div>
                        <div className={styles.sectionLine}></div>
                        <div className={styles.productDes}>
                            <p>상품 설명</p>
                            <p>가게가 뭘 파는 가게인지~ + 랜덤으로 들어갑니다</p>
                        </div>
                    </div>
                </div>

                <div className={styles.bottomPlaceOrder}>
                    <div className={styles.productAmtAdjustBtn}>
                        <button className={styles.adjustBtn} onClick={handleDecrease} disabled={initialCount <= 1}>
                            <FontAwesomeIcon icon={faMinus} />
                        </button>
                        <p className={styles.initialCnt}>{initialCount}</p>
                        <button className={styles.adjustBtn} onClick={handleIncrease}>
                            <FontAwesomeIcon icon={faPlus} />
                        </button>
                    </div>
                    <div className={styles.placeOrderBtn}>
                        <p>Place Order</p>
                    </div>
                </div>
            </section>

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
        </section>
    );
};

export default ProductDetailModal;
