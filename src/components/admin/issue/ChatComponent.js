import React, { useState, useEffect, useRef } from 'react';
import SockJS from 'sockjs-client';
import { Stomp } from '@stomp/stompjs';
import styles from './ChatComponent.module.scss';

const ChatComponent = ({ issueId, type }) => {
    const [stompClient, setStompClient] = useState(null);
    const [connected, setConnected] = useState(false);
    const [messages, setMessages] = useState([]);
    const [messageInput, setMessageInput] = useState('');
    const chatBoxRef = useRef(null);

    useEffect(() => {
        const socket = new SockJS('http://localhost:8083/chat');
        const stompClient = Stomp.over(() => socket);

        stompClient.connect({}, (frame) => {
            console.log('Connected:', frame);
            setConnected(true);

            stompClient.subscribe(`/topic/messages/${issueId}`, (message) => {
                const parsedMessage = JSON.parse(message.body);
                console.log('Received message:', parsedMessage);
                showMessage(parsedMessage);
            });

        }, (error) => {
            console.error('Connection error:', error);
            setConnected(false);
        });

        setStompClient(stompClient);

        return () => {
            if (stompClient) stompClient.disconnect();
        };
    }, [issueId]);

    useEffect(() => {
        // 새로운 메시지가 추가될 때마다 스크롤을 아래로 이동시킵니다.
        if (chatBoxRef.current) {
            chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight;
        }
    }, [messages]);

    const showMessage = (message) => {
        setMessages((prevMessages) => [...prevMessages, message]);
    };

    const sendMessage = () => {
        if (connected && stompClient && messageInput.trim() !== '') {
            console.log("type:", type);
            const chatMessage = {
                content: messageInput,
                issueId: issueId,
                sender: type // 'admin' 또는 'customer'
            };
            console.log('Sending message:', chatMessage);
            stompClient.send(`/app/sendMessage/${issueId}`, {}, JSON.stringify(chatMessage));
            setMessageInput('');
        } else {
            console.error('STOMP client is not connected or message is empty.');
        }
    };

    return (
        <div className={styles.chatContainer}>
            {/*<div className={styles.chatBoxHeader}>*/}
            {/*    <h2>Chat Header</h2>*/}
            {/*</div>*/}
            <div id="chatBox" ref={chatBoxRef} className={styles.chatBoxBody}>
                {messages.map((msg, index) => (
                    <div
                        key={index}
                        className={`${styles.message} ${
                            msg.sender === type ? styles.myMessage : styles.otherMessage
                        }`}
                    >
                        {msg.sender === 'customer' ? 'Customer: ' : 'Admin: '}
                        {msg.content}
                    </div>
                ))}
            </div>
            <div className={styles.chatBoxFooter}>
                <input
                    type="text"
                    value={messageInput}
                    onChange={(e) => setMessageInput(e.target.value)}
                    placeholder="Type your message..."
                />
                <button onClick={sendMessage} disabled={!connected}>Send</button>
            </div>
        </div>
    );
};

export default ChatComponent;
