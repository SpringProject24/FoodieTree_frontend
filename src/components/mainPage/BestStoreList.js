import React, { useRef, useEffect } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import styles from './FoodNav.module.scss';
import Arrow from './Arrow'; // Arrow 컴포넌트가 필요하다면 import 합니다.
import { useModal } from '../../pages/common/ModalProvider';

const BestStoreList = ({ stores = [] }) => {
  const { openModal } = useModal();

  const settings = {
    slidesToShow: 5,
    slidesToScroll: 5,
    infinite: true,
    arrows: true,
    prevArrow: <Arrow direction="prev" />,
    nextArrow: <Arrow direction="next" />,
    dots: true,
    centerMode: true,
    centerPadding: '0',
      responsive: [
        {
          breakpoint: 400,
          settings: {
            dots: false,
            slidesToShow: 2, 
            centerPadding: '10%',
            // centerMode: false,
          },
        },
      ],
  };

  const handleClick = (store) => {
    openModal('productDetail', { productDetail: store });
  };

  return (
    <div className={styles.list}>
      <h2 className={styles.title}>추천 가게</h2>
      <Slider {...settings} className={styles.slider}>
        {stores.length === 0 ? (
          <div>No stores available</div>
        ) : (
          stores.map((store, index) => (
            <div key={index} className={styles.storeItem} onClick={() => handleClick(store)}>
              <img src={store.storeImg} alt={store.storeName} />
              <p className={styles.storeName}>{store.storeName}</p>
              <span className={styles.storePrice}>{store.price}</span>
              <span className={styles.productCnt}>남은 갯수 : {store.productCnt}</span>
            </div>
          ))
        )}
      </Slider>
    </div>
  );
};

export default BestStoreList;

