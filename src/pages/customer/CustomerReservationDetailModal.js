import React from 'react';
import styles from "./CustomerReservationDetailModal.module.scss";

const CustomerReservationDetailModal = ({reservationDetail}) => {

    const confirmPickUp = async () => {
        // const response = await fetch(`${BASE_URL}`)
        alert('픽업 확인 후 특정 사유 없이 환불 불가 합니다.');
    };

    let tag = '';
    switch (reservationDetail.status) {
        case 'CANCELED':
            tag = (
                <>
                    <img src="/assets/img/cancel-stress.png" alt="취소 이미지"/>
                    <p>예약이 취소되었습니다.</p>
                    <p>취소 시간: {reservationDetail.cancelReservationAtF}</p>
                </>
            );
            break;
        case 'RESERVED':
            tag = (
                <>
                    <img src="/assets/img/mypage-omw.png" alt="픽업 이미지"/>
                    <p className={styles.pickupTimeF}>픽업 마감 시간: <span>{reservationDetail.pickupTimeF}</span></p>
                    <button onClick={confirmPickUp}>픽업 확인</button>
                </>
            );
            break;
        case 'PICKEDUP':
            tag = (
                <>
                    <img src="/assets/img/pickedup-happy.png" alt="체크 이미지"/>
                    <p>픽업이 완료되었습니다.</p>
                    <p>픽업 시간: {reservationDetail.pickedUpAtF}</p>
                </>
            );
            break;
        case 'NOSHOW':
            tag = (
                <>
                    <img src="/assets/img/noshow-sad.png" alt="노쇼 이미지"/>
                    <p>픽업 마감 시간까지 픽업되지 않았습니다.</p>
                    <p>픽업 마감 시간: {reservationDetail.pickupTimeF}</p>
                </>
            );
            break;
        default:
            tag = <div>No information available.</div>;
            break;
    }


    return (
        <>
            <div className={styles.reservationDetailItem} data-reservation-id={reservationDetail.id}>
                <div className={styles.imgSection}>
                    <div>
                    <img className={styles.reservedProductImg} src={""} alt="상품 이미지"/>
                    </div>
                    <img className={styles.reservedStoreImg} src={reservationDetail.storeImg} alt="가게 이미지"/>
                </div>
                <div>가게명: {reservationDetail.storeName}</div>
                <div>가게 주소:</div>
                <div>예약시간: {reservationDetail.reservationTime}</div>
                {tag}
                <div>도움이 필요하신가요?</div>
                {/* 추후 추가될 기능 문의하기 버튼 */}
            </div>
        </>
    );
};

export default CustomerReservationDetailModal;