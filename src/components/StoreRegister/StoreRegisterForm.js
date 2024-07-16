import React, {useState} from 'react';
import {Form} from 'react-router-dom';
import styles from './StoreRegisterForm.module.scss'
import SelectBox from "./SelectBox";

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

  const submitHandler = (e) => {
    e.preventDefault();
  };

  return (
    <Form className={styles.registration} onSubmit={submitHandler}>
      <h2>가게 등록 - 푸디트리와 지구를 위한 한걸음 함께 해보아요!</h2>
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
      />
      <label htmlFor='bizAddress'>가게 주소</label>
      <input
        id='bizAddress'
        name='bizAddress'
        value={values.bizAddress}
        onChange={changeHandler}
        type="text"
        placeholder="가게 주소는 필수 입력 값입니다."
      />
      <label htmlFor='bizPhoneNum'>가게 연락처</label>
      <input
        id='bizPhoneNum'
        name='bizPhoneNum'
        value={values.bizPhoneNum}
        onChange={changeHandler}
        type="text"
        placeholder="가게 연락처는 필수 입력 값입니다."
      />
      <label htmlFor='bizCategory'>업종</label>
      <SelectBox
        name='bizCategory'
        options={OPTIONS}
        value={values.bizCategory}
        onChange={changeHandler}
      />

      <div className={styles['btn-approval']}>가게 등록 요청하기</div>
    </Form>
  );
};

export default StoreRegisterForm;