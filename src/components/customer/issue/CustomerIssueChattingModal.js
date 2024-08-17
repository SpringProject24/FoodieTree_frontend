import React from 'react';
import ChatComponent from "../../admin/issue/ChatComponent";
import CustomerIssueChat from "./CustomerIssueChat";

const CustomerIssueChattingModal = ({issueId}) => {
    return (
        <div>
            <CustomerIssueChat issueId={issueId}/>
        </div>
    );
};

export default CustomerIssueChattingModal;