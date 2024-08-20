import React, {useState} from 'react';
import styles from "../../pages/product/BottomPlaceOrder.module.scss";
import {authFetch} from "../../utils/authUtil";
import {useModal} from "../../pages/common/ModalProvider";
import * as PortOne from "@portone/browser-sdk/v2";
import {createReservationFetch, requestPayment} from "./payment";
import PaymentRequestModal from "../../pages/payment/PaymentRequestModal";
import SubModalPortal from "../../pages/payment/SubModalPortal";

const ReservationBtn = ({ tar : {remainProduct, productDetail: {storeInfo}, initialCount, cntHandler=null }}) => {
    const [isShow, setIsShow] = useState(false);
    const { closeModal, openModal } = useModal();
    const isReservation = remainProduct === 0;
    const storeId = storeInfo?.storeId || '';
    const handleMakeReservation = async () => {
        if (remainProduct === 0) {
            alert('해당 상품은 품절되었습니다.');
            return;
        }
        const paymentId = `${storeInfo.productDetail.productId}-${Date.now()}`;
        const createResponse = await createReservationFetch(storeId, initialCount, paymentId);
        console.log(createResponse);
        if (createResponse.ok) {
            cntHandler && cntHandler(storeId, initialCount);
            setIsShow(true);
        } else {
            alert("잠시 후 다시 이용해주세요.");
        }


        // const [cateResponse, paymentResponse] = await Promise.all(
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

    const closeHandler = () => {
        setIsShow(false);
    }
    return (
        <>
            <div
                className={`${styles.placeOrderBtn} ${isReservation ? styles.reservation : ''}`}
                onClick={handleMakeReservation}
            >
                <p>{isReservation ? 'SOLD OUT' : '구매하기'}</p>
            </div>
            { isShow &&
                <SubModalPortal onClose={closeHandler}>
                    <PaymentRequestModal/>
                </SubModalPortal>
            }
        </>
    );
};

export default ReservationBtn;