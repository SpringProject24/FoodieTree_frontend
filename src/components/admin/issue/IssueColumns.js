import React from "react";
import {ISSUE_URL} from "../../../config/host-config";
const BASE_URL = window.location.origin;

const centerFlex = {style: {justifyContent: 'center', paddingLeft: '0'}};
export const IssueColumns = (openModal) => [

    {
        accessorKey: 'customerId',
        header: '고객 ID',
        cell: (props) => <p>{props.getValue()}</p>,
        size: 50,
        meta: {
            cellProps: centerFlex,
        },
    },
    {
        accessorKey: 'issueCategory',
        header: '문의 유형',
        cell: (props) => <p>{props.getValue()}</p>,
        size: 100,
        meta: {
            cellProps: centerFlex,
        },
    },
    {
        accessorKey: 'status',
        header: '해결 여부',
        cell: (props) => (
            <p>{props.getValue()}</p>
        ),
        size: 100,
        meta: {
            cellProps: centerFlex,
        },
    },
    {
        accessorKey: 'makeIssueAt',
        header: '등록일',
        cell: (props) => <p>{formatDate(props.getValue())}</p>,
        size: 150,
        meta: {
            cellProps: centerFlex,
        },
    },
    {
        id: 'moveToChat',
        header: '채팅내역 및 채팅방 이동',
        cell: (props) => {

            const status = props.row.original.status; // Assuming `issueCompleteAt` is null or falsy when incomplete

            const handleMoveToChat = () => {
                const issueId = props.row.original.issueId; // Replace with the correct identifier for your issue
                openModal('adminIssueChatting', {issueId});
                console.log('Move to Chat Room', issueId);
            };

            const handleIssueReview = async () => {
                const issueId = props.row.original.issueId; // Replace with the correct identifier for your issue

                try{
                    const res = await fetch(`${ISSUE_URL}/detail?issueId=${issueId}`, {
                        method: 'GET',
                        headers: {
                            'Content-Type': 'application/json',
                            'Cache-Control': 'no-cache',
                        },
                    });

                    if (!res.ok) {
                        const errorMessage = await res.text();
                        alert(errorMessage);
                        return null;
                    }

                    const issueDetail = await res.json();
                    console.log('Issue Data:', issueDetail);

                    const reservationId = issueDetail.reservationId;
                    console.log('Reservation ID:', reservationId);
                    try{
                        const response = await fetch(`${BASE_URL}/reservation/${reservationId}/modal/detail`);

                        if (!res.ok) {
                            const errorMessage = await response.text();
                            alert(errorMessage);
                            return null;
                        }
                        const reservationDetail = await response.json();

                        openModal('adminIssueReview', {issueId, issueDetail, reservationDetail});

                    }catch (e) {
                        console.error('Error fetching reservation data:', e);
                        alert('Failed to fetch reservation data.');
                    }


                } catch (e) {
                    console.error('Error fetching issue data:', e);
                    alert('Failed to fetch issue data.');
                }


                console.log('Move to Issue Review', issueId);
            }

            return (
                status !== "PENDING" ? (
                    <button onClick={handleIssueReview}>
                        이슈 조회하기
                    </button>
                ) : (
                    <button onClick={handleMoveToChat}>
                        채팅방으로 이동
                    </button>
                )
            );
        },
        size: 100,
        meta: {
            cellProps: centerFlex,
        },
    },
];

// Date formatting function
const formatDate = (dateTimeStr) => {
    const inputDateTime = new Date(dateTimeStr);
    const today = new Date();

    const startOfToday = new Date(today.setHours(0, 0, 0, 0));
    const endOfToday = new Date(today.setHours(23, 59, 59, 999));

    const isToday = inputDateTime >= startOfToday && inputDateTime <= endOfToday;
    const isThisYear = inputDateTime.getFullYear() === startOfToday.getFullYear();

    const formatNumber = (number) => number.toString().padStart(2, '0');

    const year = inputDateTime.getFullYear();
    const month = formatNumber(inputDateTime.getMonth() + 1);
    const day = formatNumber(inputDateTime.getDate());
    const hours = formatNumber(inputDateTime.getHours());
    const minutes = formatNumber(inputDateTime.getMinutes());

    if (!isToday) {  // 오늘 날짜인 경우 시간만 포맷팅
        return `${hours}:${minutes}`;
    } else if (isThisYear) {  // 올해인 경우 월일과 시간 포맷팅
        return `${month}-${day} ${hours}:${minutes}`;
    } else {  // 그 외의 경우 연월일과 시간 포맷팅
        return `${year}-${month}-${day} ${hours}:${minutes}`;
    }
};

