import React from 'react';
import AdminIssueChat from "./AdminIssueChat";

const AdminIssueChattingModal = ({issueId}) => {
    return (
        <div>
            <AdminIssueChat issueId={issueId}/>
        </div>
    );
};

export default AdminIssueChattingModal;