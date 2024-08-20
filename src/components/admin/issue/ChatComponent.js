import React, { useState, useEffect, useRef } from 'react';
import SockJS from 'sockjs-client';
import { Stomp } from '@stomp/stompjs';
import styles from './ChatComponent.module.scss';

const ChatComponent = ({ issueId, type }) => {
    const [stompClient, setStompClient] = useState(null);
    const [connected, setConnected] = useState(false);
    const [messages, setMessages] = useState([]);
    const [messageInput, setMessageInput] = useState('');
    const [categorySelected, setCategorySelected] = useState(false);
    const [adminStarted, setAdminStarted] = useState(false); // 관리자가 채팅 시작 여부
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
                if (parsedMessage.sender === 'admin') {
                    setAdminStarted(true); // 관리자가 메시지를 보내면 채팅 시작
                }
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
        if (chatBoxRef.current) {
            chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight;
        }
    }, [messages]);

    const showMessage = (message) => {
        setMessages((prevMessages) => [...prevMessages, message]);
    };

    const handleCategorySelect = (selectedCategory) => {
        setCategorySelected(true);
        sendMessage({
            content: `Issue Category Selected: ${selectedCategory}`,
            sender: type
        });
    };

    const sendMessage = (messageOverride = null) => {
        const messageToSend = messageOverride || {
            content: messageInput ? messageInput.trim() : '',
            issueId: issueId,
            sender: type // 'admin' 또는 'customer'
        };

        // Debugging: Log the message before sending
        console.log('Message to Send:', messageToSend);

        if (!messageToSend.content || messageToSend.content.trim() === '') {
            console.error('Message content is empty. MessageToSend:', messageToSend);
            return;
        }

        if (connected && stompClient) {
            console.log('Sending message:', messageToSend);
            stompClient.send(`/app/sendMessage/${issueId}`, {}, JSON.stringify(messageToSend));
            if (!messageOverride) setMessageInput('');
        } else {
            console.error('STOMP client is not connected.');
        }
    };

    // 1. 고객이 이슈 카테고리를 선택해야 합니다.
    if (!categorySelected && type === 'customer') {
        return (
            <div className={styles.chatContainer}>
                <h2>Select an Issue Category</h2>
                <div className={styles.categorySelection}>
                    <button onClick={() => handleCategorySelect('Billing')}>Billing</button>
                    <button onClick={() => handleCategorySelect('Technical Support')}>Technical Support</button>
                    <button onClick={() => handleCategorySelect('General Inquiry')}>General Inquiry</button>
                </div>
            </div>
        );
    }

    // 2. 고객이 카테고리를 선택한 후, 관리자가 참여할 때까지 대기합니다.
    if (!adminStarted && type === 'customer') {
        return (
            <div className={styles.chatContainer}>
                <h2>Customer Support</h2>
                <div className={styles.loading}>
                    Customer support team is on their way...
                    잠시만 기다려주세요!
                </div>
            </div>
        );
    }

    const solveIssueHandler = () => {
        alert("이슈가 해결되어 채팅 내용이 저장됩니다.");
        console.log("solveeeeeed");
    }

    const quitIssueHandler = () => {
        alert("채팅을 종료합니다.");
        console.log("quitttttt")
    }


    // 3. 관리자가 채팅을 시작하면 실시간 채팅을 보여줍니다.
    return (
        <div className={styles.chatContainer}>
            <div className={styles.chatBoxBody} ref={chatBoxRef}>
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
                    disabled={type === 'customer' && !adminStarted} // 관리자가 시작하지 않으면 고객은 메시지 입력 불가
                />
                <button onClick={() => sendMessage()} disabled={!connected || (type === 'customer' && !adminStarted)}>Send</button>
            </div>
            <div className={styles.chatButtonBox}>
                {
                    type === 'admin' &&
                        <div>
                            <button onClick={solveIssueHandler}>
                                해결 완료
                            </button>
                        </div>
                }
                <div>
                    <button onClick={quitIssueHandler}>
                        채팅 끝내기
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ChatComponent;
