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

  let customerId = "test@gmail.com";  // 실제 구현에서는 로그인된 사용자의 ID를 사용
  let storeId = "kitsnr08@gmail.com"; // 실제 구현에서 가게 ID
  if(role === 'store') storeId = email;
  else customerId = email;

  useEffect(() => {
    const socket = new SockJS('http://localhost:3000/noti');
    const client = Stomp.over(socket);

    // heartbeat 설정
    client.heartbeat.outgoing = 10000; // 10초마다 클라이언트 -> 서버로 heartbeat
    client.heartbeat.incoming = 10000; // 10초마다 서버 -> 클라이언트로 heartbeat


    client.connect({}, () => {

      // 고객 알림 구독
      client.subscribe(`/queue/customer/${customerId}`, (message) => {
        console.log('Received message : ', message);
        // const notification = JSON.parse(message.body); // 메시지가 JSON이라면 파싱 필요
        // setNotifications(prev => [...prev, notification]);
        // console.log('Notification for customer: ', notification);
        setNotifications(prev => [...prev, message.body]);
      });

      // 가게 알림 구독
      client.subscribe(`/topic/store/${storeId}`, (message) => {
        console.log('Received message for store: ', message);
        // const notification = JSON.parse(message.body); // 메시지가 JSON이라면 파싱 필요
        // setNotifications(prev => [...prev, notification]);
        // console.log('Notification for customer: ', notification);
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

  console.log('알림상태 ', notifications)
  console.log('토글상태 ', isOpen)

  return (
    <div>
      <div className={styles['notify-icon']} onClick={() => setIsOpen(!isOpen)}>
        <MdNotifications />
      </div>
      <ul className={`${styles['notify-list']} ${isOpen ? '' : styles.close}`}>
        {notifications.map((notification, index) => (
          <li key={index}>{notification}</li>
        ))}
      </ul>
    </div>
  );
}

export default Notification;