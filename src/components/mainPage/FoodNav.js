import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import { useModal } from "../../pages/common/ModalProvider";
import styles from "./FoodNav.module.scss";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Arrow from './Arrow';

// 🌿 랜덤 가게 리스트 생성
const getRandomStores = (stores, count) => {
  const shuffled = [...stores].sort(() => 0.5 - Math.random()); // stores 배열을 랜덤으로 섞기
  return shuffled.slice(0, count); // 원하는 개수의 가게를 선택
};

// 🌿 카테고리 문자열에서 실제 foodType만 추출하는 함수
const extractFoodType = (category) => {
  // category 문자열에서 'foodType=' 이후의 값을 추출
  const match = category.match(/\(foodType=(.*?)\)/);
  return match ? match[1] : category; // 추출된 foodType 또는 원래 문자열 반환
};

const FoodNav = ({ selectedCategory, stores }) => {
  const [randomStores, setRandomStores] = useState([]);
  const { openModal } = useModal();

  useEffect(() => {
    // 랜덤한 가게 목록을 선택하여 상태를 업데이트
    setRandomStores(getRandomStores(stores, 5)); 
  }, [stores]);

  const handleClick = (store) => {
    openModal('productDetail', { productDetail: store });
  };

  const settings = (slidesToShow) => ({
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: slidesToShow,
    slidesToScroll: 5,
    centerMode: true,
    centerPadding: '0',
    arrows: true,
    prevArrow: <Arrow direction="prev" />,
    nextArrow: <Arrow direction="next" />,
    responsive: [
      {
        breakpoint: 400,
        settings: {
          dots: false,
          slidesToShow: 2, 
          centerPadding: '10%',
        },
      },
    ],
  });

  return (
    <>
      {/* 내가 찜한 가게 리스트 */}
      <div className={styles.list}>
        <h2 className={styles.title}>나의 단골 가게</h2>
        <Slider {...settings(4)} className={styles.slider}>
          {stores.map((store, index) => (
            <div
              key={index}
              onClick={() => handleClick(store)}
              className={`${styles.storeItem} ${store.productCnt === 1 ? styles['low-stock'] : ''}`}
            >
              <img src={store.storeImg} alt={store.storeName} />
              {store.productCnt === 1 && <div className={styles.overlay}>예약 가능</div>}
              <p className={styles.storeName}>{store.storeName}</p>
              <span className={styles.storePrice}>{store.price}</span>
              <span className={styles.productCnt}>남은 갯수 : {store.productCnt}</span>
            </div>
          ))}
        </Slider>
      </div>

      {/* 주변 가게 리스트 */}
      <div className={styles.list}>
        <h2 className={styles.title}>000동 근처 가게</h2>
        <Slider {...settings(4)} className={styles.slider}>
          {stores.map((store, index) => (
            <div
              key={index}
              onClick={() => handleClick(store)}
              className={`${styles.storeItem} ${store.productCnt === 1 ? styles['low-stock'] : ''}`}
            >
              <img src={store.storeImg} alt={store.storeName} />
              {store.productCnt === 1 && <div className={styles.overlay}>예약 가능</div>}
              <p className={styles.storeName}>{store.storeName}</p>
              <span className={styles.storePrice}>{store.price}</span>
              <span className={styles.productCnt}>남은 갯수 : {store.productCnt}</span>
            </div>
          ))}
        </Slider>
      </div>

      {/* 추천 가게 리스트(랜덤) */}
      <div className={styles.list}>
        <h2 className={styles.title}>이웃들의 추천 가게</h2>
        <Slider {...settings(4)} className={styles.slider}>
          {randomStores.map((store, index) => (
            <div
              key={index}
              onClick={() => handleClick(store)}
              className={`${styles.storeItem} ${store.productCnt === 1 ? styles['low-stock'] : ''}`}
            >
              <img src={store.storeImg} alt={store.storeName} className={styles.image} />
              <span className={styles.category}>{extractFoodType(store.category)}</span>
              <p className={styles.storeName}>{store.storeName}</p>
              <span className={styles.storePrice}>{store.price}</span>
              <span className={styles.productCnt}>남은 갯수 : {store.productCnt}</span>
              {store.productCnt === 1 && <div className={styles.overlay}>예약 가능</div>}
            </div>
          ))}
        </Slider>
      </div>
    </>
  );
};

export default FoodNav;
