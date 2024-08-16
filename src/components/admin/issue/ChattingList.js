import React, { useEffect, useMemo, useState } from 'react';
import {
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    useReactTable,
} from '@tanstack/react-table';
import styles from './ChattingList.module.scss';
import FiltersInTable from "../approval/FiltersInTable";
import TansTable from "../approval/TansTable";
import TansPagination from "../approval/TansPagination";
import {IssueColumns} from "./IssueColumns";
import IssueSummary from "./IssueSummary";


const ChattingList = () => {
    const [data, setData] = useState([]);
    const columns = useMemo(() => IssueColumns, []);
    const [columnFilters, setColumnFilters] = useState([]);
    const [rowSelection, setRowSelection] = useState({}); // 선택한 행
    const [stats, setStats] = useState({});

    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        onRowSelectionChange: setRowSelection,
        state: {
            columnFilters,
            rowSelection,
        },
    });

    const fetchChatList = async () => {
        console.log('fetchChatList 실행중!');

        const res = await fetch('/issue', {
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

        const DATA = await res.json();
        console.log('DATA:', DATA)
        setData(DATA);
        // setStats(DATA.stats)
    };

    useEffect(() => {
        console.log('chatting list useEffect 실행중!');
        fetchChatList();
    }, []);

    return (
        <div className={styles.chatListContainer}>
            <IssueSummary stats={stats} />
            <div className={styles.tableInteraction}>
                <FiltersInTable columnFilters={columnFilters} setColumnFilters={setColumnFilters} />
            </div>
            <TansTable style={{width:"100%"}} table={table} />
            <TansPagination style={styles.tansPageContainer} table={table} />
        </div>
    );
};

export default ChattingList;
