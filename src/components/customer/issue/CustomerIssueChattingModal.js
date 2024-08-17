import React from 'react';
import ChatComponent from "../../admin/issue/ChatComponent";

const CustomerIssueChattingModal = ({issueId}) => {
    return (
        <div>
            <ChatComponent issueId={issueId} type={'customer'}/>
        </div>
    );
};

export default CustomerIssueChattingModal;