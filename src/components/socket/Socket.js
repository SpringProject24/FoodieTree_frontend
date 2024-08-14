
import SockJS from 'sockjs-client';
import { Stomp } from '@stomp/stompjs';

let stompClient = null;

export const connectWebSocket = (onConnect) => {
  const socket = new SockJS('/ws');
  stompClient = Stomp.over(socket);

  stompClient.connect({}, frame => {
    console.log('Connected: ' + frame);
    if (onConnect) onConnect();
  });
};

export const sendNotification = (destination, message) => {
  if (stompClient && stompClient.connected) {
    stompClient.send(destination, {}, JSON.stringify(message));
  } else {
    console.log("STOMP client is not connected.");
  }
};
