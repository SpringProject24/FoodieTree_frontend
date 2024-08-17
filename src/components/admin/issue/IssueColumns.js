import React from "react";

const centerFlex = {style: {justifyContent: 'center', paddingLeft: '0'}};
export const IssueColumns = (openModal) => [

    {
        accessorKey: 'customerId',
        header: 'ID',
        cell: (props) => <p>{props.getValue()}</p>,
        size: 50,
        meta: {
            cellProps: centerFlex,
        },
    },
    {
        accessorKey: 'issueCategory',
        header: 'Category',
        cell: (props) => <p>{props.getValue()}</p>,
        size: 100,
        meta: {
            cellProps: centerFlex,
        },
    },
    {
        accessorKey: 'issueCompleteAt',
        header: 'Status',
        cell: (props) => (
            <p>{props.getValue() ? 'SOLVED' : 'Incomplete'}</p>
        ),
        size: 100,
        meta: {
            cellProps: centerFlex,
        },
    },
    {
        accessorKey: 'makeIssueAt',
        header: 'Created At',
        cell: (props) => <p>{formatDate(props.getValue())}</p>,
        size: 150,
        meta: {
            cellProps: centerFlex,
        },
    },
    {
        id: 'moveToChat',
        header: 'Action',
        cell: (props) => {

            const status = props.row.original.issueCompleteAt; // Assuming `issueCompleteAt` is null or falsy when incomplete

            const handleMoveToChat = () => {
                const issueId = props.row.original.issueId; // Replace with the correct identifier for your issue
                openModal('adminIssueChatting', {issueId});
                console.log('Move to Chat Room', issueId);
            };

            return (
                !status && (
                    <button onClick={handleMoveToChat}>
                        Move to Chat Room
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

