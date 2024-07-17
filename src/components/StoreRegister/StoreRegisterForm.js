import React, {useState} from 'react';
import {Form, redirect} from 'react-router-dom';
import styles from './StoreRegisterForm.module.scss'
import SelectBox from "./SelectBox";
import {STORE_URL} from "../../config/host-config";

const StoreRegisterForm = () => {
  console.log('가게-등록-폼 실행!');

  // select option 배열
  const OPTIONS = [
    {name: '한식', value: 'KOREAN'},
    {name: '양식', value: 'WESTERN'},
    {name: '중식', value: 'CHINESE'},
    {name: '일식', value: 'JAPANESE'},
    {name: '카페', value: 'CAFE'},
    {name: '디저트', value: 'DESSERT'},
    {name: '기타', value: 'ELSE'},
  ];
  // input 상태관리
  const [values, setValues] = useState({
    bizLicenseNum: '',
    bizName: '',
    bizAddress: '',
    bizPhoneNum: '',
    bizCategory: '',
  });

  const changeHandler = (e) => {
    e.preventDefault();

    setValues(prevValues => {
      const { name, value } = e.target;
        console.log('가게등록 setValue: ', value)
      return {
        ...prevValues,
        [name]: value
      };
    })
  };

  return (
    <Form
      method='post'
      className={styles.registration}
    >
      <h2>가게 등록</h2>
      <h3>푸디트리와 지구를 위한 한걸음 함께 해보아요!</h3>
      <label htmlFor='bizLicenseNum'>사업자등록번호</label>
      <input
        id='bizLicenseNum'
        name='bizLicenseNum'
        value={values.bizLicenseNum}
        onChange={changeHandler}
        type="text"
        maxLength={12}
        placeholder="사업자등록번호는 필수 입력 값입니다."
      />
      <label htmlFor='bizName'>상호명</label>
      <input
        id='bizName'
        name='bizName'
        value={values.bizName}
        onChange={changeHandler}
        type="text"
        maxLength={30}
        placeholder="상호명은 필수 입력 값입니다."
        required
      />
      <label htmlFor='bizAddress'>가게 주소</label>
      <input
        id='bizAddress'
        name='bizAddress'
        value={values.bizAddress}
        onChange={changeHandler}
        type="text"
        placeholder="가게 주소는 필수 입력 값입니다."
        required
      />
      <label htmlFor='bizPhoneNum'>가게 연락처</label>
      <input
        id='bizPhoneNum'
        name='bizPhoneNum'
        value={values.bizPhoneNum}
        onChange={changeHandler}
        type="text"
        placeholder="가게 연락처는 필수 입력 값입니다."
        required
      />
      <label htmlFor='bizCategory'>업종</label>
      <SelectBox
        name='bizCategory'
        options={OPTIONS}
        value={values.bizCategory}
        onChange={changeHandler}
      />

      <button type="submit" className={styles['btn-approval']}>가게 등록 요청하기</button>
    </Form>
  );
};

export default StoreRegisterForm;

export const storeRegisterAction = async ({request}) => {

  const formData = await request.formData();
  // console.log('store 등록액션: ', formData.entries())
  const payload = {
    ... formData.entries()
  };
  console.log('store 등록액션 payload: ', payload)
  const response = await fetch(`${STORE_URL}/approval`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      // 'Authorization': 'Bearer' + token,
    },
    body: payload
  });
  // 200 외 상태코드 처리

  // return redirect('/store/mypage')
  return redirect('/store')
}