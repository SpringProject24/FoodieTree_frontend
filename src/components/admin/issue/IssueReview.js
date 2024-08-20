import React from 'react';

const IssueReview = ({issueDetail, reservationDetail}) => {

    return (
        <div>
            <h2>issueId: {issueDetail.issueId}</h2>
            <div>고객 id: {issueDetail.customerId}</div>
            <div>문의 유형: {issueDetail.type}</div>
            <div>상태: {issueDetail.status}</div>
            <div>채팅 내역: {issueDetail.issueText}</div>
            <div>문의 등록일: {issueDetail.makeIssueAt}</div>

            <div>---------예약 내역 -----------</div>
            <h2>reservationId: {reservationDetail.reservationId}</h2>
            <div>고객 id: {reservationDetail.customerId}</div>
            <div>상품 id: {reservationDetail.productId}</div>

        </div>
    );
};

export default IssueReview;