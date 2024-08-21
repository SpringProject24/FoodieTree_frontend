import React from 'react';
import styles from "./PaymentRequestModal.module.scss";
import {requestPayment} from "../../components/payment/fetch-payment";

const PaymentRequestModal = ({storeName, price, paymentId}) => {
    const formattedPrice = Intl.NumberFormat().format(price);
    console.log(paymentId)
    const clickHandler = async () => {
        const response = await requestPayment(storeName, price, paymentId);
    }
    return (
        <div>
            <div>
                <p>바로 결제 하시겠습니까?</p>
            </div>
            <div>
                <button>취소</button>
                <button onClick={clickHandler}>총 {formattedPrice}원 결제하기</button>
            </div>
        </div>
    );
};

export default PaymentRequestModal;