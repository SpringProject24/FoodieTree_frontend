import React, {useMemo} from 'react';
import Table from "./Table";

const ApprovalTable = () => {
  const columns = useMemo(
    () => [
      {
        accessor: "name",
        Header: "Name",
      },
      {
        accessor: "email",
        Header: "Email",
      },
      {
        accessor: "phone",
        Header: "Phone",
      },
    ],
    []
  );


  const data = useMemo(
    () =>
      Array(53)
        .fill()
        .map(a => ({
          name: '이름 ' + a,
          email: '이메일 '+ a,
          phone: '01012345678',
        })),
    []
  );

  return <Table columns={columns} data={data} />;
};

export default ApprovalTable;