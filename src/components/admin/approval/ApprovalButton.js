import React from 'react';
import styles from "./ApprovalTables.module.scss";

const ApprovalButton = ({rows, data}) => {

  const clickHandler = (e) => {
    e.preventDefault();
    if(Object.keys(rows).length === 0) {
      alert(`행을 선택해주세요.`);
      return;
    }
    const actionType = e.target.name;
    const approvalIdList = Object.keys(rows).map(i => data[+i])
      // .filter(d => d.storeId && d.price && d.productCnt && d.productImage) // 원래는 사진 있는지 체크해야함
      .filter(d => d.storeId && d.price && d.productCnt)
      .map(d => d.id);

    const isConfirm = window.confirm(
      ` ✅ 요청: ${actionType === 'APPROVED' ? '스토어 등록 승인' : '스토어 등록 거절'} \n ✅ 선택한 행의 갯수: ${approvalIdList.length}`);

    if(isConfirm) {
      console.log("확인")
    }

  }

  return (
    <div className={styles['status-btn-container']}>
      <button name={'APPROVED'} onClick={clickHandler}>승인</button>
      <button name={'REJECTED'} onClick={clickHandler}>거절</button>
    </div>
  );
};

export default ApprovalButton;