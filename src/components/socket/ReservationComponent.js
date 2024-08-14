import React, { useEffect } from 'react';
import { connectWebSocket, sendNotification } from './Socket';

const ReservationComponent = ({ customerId, storeId }) => {

  useEffect(() => {
    connectWebSocket();
  }, []);

  const handleReservation = () => {
    // 예약 처리 로직
    // 예약이 성공하면 서버로 알림을 전송
    sendNotification('/app/notify', {
      message: 'Reservation confirmed',
      customerId: customerId,
      storeId: storeId,
    });
  };

  return (
    <button onClick={handleReservation}>Reserve Now</button>
  );
};

export default ReservationComponent;
