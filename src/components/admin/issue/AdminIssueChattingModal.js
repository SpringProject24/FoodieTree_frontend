import React from 'react';
import ChatComponent from "./ChatComponent";

const AdminIssueChattingModal = ({issueId}) => {
    return (
        <div>
            <ChatComponent issueId={issueId} type={'admin'}/>
        </div>
    );
};

export default AdminIssueChattingModal;