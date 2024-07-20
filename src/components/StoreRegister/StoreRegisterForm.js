import React, {useCallback, useEffect, useState} from 'react';
import {Form, redirect} from 'react-router-dom';
import styles from './StoreRegisterForm.module.scss'
import SelectBox from "./SelectBox";
import {STORE_URL} from "../../config/host-config";
import {debounce} from "lodash";
import useFormValidation from "./useFormValidation";

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
// 사업자등록번호 유효성 검증용 인증키
const keyArr = [1, 3, 7, 1, 3, 7, 1, 3, 5];

const initialValues = {
      bizLicenseNum: '',
      bizName: '',
      bizAddress: '',
      bizPhoneNum: '',
      bizCategory: '',
}
  // 사업자등록번호가 유효한지 검증
  const checkLicense = (value) => {
    const numberArr = value.replaceAll('-', '').split('').map(d => parseInt(d, 10));

    if(numberArr.length === 10) {
      let sum = 0;
      keyArr.forEach((key, i)=>{
        sum += key * numberArr[i];
      });
      sum += Math.floor((keyArr[8] * numberArr[8]) / 10);
      return numberArr[9] === ((10 - (sum % 10)) % 10);
    }
    return false;
  }

  const validate = (name, value) => {
    switch (name) {
      case 'bizLicenseNum':
        console.log(value)
        return /^\d{10}$/.test(value) && checkLicense(value)
            ? null : '유효한 사업자등록번호 숫자만 입력해주세요.';
      case 'bizName':
      case 'bizAddress':
        return value.trim() !== '' ? null : '필수 입력 값입니다.';
      case 'bizPhoneNum':
        return /^(02|0[3-9]\d{1}|01[0-9])\d{7,8}$/.test(value.replaceAll('-',''))
            ? null : '전화번호를 입력해주세요.';
      case 'bizCategory':
        return OPTIONS.some(option => option.value === value)
            ? null : '업종을 선택해 주세요.';
      default:
        return null;
    }
  };

const StoreRegisterForm = () => {
  console.log('가게-등록-폼 실행!');

  const { values, errors, isFormValid, changeHandler, setValues }
      = useFormValidation(initialValues, validate);

  // input 검증 결과 및 메세지 상태
  // const [errors, setErrors] = useState({});
  // 모든 입력 필드 검증결과에 따라 폼의 제출 버튼을 활성화/비활성화
  // const [isFormValid, setIsFormValid] = useState(false);


  // const changeHandler = (e) => {
  //   e.preventDefault();
  //   const { name, value } = e.target;
  //
  //   setValues(prevValues => {
  //     return {
  //       ...prevValues,
  //       [name]: value
  //     };
  //   })
  //   // 디바운스된 검증 함수 호출
  //   debouncedValidate(name, value);
  // };

  return (
    <Form
      method='post'
      className={styles.registration}
    >
      <h2>가게 등록</h2>
      <h3>푸디트리와 지구를 위한 한걸음 함께 해보아요!</h3>
      <label htmlFor='bizLicenseNum'>사업자등록번호
        {errors.bizLicenseNum && <span className={styles.error}>{errors.bizLicenseNum}</span>}
      </label>
      <input
        id='bizLicenseNum'
        name='bizLicenseNum'
        value={values.bizLicenseNum}
        onChange={changeHandler}
        type="text"
        maxLength={10}
        placeholder="사업자등록번호는 필수 입력 값입니다. 숫자만 입력해주세요."
      />

      <label htmlFor='bizName'>상호명
        {errors.bizName && <span className={styles.error}>{errors.bizName}</span>}
      </label>
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
      <label htmlFor='bizAddress'>가게 주소
        {errors.bizAddress && <span className={styles.error}>{errors.bizAddress}</span>}
      </label>
      <input
        id='bizAddress'
        name='bizAddress'
        value={values.bizAddress}
        onChange={changeHandler}
        type="text"
        placeholder="가게 주소는 필수 입력 값입니다."
        required
      />
      <label htmlFor='bizPhoneNum'>가게 연락처
        {errors.bizPhoneNum && <span className={styles.error}>{errors.bizPhoneNum}</span>}
      </label>
      <input
        id='bizPhoneNum'
        name='bizPhoneNum'
        value={values.bizPhoneNum}
        onChange={changeHandler}
        type="text"
        placeholder="가게 연락처는 필수 입력 값입니다."
        required
      />
      <label htmlFor='bizCategory'>업종
        {errors.bizCategory && <span className={styles.error}>{errors.bizCategory}</span>}
      </label>
      <SelectBox
        name='bizCategory'
        options={OPTIONS}
        value={values.bizCategory}
        onChange={changeHandler}
      />


      <button
          type="submit"
          className={`${styles['btn-approval']} ${!isFormValid && styles.disabled}`}
          disabled={!isFormValid}
      >
        가게 등록 요청하기
      </button>
    </Form>
  );
};

export default StoreRegisterForm;

export const storeRegisterAction = async ({request}) => {

  const formData = await request.formData();
  const payload = {
    bizLicenseNum: formData.get('bizLicenseNum'),
    bizName: formData.get('bizName'),
    bizAddress: formData.get('bizAddress'),
    bizPhoneNum: formData.get('bizPhoneNum'),
    bizCategory: formData.get('bizCategory'),
  }
  console.log('store 페이로드: ', payload)

  const response = await fetch(`${STORE_URL}/approval`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      // 'Authorization': 'Bearer' + token,
    },
    body: JSON.stringify(payload),
  });
  // 200 외 상태코드 처리 필요

  // return redirect('/store/mypage')
  return redirect('/store')
}