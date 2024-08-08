import React from "react";

export const COLUMNS =
  [
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