import React from 'react';
import styles from './BottomPlaceOrder.module.scss';

const BottomPlaceOrder = ({ makeReservation, initialCount, handleIncrease, handleDecrease }) => {
    if (!initialCount) return null;

    return (
        <div className={styles.bottomPlaceOrder}>
            <button onClick={handleDecrease}>-</button>
            <span>{initialCount}</span>
            <button onClick={handleIncrease}>+</button>
            <button onClick={() => makeReservation(initialCount)}>주문하기</button>
        </div>
    );
};

export default BottomPlaceOrder;
