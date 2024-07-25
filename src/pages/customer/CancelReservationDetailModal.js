import React from 'react';
import {useModal} from "../common/ModalProvider";

/**
 * 소비자 마이페이지 창에서 예약 취소 버튼 누를 시 뜨는 모달
 * @param cancelInfo - storeName, price, cancellationFee
 * @param isCancelAllowed - 픽업 마감시간으로부터 1시간 이내인지 (취소수수료 해당 여부)
 * @param onConfirmCancel - 취소 공지 확인 후 예약 취소
 * @returns {Element}
 * @constructor
 */
const CancelReservationDetailModal = ({reservationDetail, cancelReservation}) => {
    const {closeModal} = useModal();

    const handleReservationCancel = () => {
        // cancelReservation(reservationDetail.reservationId);
        alert('예약이 취소되었습니다.');
        closeModal();
    }

    const chargeCancelFee = (pickupTimeF) => {
        // 현재 시간을 가져옴
        const now = new Date();

        // pickupTimeF를 파싱하여 Date 객체로 변환
        const [datePart, timePart] = pickupTimeF.split(' ');
        const [month, day] = datePart.replace('월', '').split(' ').map(Number);
        const [hours, minutes] = timePart.split('시').map(time => parseInt(time, 10));

        // 현재 년도를 사용하여 픽업 시간 생성
        const pickupDate = new Date(now.getFullYear(), month - 1, day, hours, minutes);

        // 30분 차이를 밀리초로 변환 (30분 = 30 * 60 * 1000 ms)
        const AN_HOUR = 60 * 60 * 1000;

        console.log(AN_HOUR);
        console.log(pickupDate);
        console.log(now);

        // 픽업 시간이 현재 시간으로부터 30분 이상 남았는지 확인
        return (pickupDate - now) > AN_HOUR;
    };

    const isCancelAllowed = chargeCancelFee(reservationDetail.pickupTimeF);
    console.log(isCancelAllowed); // true 또는 false 출력

    return (
        <>
            <div>
                예약 취소 모달
            </div>
            {isCancelAllowed ? (
                <div>
                    <p>정말 취소하시겠습니까?</p>
                    <p>{reservationDetail.storeName} 상품이 맞습니까?</p>
                    <p>{reservationDetail.price}는 자동 환불됩니다.</p>
                </div>
            ) : (
                <div>
                    <p>
                        픽업시간 기준 1시간 이내로 예약 취소시 <br/>
                        취소 수수료 50%가 부과됩니다. <br/>
                        정말 취소하시겠습니까?
                    </p>
                    <p>
                        취소수수료 : {reservationDetail.price * 0.5}원
                    </p>
                    <p>취소 수수료는 결제 금액에서 자동 차감됩니다.</p>
                </div>
            )}
            <button className="calendar-button" onClick={handleReservationCancel}>확인</button>
        </>
    );
};

export default CancelReservationDetailModal;