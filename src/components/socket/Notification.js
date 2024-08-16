import React, { useEffect, useState } from 'react';
import SockJS from 'sockjs-client';
import { Stomp } from '@stomp/stompjs';
import {MdNotifications} from "react-icons/md";
import styles from './Notification.module.scss';

const Notification = ({email, role}) => {
  const [stompClient, setStompClient] = useState(null);
  const [notifications, setNotifications] = useState([]);
  const [isOpen, setIsOpen] = useState(false);

  console.log('이메일 ', email, role);
  let customerId = null;
  let storeId = null;
  if(role === 'customer') {
    customerId = email;
  }
  else {
    storeId = email;
  }

  useEffect(() => {
    const connectWebSocket = () => {
      const socket = new SockJS('http://localhost:3000/noti');
      const client = Stomp.over(socket);

      // heartbeat 설정
      // client.heartbeat.outgoing = 20000; // 10초마다 클라이언트 -> 서버로 heartbeat
      // client.heartbeat.incoming = 20000; // 10초마다 서버 -> 클라이언트로 heartbeat

      client.connect({}, () => {
        if (role === 'customer') {
          // 고객 알림 구독
          client.subscribe(`/queue/customer/${customerId}`, (message) => {
            console.log('Received message : ', message);
            const notification = JSON.parse(message.body); // 메시지가 JSON이라면 파싱 필요
            setNotifications(prev => [...prev, notification]);
          });
        } else if (role === 'store') {
          // 가게 알림 구독
          client.subscribe(`/topic/store/${storeId}`, (message) => {
            console.log('Received message for store: ', message);
            const notification = JSON.parse(message.body); // 메시지가 JSON이라면 파싱 필요
            setNotifications(prev => [...prev, notification]);
          });
        }

        setStompClient(client);
      }, (error) => {
        console.error('WebSocket connection error:', error);
        // 5초 후에 다시 연결 시도
        setTimeout(connectWebSocket, 5000);
      });
    };

    connectWebSocket();

    return () => {
      if (stompClient) {
        stompClient.disconnect();
      }
    };
  }, [customerId, storeId]);

  console.log('알림상태 ', notifications)
  console.log('토글상태 ', isOpen)

  return (
    <div>
      <div className={styles['notify-icon']} onClick={() => setIsOpen(!isOpen)}>
        <MdNotifications />
      </div>
      <ul className={`${styles['notify-list']} ${isOpen ? '' : styles.close}`}>
        {notifications.map((notification, index) => (
          <li key={index}>{notification.content}</li>
        ))}
      </ul>
    </div>
  );
}

export default Notification;