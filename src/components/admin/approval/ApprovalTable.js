import React, {useState} from 'react';
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

const columns = [
  {
    id: 'select',
    header: ({ table }) => (
      <input
        id="header-checkbox"
        type="checkbox"
        checked={table.getIsAllPageRowsSelected()} // 전체 row가 선택되었는지 확인
        onChange={table.getToggleAllPageRowsSelectedHandler()} // 전체 row를 선택/해제하는 handler
      />
    ),
    cell: ({ row }) => (
      <input
        id={`cell-checkbox-${row.id}`}
        type="checkbox"
        checked={row.getIsSelected()} // row가 선택되었는지 확인
        disabled={!row.getCanSelect()} // row가 선택 가능한지 확인
        onChange={row.getToggleSelectedHandler()} // row를 선택/해제하는 handler
      />
    ),
    size: 50,
  },
  {accessorKey: 'name', header: '상호명', cell: (props) => <p>{props.getValue()}</p>},
  {accessorKey: 'storeId', header: '스토어 계정', cell: (props) => <p>{props.getValue()}</p>},
  {accessorKey: 'status', header: '상태', size: '100', cell: (props) => <p>{props.getValue()}</p>},
  {accessorKey: 'createdAt', header: '생성일시', size: '200', cell: (props) => <p>{props.getValue().toLocaleString()}</p>},
  {accessorKey: 'license', header: '사업자등록번호', size: '130', cell: (props) => <p>{props.getValue()}</p>},
  {accessorKey: 'licenseVerification', header: '유효성', size: '100', cell: (props) => <p>{props.getValue()}</p>},
  {accessorKey: 'category', header: '업종', size: '100', cell: (props) => <p>{props.getValue()}</p>},
  {accessorKey: 'contact', header: '연락처', cell: (props) => <p>{props.getValue()}</p>},
  {accessorKey: 'address', header: '주소', cell: (props) => <p>{props.getValue()}</p>},
  {accessorKey: 'productCnt', header: '수량', size: '50', cell: (props) => <p>{props.getValue()}</p>},
  {accessorKey: 'price', header: '가격', size: '80', cell: (props) => <p>{props.getValue()}</p>},
  {accessorKey: 'proImage', header: '상품 구성 예시', cell: (props) => <p>{props.getValue()}</p>},

];
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
      <SearchInTable columnFilters={columnFilters} setColumnFilters={setColumnFilters} />
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
          {table.getPageCount() /*총 페이지 수*/}
        </div>
    </div>
  );
};

export default ApprovalTable;

export const loader = async({params}) => {

  console.log("로더 params: ", params);

  const res = await fetch("/admin/approve");
  return res.json();
}