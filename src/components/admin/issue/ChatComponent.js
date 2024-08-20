import React, {useState, useEffect, useRef} from 'react';
import SockJS from 'sockjs-client';
import {Stomp} from '@stomp/stompjs';
import styles from './ChatComponent.module.scss';
import {ISSUE_URL} from "../../../config/host-config";
import {useModal} from "../../../pages/common/ModalProvider";

const ChatComponent = ({issueId, type}) => {
    const [stompClient, setStompClient] = useState(null);
    const [connected, setConnected] = useState(false);
    const [messages, setMessages] = useState([]);
    const [messageInput, setMessageInput] = useState('');
    const [selectedFiles, setSelectedFiles] = useState([]); // 여러 파일 선택 가능하도록 변경
    const [categorySelected, setCategorySelected] = useState(false);
    const [adminStarted, setAdminStarted] = useState(false); // 관리자가 채팅 시작 여부
    const chatBoxRef = useRef(null);
    const {closeModal} = useModal();

    console.log("chatComponent issueId: ", issueId);
    useEffect(() => {
        const socket = new SockJS('http://172.30.1.73:3000/chat');
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

    const updateIssueCategory = async (selectedCategory, issueId) => {
        try {
            await fetch(ISSUE_URL + `/category`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    issueId: issueId,
                    issueCategory: selectedCategory,
                }),
            });
        } catch (e) {
            console.error('Error:', e);
        }
    };

    const handleCategorySelect = (selectedCategory) => {
        setCategorySelected(true);
        console.log("selectedCATEGORYYYYYY: "+selectedCategory);
        updateIssueCategory(selectedCategory, issueId).then(r => {
            sendMessage({
                content: `Issue Category Selected: ${selectedCategory}`,
                sender: type
            });
        });
    };

    const sendMessage = (messageOverride = null) => {
        const messageToSend = messageOverride || {
            content: messageInput ? messageInput.trim() : '',
            issueId: issueId,
            sender: type // 'admin' 또는 'customer'
        };

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

    const handleFileChange = (event) => {
        setSelectedFiles(event.target.files); // 여러 파일 선택 가능하도록 변경
    };

    const sendFiles = async () => {
        if (selectedFiles.length === 0) {
            console.error('No files selected.');
            return;
        }

        const formData = new FormData();
        for (const file of selectedFiles) {
            formData.append('files', file);
        }
        formData.append('issueId', issueId);

        try {
            const response = await fetch(ISSUE_URL + '/uploadPhoto', {
                method: 'POST',
                body: formData,
            });

            if (!response.ok) {
                throw new Error('Failed to upload images.');
            }

            const fileUrls = await response.json();
            for (const url of fileUrls) {
                sendMessage({
                    content: `Image uploaded: ${url}`,
                    sender: type
                });
            }

            setSelectedFiles([]); // 파일 선택 초기화
        } catch (error) {
            console.error('Error uploading files:', error);
        }
    };

    const saveChatToDatabase = async (done) => {
        const fullChatText = messages.map(msg => `${msg.sender === 'customer' ? 'Customer' : 'Admin'}: ${msg.content}`).join('\n');

        try {
            const response = await fetch(ISSUE_URL + `/saveText`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    issueId: issueId,
                    issueText: fullChatText,
                    done: done,
                }),
            });

            if (!response.ok) {
                throw new Error('Failed to save chat to the database.');
            }

            alert('Chat saved successfully.');

        } catch (e) {
            console.error('Error saving chat:', e);
            alert('Failed to save chat.');
        }
    };

    const solveIssueHandler = () => {
        const done = "solved";
        saveChatToDatabase(done).then(() => {
            alert("이슈가 해결되어 채팅 내용이 저장됩니다.");
            console.log("Issue solved and chat saved.");
            closeModal();
        });
    };

    const quitIssueHandler = () => {
        const done = "cancel";
        saveChatToDatabase(done).then(() => {
            alert("채팅을 종료합니다.");
            console.log("Chat ended and saved.");
            closeModal();
        });
    };

    if (!categorySelected && type === 'customer') {
        return (
            <div className={styles.chatContainer}>
                <h2 className={styles.chatTitle}>문의 유형을 선택해주세요!</h2>
                <div className={styles.categorySelection}>
                    <button className={styles.categoryBtn} onClick={() => handleCategorySelect('상품')}>상품 관련 문의에요</button>
                    <button className={styles.categoryBtn} onClick={() => handleCategorySelect('업체')}>업체 관련 문의에요</button>
                    <button className={styles.categoryBtn} onClick={() => handleCategorySelect('시스템')}>시스템 관련 문의에요</button>
                    <button className={styles.categoryBtn} onClick={() => handleCategorySelect('기타')}>그 외의 문의에요</button>
                </div>
            </div>
        );
    }

    if (!adminStarted && type === 'customer') {
        return (
            <div className={styles.chatContainer}>
                <h2>Customer Support</h2>
                <div className={styles.loading}>
                    Customer support team is on their way...
                    <br/>
                    잠시만 기다려주세요!
                </div>
            </div>
        );
    }

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
                <button onClick={() => sendMessage()}
                        disabled={!connected || (type === 'customer' && !adminStarted)}>Send
                </button>
            </div>
            <div className={styles.fileUpload}>
                <input
                    type="file"
                    multiple
                    onChange={handleFileChange}
                />
                <button onClick={sendFiles} disabled={!connected || (type === 'customer' && !adminStarted)}>Upload Image(s)</button>
            </div>
            <div className={styles.chatButtonBox}>
                <div>
                    <button onClick={solveIssueHandler}>
                        해결 완료
                    </button>
                </div>
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
