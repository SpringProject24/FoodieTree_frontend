import React, {useMemo, useState} from 'react';
import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel, getPaginationRowModel,
  getSortedRowModel,
  useReactTable
} from "@tanstack/react-table";
import SearchInTable from "./SearchInTable";
import {BiSortAlt2} from "react-icons/bi";
import styles from "./ApprovalTables.module.scss";
import {COLUMNS} from "./columns";


const DATA = [
  {
    id: 3,
    name: '가게1',
    storeId: 'aaa@a.com',
    status: 'PENDING',
    createdAt: new Date('2024-7-30'),
    license: '1234567891',
    licenseVerification: 'APPROVED',
    category: '한식',
    contact: '0212345678',
    address: '서울시',
    productCnt: 3,
    price: 3900,
    proImage: undefined
  },
  {
    id: 4,
    name: '가게2',
    storeId: 'aaa2@a.com',
    status: 'PENDING',
    createdAt: new Date('2024-7-31'),
    license: '1234567893',
    licenseVerification: 'PENDING',
    category: '양식',
    contact: '0212345679',
    address: '서울시',
    productCnt: 5,
    price: 5900,
    proImage: undefined
  },
  {
    id: 5,
    name: '가게3',
    storeId: 'aaa3@a.com',
    status: 'PENDING',
    createdAt: new Date('2024-8-7'),
    license: '1234567897',
    licenseVerification: 'PENDING',
    category: '카페',
    contact: '0212345699',
    address: '서울시',
    productCnt: 10,
    price: 7900,
    proImage: undefined
  },
];

const ApprovalTable = () => {
  const [data, setData] = useState(DATA);
  const columns = useMemo(() => COLUMNS, []);
  const [columnFilters, setColumnFilters] = useState([]);
  const [rowSelection, setRowSelection] = useState({});

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
  console.log("헤더 확인: ", table.getHeaderGroups())
  console.log("row 확인: ", rowSelection)

  return (
    <div className={styles['table-section']}>
      <div className={styles['table-header']}>
        <SearchInTable columnFilters={columnFilters} setColumnFilters={setColumnFilters} />
        <div className={styles['status-btn-container']}>
          <button className={styles['btn-approved']}>승인</button>
          <button  className={styles['btn-rejected']}>거절</button>
        </div>
      </div>
      <table width={table.getTotalSize()} className={styles['tbl-line']}>
        <thead>
        {table.getHeaderGroups().map(headerGroup =>
          <tr key={headerGroup.id}>
            {headerGroup.headers.map(header =>
              <th key={header.id} width={header.getSize()}>
                {flexRender(
                  header.column.columnDef.header,
                  header.getContext(),
                )}
                {
                  header.column.getCanSort() &&
                  <BiSortAlt2
                    onClick={header.column.getToggleSortingHandler()}
                  />
                }
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
                <td key={cell.id} width={cell.column.getSize()}>
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
        <div>
          {table.getState().pagination.pageIndex + 1 /*현재 페이지*/}
          {' / '}
          {table.getPageCount() /*총 페이지 수*/}
        </div>
    </div>
  );
};

export default ApprovalTable;

export const loader = async({params}) => {

  console.log("로더 params: ", params);

  // const res = await fetch("/admin/approve");
  // return res.json();
}