import React from 'react';
import styles from './BottomPlaceOrder.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMinus, faPlus } from '@fortawesome/free-solid-svg-icons';
import ReservationBtn from "../../components/payment/ReservationBtn";

const BottomPlaceOrder = ({ productDetail, initialCount, handleIncrease, handleDecrease, remainProduct, cntHandler }) => {
  const storeId = productDetail.storeInfo?.storeId || '';
  const customerId = 'test@gmail.com';

  const isReservation = remainProduct === 0;

  return (
      <div className={styles.bottomPlaceOrder}>
        <div className={styles.productAmtAdjustBtn}>
          <button
              className={styles.adjustBtn}
              onClick={handleDecrease}
              disabled={initialCount <= 1}
          >
            <FontAwesomeIcon icon={faMinus}/>
          </button>
          <p className={styles.initialCnt}>{initialCount}</p>
          <button
              className={styles.adjustBtn}
              onClick={handleIncrease}
              disabled={initialCount >= remainProduct}
          >
            <FontAwesomeIcon icon={faPlus}/>
          </button>
        </div>
          <ReservationBtn style={`${styles.placeOrderBtn} ${isReservation ? styles.reservation : ''}`}
                          tar={{remainProduct, initialCount, productDetail, cntHandler}}>
            <p>{isReservation ? 'SOLD OUT' : '예약하기'}</p>
          </ReservationBtn>
      </div>
  );
};

export default BottomPlaceOrder;
