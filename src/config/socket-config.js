// import React, { useEffect, useState } from 'react';
// import SockJS from 'sockjs-client';
// import { CompatClient, Stomp } from '@stomp/stompjs';
//
// const NotificationComponent = ({ customerId, storeId, userType }) => {
//   const [notifications, setNotifications] = useState([]);
//   const [stompClient, setStompClient] = useState(null);
//
//   useEffect(() => {
//     const socket = new SockJS('/ws');
//     const client = Stomp.over(socket);
//
//     client.connect({}, frame => {
//       console.log('Connected: ' + frame);
//       setStompClient(client);
//     });
//
//     return () => {
//       if (stompClient !== null) {
//         stompClient.disconnect();
//       }
//     };
//   }, []);
//
//   useEffect(() => {
//     if (stompClient) {
//       if (userType === 'customer') {
//         stompClient.subscribe(`/queue/customer/${customerId}`, message => {
//           // 메시지를 수신했을 때, 이 콜백 함수가 실행됩니다.
//           setNotifications(prev => [...prev, message.body]);
//         });
//       } else if (userType === 'store') {
//         stompClient.subscribe(`/topic/store/${storeId}`, message => {
//           // 가게에서 메시지를 수신했을 때
//           setNotifications(prev => [...prev, message.body]);
//         });
//       }
//     }
//   }, [stompClient, customerId, storeId, userType]);
//
//
//   return (
//     <div>
//       <h2>Notifications</h2>
//       <div>
//         <button onClick={sendNotification}>Send Notification</button>
//       </div>
//       <ul>
//         {notifications.map((notification, index) => (
//           <li key={index}>{notification}</li>
//         ))}
//       </ul>
//     </div>
//   );
// };
//
// export default NotificationComponent;
