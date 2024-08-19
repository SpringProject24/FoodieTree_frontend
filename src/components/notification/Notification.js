import React, {useEffect, useState} from 'react';
import SockJS from 'sockjs-client';
import {Stomp} from '@stomp/stompjs';
import styles from './Notification.module.scss';
import {IoNotificationsOutline} from "react-icons/io5";
import {authFetch} from "../../utils/authUtil";

const Notification = ({email, role}) => {
  const [stompClient, setStompClient] = useState(null);
  const [notifications, setNotifications] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [hasNewMessage, setHasNewMessage] = useState(false);
  const BASE_URL = window.location.origin;
  console.log('BASE_URL 값 ', BASE_URL)

  console.log('이메일 ', email, role);
  let customerId = null;
  let storeId = null;
  if (role === 'customer') {
    customerId = email;
  } else {
    storeId = email;
  }
  // REST API로 알림 목록 fetch
  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const response = await authFetch(`/notifications`);
        if (!response.ok) {
          console.error('Failed to fetch notifications');
        }
        const data = await response.json();
        setNotifications(prev => [...prev, ...data]);
      } catch (error) {
        console.error('알림 목록 fetch Error :', error);
      }
    };
    fetchNotifications();
  }, []);

  useEffect(() => {
    const connectWebSocket = () => {
      const socket = new SockJS('http://localhost:3000/noti');
      const client = Stomp.over(socket);

      client.connect({}, () => {
        if (role === 'customer') {
          // 고객 알림 구독
          client.subscribe(`/queue/customer/${customerId}`, (message) => {
            console.log('Received message : ', message);
            const notification = JSON.parse(message.body);
            setNotifications(prev => [...prev, notification]);
            setHasNewMessage(true);
          });
        } else if (role === 'store') {
          // 가게 알림 구독
          client.subscribe(`/topic/store/${storeId}`, (message) => {
            console.log('Received message for store: ', message);
            const notification = JSON.parse(message.body);
            setNotifications(prev => [...prev, notification]);
            setHasNewMessage(true);
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

  const toggleAlerts = () => {
    setIsOpen(!isOpen);
    setHasNewMessage(false);
  }

  console.log('알림상태 ', notifications)
  console.log('토글상태 ', isOpen)

  return (
    <div className={styles['notify-container']}>
      <div className={`${styles['notify-icon']} ${hasNewMessage && styles.new}`} onClick={toggleAlerts}>
        <IoNotificationsOutline/>
      </div>
      <ul className={`${styles['notify-list']} ${!isOpen && styles.close}`}>
        <li>알림 {notifications.length}건</li>
        {notifications?.slice().reverse().map((notification, index) => (
          <li key={index} onClick={() => window.location.href = `/${role}`}>
            {notification.content}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Notification;