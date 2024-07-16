import React, {useState} from 'react';
import {Form} from "react-router-dom";
import UploadInput from "./UploadInput";
import SelectBox from "./SelectBox";

const ProductRegisterForm = () => {

  // input 상태관리
  const [values, setValues] = useState({
    productCnt: '',
    price: '',
  });

  const changeHandler = (e) => {
    e.preventDefault();

    setValues(prevValues => {
      const { name, value } = e.target;
      return {
        ...prevValues,
        [name]: value
      };
    })
  };

  const PRICE_OPTIONS = [
    {name: '3900원', value: 3900},
    {name: '5900원', value: 5900},
    {name: '7900원', value: 7900},
  ]

  return (

    <Form className={} onSubmit={}>
      <UploadInput/>


      <label htmlFor="productCnt">상품 수량 :</label>
      <input
        type="text"
        id="productCnt"
        name="productCnt"
        value={values.productCnt}
        onChange={changeHandler}
        placeholder="수량은 필수 입력 값입니다."
        required
      />

      <label htmlFor="price">상품 가격 :</label>
      <SelectBox
        name={'price'}
        options={PRICE_OPTIONS}
        value={values.price}
        onChange={changeHandler}
      />

      <button className="btn-approval" type="submit">상품 등록하기</button>
    </Form>
  );
};

export default ProductRegisterForm;