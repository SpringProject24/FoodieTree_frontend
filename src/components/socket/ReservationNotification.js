import React, { useEffect, useState } from 'react';
import SockJS from 'sockjs-client';
import { Stomp } from '@stomp/stompjs';

const ReservationNotification = () => {
  const [stompClient, setStompClient] = useState(null);
  const [notifications, setNotifications] = useState([]);
  const customerId = "test@gmail.com";  // 실제 구현에서는 로그인된 사용자의 ID를 사용
  const storeId = "kitsnr08@gmail.com"; // 실제 구현에서 가게 ID

  useEffect(() => {
    const socket = new SockJS('http://localhost:3000/ws');
    const client = Stomp.over(socket);

    client.connect({}, () => {

      // 고객 알림 구독
      client.subscribe(`/queue/customer/${customerId}`, (message) => {
        setNotifications(prev => [...prev, message.body]);
      });

      // 가게 알림 구독
      client.subscribe(`/topic/store/${storeId}`, (message) => {
        setNotifications(prev => [...prev, message.body]);
      });
      setStompClient(client);
    });

    return () => {
      if (stompClient) {
        stompClient.disconnect();
      }
    };
  }, [customerId, storeId]);

  return (
    <div>
      <h2>Notifications</h2>
      <ul>
        {notifications.map((notification, index) => (
          <li key={index}>{notification}</li>
        ))}
      </ul>
    </div>
  );
}

export default ReservationNotification;