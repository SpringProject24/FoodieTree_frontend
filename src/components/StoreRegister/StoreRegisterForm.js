import React from 'react';
import {Form} from 'react-router-dom';
import styles from '/StoreRegisterForm.module.scss'

const StoreRegisterForm = () => {
  return (
    <Form className={registration}>
      <h2>가게 등록 - 푸디트리와 지구를 위한 한걸음 함께 해보아요!</h2>
      <label htmlFor='bizLicenseNum'>사업자등록번호</label>
      <input
        name='bizLicenseNum'
        type="text"
        maxLength={12}
        placeholder="사업자등록번호는 필수 입력 값입니다."
      />
      <label htmlFor='bizName'>상호명</label>
      <input
        name='bizName'
        type="text"
        maxLength={30}
        placeholder="상호명은 필수 입력 값입니다."
      />
      <label htmlFor='bizAddress'>가게 주소</label>
      <input
        name='bizAddress'
        type="text"
        placeholder="가게 주소는 필수 입력 값입니다."
      />
      <label htmlFor='bizPhoneNum'>가게 연락처</label>
      <input
        name='bizPhoneNum'
        type="text"
        placeholder="가게 연락처는 필수 입력 값입니다."
      />
      <label htmlFor='bizCategory'>업종</label>
      <select
        name='bizCategory'
      >
        <option value="">업종을 선택하세요</option>
        <option value="KOREAN">한식</option>
        <option value="WESTERN">양식</option>
        <option value="CHINESE">중식</option>
        <option value="JAPANESE">일식</option>
        <option value="CAFE">카페</option>
        <option value="DESSERT">디저트</option>
        <option value="ELSE">기타</option>
      </select>

      <button className="btn-approval" type="submit">가게 등록 요청하기</button>
    </Form>
  );
};

export default StoreRegisterForm;