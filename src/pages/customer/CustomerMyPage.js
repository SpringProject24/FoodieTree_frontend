import React from 'react';
import { useModal } from "../common/ModalProvider";

const CustomerMyPage = () => {
    const { openModal } = useModal();

    const reservationDetail = {
        nickname: '홍길동', // 여기 수정
        reservationDate: '2021-08-01',
        reservationTime: '15:00',
        reservationNumber: 3
    };

    const handleOpenModal = () => { // 함수 이름 수정
        openModal('customerReservationDetail', { reservationDetail });
    };

    return (
        <div>
            <button onClick={handleOpenModal}>예약내역 조회</button> {/* 수정된 함수 사용 */}
        </div>
    );
};

export default CustomerMyPage;
