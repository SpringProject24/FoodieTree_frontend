import React from 'react';
import styles from "../../pages/product/BottomPlaceOrder.module.scss";
import {authFetch} from "../../utils/authUtil";
import {useModal} from "../../pages/common/ModalProvider";
import * as PortOne from "@portone/browser-sdk/v2";
import {createReservationFetch, requestPayment} from "./payment";

const ReservationBtn = ({ tar : {remainProduct, productDetail, initialCount }}) => {
    const { closeModal } = useModal();
    const isReservation = remainProduct === 0;
    const storeId = productDetail.storeInfo?.storeId || '';
    const handleMakeReservation = async () => {
        if (remainProduct === 0) {
            alert('해당 상품은 품절되었습니다.');
            return;
        }
        console.log(productDetail.productId, " ", Date.now());
        const paymentId = `${productDetail.productId}`;
        // const [cateResponse, paymentResponse] = await Promise.all(
        //     createReservationFetch(storeId, initialCount, paymentId),
        //     requestPayment(productDetail, initialCount, paymentId)
        // )

        // try {
        //     const response = await authFetch(`/reservation`, {
        //         method: 'POST',
        //         headers: {
        //             'Content-Type': 'application/json',
        //         },
        //         body: JSON.stringify({
        //             storeId: storeId,
        //             cnt: `${initialCount}`,
        //             paymentId
        //         }),
        //     });
        //     if (!response.ok) {
        //         const errorData = await response.json();
        //         console.error(errorData);
        //     }
        //     console.log('예약 처리 응답:', response);
        //     alert('예약이 완료되었습니다!');
        //     closeModal();
        // } catch (error) {
        //     console.error('예약 처리 중 오류 발생:', error);
        //     alert('예약 처리 중 오류가 발생했습니다!');
        // }
    };
    return (
        <div
            className={`${styles.placeOrderBtn} ${isReservation ? styles.reservation : ''}`}
            onClick={handleMakeReservation}
        >
            <p>{isReservation ? 'SOLD OUT' : '구매하기'}</p>
        </div>
    );
};

export default ReservationBtn;