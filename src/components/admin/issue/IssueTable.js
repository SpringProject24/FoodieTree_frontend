import React from 'react';
import IssueSummary from "./IssueSummary";
import styles from './IssueTable.module.scss';
import ChatComponent from "./ChatComponent";
import ChattingList from "./ChattingList";

const IssueTable = () => {
    const stats = {
        PENDING: 2,
        SOLVED: 3,
        CANCELLED: 3
    }

    return (
        <div className={styles.tableSection}>
            {/*<IssueSummary stats={stats}/>*/}
            <div className={styles.chatListContainer}>
                <ChattingList/>
                <ChatComponent/>
            </div>
        </div>
    );
};

export default IssueTable;