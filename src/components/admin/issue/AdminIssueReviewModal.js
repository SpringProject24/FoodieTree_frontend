import React from 'react';
import IssueReview from "./IssueReview";

const AdminIssueReviewModal = ({issueId, issueDetail, reservationDetail}) => {

    return (
        <>
            <IssueReview issueId={issueId} issueDetail={issueDetail} reservationDetail={reservationDetail}/>
        </>
    );
};

export default AdminIssueReviewModal;