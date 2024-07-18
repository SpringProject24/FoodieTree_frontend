import React, {useEffect, useState} from 'react';
import {Form, redirect} from "react-router-dom";
import UploadInput from "./UploadInput";
import formStyle from './StoreRegisterForm.module.scss';
import radioStyle from './ProductRegisterForm.module.scss';
import PriceRadioBox from "./PriceRadioBox";
import {STORE_URL} from "../../config/host-config";


const ProductRegisterForm = () => {

  const PRICE_OPTIONS = [
    {name: '3,900원', value: 3900},
    {name: '5,900원', value: 5900},
    {name: '7,900원', value: 7900},
  ]

  // input 상태관리
  const [values, setValues] = useState({
    productCnt: '',
    price: '',
    productImage: '',
  });

  const changeHandler = (e) => {
    e.preventDefault();

    setValues(prevValues => {
      const {name, value} = e.target;
      return {
        ...prevValues,
        [name]: value
      };
    })
    // console.log('상품 등록: ', values)
  };
  //
  const onAdd = (file) => {
    setValues(prevValues => ({
      ...prevValues,
      productImage: file
    }));
  };
  const onPrice = (index) => {
    setValues(prevValues => ({
      ...prevValues,
      price: PRICE_OPTIONS[index].value
    }));
  };

  useEffect(() => {
    console.log('상품 등록: ', values);
  }, [values]);

  return (

    <Form method={'post'} className={formStyle.registration}>
      <h2>랜덤팩 등록</h2>
      <h3>푸디트리를 통해 새로운 로컬 고객을 만나보세요!</h3>
      <UploadInput onAdd={onAdd}/>

      <label htmlFor="productCnt">랜덤팩 수량</label>
      <input
        type="number"
        id="productCnt"
        name="productCnt"
        value={values.productCnt}
        onChange={changeHandler}
        placeholder="매일 설정될 기본 수량입니다."
        required
      />

      <label htmlFor="price">랜덤팩 가격</label>
      <PriceRadioBox
        name={'price'}
        options={PRICE_OPTIONS}
        value={values.price}
        className={radioStyle.chips}
        onChange={changeHandler}
        onPrice={onPrice}
      />
      {/*<SelectBox*/}
      {/*  name={'price'}*/}
      {/*  options={PRICE_OPTIONS}*/}
      {/*  value={values.price}*/}
      {/*  onChange={changeHandler}*/}
      {/*/>*/}

      <button type="submit" className={formStyle["btn-approval"]}>상품 등록하기</button>
    </Form>
  );
};

export default ProductRegisterForm;

export const productRegisterAction = async ({request}) => {

  const formData = await request.formData();
  // console.log('product 등록액션: ', formData.entries())
  const payload = {
    productCnt: formData.get('productCnt'),
    price: formData.get('price'),
    productImage: formData.get('productImage'),
  };
  console.log('product 등록액션 payload: ', payload)
  const ent = formData.entries()
  for(const e of ent) {
    console.log(e[0], ' / ', e[1])
  }
  const response = await fetch(`${STORE_URL}/product/approval`, {
    method: 'POST',
    headers: {
      'Content-Type': 'multipart/form-data',
      // 'Authorization': 'Bearer' + token,
    },
    // body: JSON.stringify(payload)
    body: payload
  });
  // 200 외 상태코드 처리

  // return redirect('/store/mypage')
  return redirect('/store')
}