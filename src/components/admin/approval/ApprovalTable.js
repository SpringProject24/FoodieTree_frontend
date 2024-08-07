import React, {useState} from 'react';
import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  useReactTable
} from "@tanstack/react-table";
import SearchInTable from "./SearchInTable";
import {BiSortAlt2} from "react-icons/bi";

const columns = [
  {accessorKey: 'name', header: '상호명', cell: (props) => <p>{props.getValue()}</p>},
  {accessorKey: 'storeId', header: '스토어 계정', cell: (props) => <p>{props.getValue()}</p>},
  {accessorKey: 'status', header: '상태', cell: (props) => <p>{props.getValue()}</p>},
  {accessorKey: 'createdAt', header: '생성일시', cell: (props) => <p>{props.getValue().toLocaleString()}</p>},
  {accessorKey: 'license', header: '사업자등록번호', cell: (props) => <p>{props.getValue()}</p>},
  {accessorKey: 'licenseVerification', header: '유효성검사', cell: (props) => <p>{props.getValue()}</p>},
  {accessorKey: 'category', header: '업종', cell: (props) => <p>{props.getValue()}</p>},
  {accessorKey: 'contact', header: '연락처', cell: (props) => <p>{props.getValue()}</p>},
  {accessorKey: 'address', header: '주소', cell: (props) => <p>{props.getValue()}</p>},
  {accessorKey: 'productCnt', header: '상품 수량', cell: (props) => <p>{props.getValue()}</p>},
  {accessorKey: 'price', header: '상품 가격', cell: (props) => <p>{props.getValue()}</p>},
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

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    state: {
      columnFilters
    },
  });

  return (
    <>
      <SearchInTable columnFilters={columnFilters} setColumnFilters={setColumnFilters} />
      <table width={table.getTotalSize()}>
        <thead>
        {table.getHeaderGroups().map(headerGroup =>
          <tr key={headerGroup.id}>
            {headerGroup.headers.map(header =>
              <th key={header.id} width={header.getSize()}>
                {header.column.columnDef.header}
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
    </>
  );
};

export default ApprovalTable;

// export const loader = async() => {
//   const res = await fetch("/store/approval/list");
//   return res.json();
// }