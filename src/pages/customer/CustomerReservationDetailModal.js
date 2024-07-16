import React from 'react';

const CustomerReservationDetailModal = ({reservationDetail}) => {

    return (
        <>
        <div>
            예약 상세 조회 모달
        </div>
            <div>
                <div>예약자: {reservationDetail.nickname}</div>
                <div>예약시간: {reservationDetail.reservationTime}</div>
            </div>
        </>
    );
};

export default CustomerReservationDetailModal;