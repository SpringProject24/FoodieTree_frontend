import React, {useEffect, useState} from 'react';
import {useModal} from "../../pages/common/ModalProvider";
import {createReservationFetch} from "./fetch-payment";
import PaymentRequestModal from "../../pages/payment/PaymentRequestModal";
import SubModalPortal from "../../pages/payment/SubModalPortal";

const ReservationBtn = ({ children, style, tar : {remainProduct, productDetail: {storeInfo}, initialCount, cntHandler=null }}) => {
    const [isShow, setIsShow] = useState(false);
    const [paymentId, setPaymentId] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const { closeModal, openModal } = useModal();
    const isReservation = remainProduct === 0;
    const storeId = storeInfo?.storeId || '';
    const price = storeInfo?.price * initialCount;
    console.log(storeInfo)
    const handleMakeReservation = async () => {
        if (remainProduct === 0) {
            alert('해당 상품은 품절되었습니다.');
            return;
        }
        setIsLoading(true);
        setIsShow(true);
        const tarId = `${storeInfo.productDetail.productId}-${Date.now()}`;
        setPaymentId(tarId);
        try {
            const response = await createReservationFetch(storeId, initialCount, tarId);
            const data = await response.json();
            setIsLoading(false);
            if (response.ok && data) {
                cntHandler && cntHandler(storeId, initialCount);
            } else {
                alert("잠시 후 다시 이용해주세요.");
                setIsShow(false);
            }
        } catch (e) {
            alert("잠시 후 다시 이용해주세요.");
            console.error(e);
            setIsLoading(false);
            setIsShow(false);
        }
    };

    const closeHandler = () => {
        setIsShow(false);
        closeModal();
    }
    return (
        <>
            <div className={style} onClick={handleMakeReservation}>
                {children}
            </div>
            { isShow &&
                <SubModalPortal onClose={closeHandler} isLoading={isLoading}>
                    <PaymentRequestModal storeName={storeInfo.storeName} price={price} paymentId={paymentId} onClose={closeHandler}/>
                </SubModalPortal>
            }
        </>
    );
};

export default ReservationBtn;