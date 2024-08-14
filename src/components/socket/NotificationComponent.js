// import React, { useEffect, useState } from 'react';
// import { connectWebSocket } from './Socket';
//
// const NotificationComponent = ({ customerId, storeId, userType }) => {
//   const [notifications, setNotifications] = useState([]);
//
//   useEffect(() => {
//     connectWebSocket(() => {
//       if (userType === 'customer') {
//         stompClient.subscribe(`/queue/customer/${customerId}`, message => {
//           setNotifications(prev => [...prev, message.body]);
//         });
//       } else if (userType === 'store') {
//         stompClient.subscribe(`/topic/store/${storeId}`, message => {
//           setNotifications(prev => [...prev, message.body]);
//         });
//       }
//     });
//   }, [customerId, storeId, userType]);
//
//   return (
//     <div>
//       <h2>Notifications</h2>
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
