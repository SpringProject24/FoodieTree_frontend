import React, {useState} from 'react';
import styles from './ProductRegisterForm.module.scss'

const PriceRadioBox = ({options, onPrice}) => {

  // 상품 가격 상태관리
  const [pickedPriceIndex, setPickedPriceIndex] = useState(null);

  // 가격 클릭 시 상태 업데이트 및 ProductRegisterForm에 전달
  const clickHandler = (index, e) => {
    setPickedPriceIndex(index);
    onPrice(index);
  }

  return ( <></>
  //   <>
  //       {
  //         options.map((opt, index) => (
  //
  //           <input
  //           key={opt.value}
  //           value={opt.value}
  //           className={`${styles.chip} ${pickedPriceIndex === index ? styles.picked : ''}`}
  //           onClick={(e) => {clickHandler(index, e)}}
  //           >
  //           <label htmlFor={opt.value}>
  //             {opt.name}
  //           </label>
  //         ))
  //       }
  //   </>
  );
};

export default PriceRadioBox;