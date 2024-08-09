import React, {useEffect, useMemo, useState} from 'react';
import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel, getPaginationRowModel,
  getSortedRowModel,
  useReactTable
} from "@tanstack/react-table";
import SearchInTable from "./SearchInTable";
import {BiSortAlt2, BiSortDown, BiSortUp} from "react-icons/bi";
import styles from "./ApprovalTables.module.scss";
import {ApprovalColumns} from "./ApprovalColumns";
import DateRangePicker from "./DateRangePicker";
import ApprovalButtons from "./ApprovalButton";
import {FaSort, FaSortDown, FaSortUp} from "react-icons/fa";
import TansPagination from "./TansPagination";

const ApprovalTable = () => {
  const [data, setData] = useState([]);
  const columns = useMemo(() => ApprovalColumns, []);
  const [columnFilters, setColumnFilters] = useState([]);
  const [rowSelection, setRowSelection] = useState({}); // 선택한 행
  const [startDate, setStartDate] = useState(new Date('2024-07-01'));
  const [endDate, setEndDate] = useState(new Date());

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    onRowSelectionChange: setRowSelection,
    getPaginationRowModel: getPaginationRowModel(),
    state: {
      columnFilters,
      rowSelection,
    },
  });
  const fetchApprovals = async () => {
    console.log('fetchApprovals 실행중!')

    const startISO = startDate.toISOString();
    const endISO = endDate.toISOString()

    // const token = localStorage.getItem('token');
    // const refreshToken = localStorage.getItem('refreshToken');

    const res = await fetch(
      `/admin/approve?start=${startISO}&end=${endISO}`,
      {
        method: 'GET',
        headers: {
          'Content-Type' : 'application/json',
          'Cache-Control': 'no-cache',
          // 'Authorization' : 'Bearer ' + getUserToken(),
          // 'refreshToken': refreshToken,
        },
      });
    if(!res.ok) {
      const errorMessage = await res.text();
      alert(errorMessage);
      return null;
    }
    const DATA =  await res.json();
    setData(DATA.approvals);
  }

  // 기간을 기준으로 서버에 데이터 요청 및 렌더링
  useEffect(() => {
    console.log('approval useEffect 실행중!')
    fetchApprovals();
  }, [startDate, endDate]);

  return (
    <div className={styles['table-section']}>
      <div className={styles['table-interaction']}>
        <SearchInTable columnFilters={columnFilters} setColumnFilters={setColumnFilters} />
        <div className={styles['left-interactions']}>
          <DateRangePicker
            startDate={startDate}
            endDate={endDate}
            dateFormat={"yyyy년 MM월 dd일"}
            onStart={(date) => setStartDate(date)}
            onEnd={(date) => setEndDate(date)}
            styleName={'date-input-container'}
          />
          <ApprovalButtons
            rows={rowSelection}
            data={data}
            onFetch={fetchApprovals}
          />
        </div>
      </div>
      <table width={table.getTotalSize()} className={styles['table-content']}>
        <thead>
        {table.getHeaderGroups().map(headerGroup =>
          <tr key={headerGroup.id} >
            {headerGroup.headers.map(header =>
              <th key={header.id}
                  width={header.getSize()}
                  onClick={header.column.getToggleSortingHandler()}
                  {...header.column.columnDef.meta?.headerProps}
              >
                {flexRender(
                  header.column.columnDef.header,
                  header.getContext(),
                )}
                {
                  {
                    asc: <BiSortUp />,
                    desc: <BiSortDown />,
                  }[header.column.getIsSorted()]
                }
                {header.column.getCanSort() && !header.column.getIsSorted() ? (
                  <BiSortAlt2 />
                ) : null}
              </th>
            )}
          </tr>)
        }
        </thead>
        <tbody>
        {
          table.getRowModel().rows.map(row =>
            <tr key={row.id}>
              {row.getVisibleCells().map(cell =>
                <td key={cell.id} width={cell.column.getSize()}
                    {...cell.column.columnDef.meta?.cellProps}
                >
                  {
                    flexRender(
                      cell.column.columnDef.cell,
                      cell.getContext()
                    )
                  }
                </td>)}
            </tr>)
        }
        </tbody>
      </table>
      <TansPagination style={styles['tans-page-container']} table={table} />
        {/*<button*/}
        {/*  variant="outline"*/}
        {/*  size="sm"*/}
        {/*  onClick={() => table.previousPage()}*/}
        {/*  disabled={!table.getCanPreviousPage()}*/}
        {/*>*/}
        {/*  {'‹'}*/}
        {/*</button>*/}
        {/*<div>*/}
        {/*  {table.getPageCount()> 0?*/}
        {/*    table.getState().pagination.pageIndex + 1 +' / '+ table.getPageCount()*/}
        {/*    : undefined}*/}
        {/*</div>*/}
    </div>
  );
};

export default ApprovalTable;
