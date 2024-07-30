import React, { useRef, useEffect, useState } from "react";
import { useModal } from "../../pages/common/ModalProvider"; // ModalProvider에서 useModal 훅을 가져옵니다.
import styles from "./FoodNav.module.scss";
import { register } from "swiper/element/bundle";

register();

// 🚩 랜덤 가게 리스트 생성
const getRandomStores = (stores, count) => {
  const shuffled = [...stores].sort(() => 0.5 - Math.random()); // stores 배열을 랜덤으로 섞기
  return shuffled.slice(0, count); // 원하는 개수의 가게를 선택
};

const FoodNav = ({ selectedCategory, stores }) => {
  const [randomStores, setRandomStores] = useState([]);
  const swiperElRef = useRef(null);
  const { openModal } = useModal(); // useModal 훅을 사용하여 모달을 엽니다.

  useEffect(() => {
    // 랜덤한 가게 목록을 선택하여 상태를 업데이트
    setRandomStores(getRandomStores(stores, 5)); 

    if (swiperElRef.current) {
      swiperElRef.current.addEventListener("swiperprogress", (e) => {
        const [swiper, progress] = e.detail;
        console.log(progress);
      });

      swiperElRef.current.addEventListener("swiperslidechange", (e) => {
        console.log("slide changed");
      });
    }
  }, [stores]);

  // 클릭 시 모달 열기
  const handleClick = (store) => {
    openModal('productDetail', { productDetail: store }); // 클릭 시 모달을 엽니다.
  };

  return (
    <>
      {/* 내가 찜한 가게 리스트 */}
      <div className={styles.list}>
        <h2 className={styles.title}>나의 단골 가게</h2>
        <swiper-container
          ref={swiperElRef}
          slides-per-view="4"
          navigation="true"
          pagination="true"
          loop="true"
        >
          {stores.map((store, index) => (
            <swiper-slide key={index} onClick={() => handleClick(store)}>
              <div className={styles.storeItem}>
                <img src={store.storeImg} alt={store.storeName} />
                <p className={styles.storeName}>{store.storeName}</p>
                <span className={styles.storePrice}>{store.price}</span>
                <span className={styles.productCnt}>남은 갯수 : {store.productCnt}</span>
              </div>
            </swiper-slide>
          ))}
        </swiper-container>
      </div>

      {/* 주변 가게 리스트 */}
      <div className={styles.list}>
        <h2 className={styles.title}>000동 근처 가게</h2>
        <swiper-container
          ref={swiperElRef}
          slides-per-view="5"
          navigation="true"
          pagination="true"
          loop="true"
        >
          {stores.map((store, index) => (
            <swiper-slide key={index} onClick={() => handleClick(store)}>
              <div className={styles.storeItem}>
                <img src={store.storeImg} alt={store.storeName} />
                <p className={styles.storeName}>{store.storeName}</p>
                <span className={styles.storePrice}>{store.price}</span>
                <span className={styles.productCnt}>남은 갯수 : {store.productCnt}</span>
              </div>
            </swiper-slide>
          ))}
        </swiper-container>
      </div>

      {/* 추천 가게 리스트(랜덤) */}
      <div className={styles.list}>
        <h2 className={styles.title}>이웃들의 추천 가게</h2>
        <swiper-container
          ref={swiperElRef}
          slides-per-view="5"
          navigation="true"
          pagination="true"
          loop="true"
        >
          {randomStores.map((store, index) => (
            <swiper-slide key={index} onClick={() => handleClick(store)}>
              <div className={styles.storeItem}>
                <img src={store.storeImg} alt={store.storeName} className={styles.image} />
                <span className={styles.category}>{store.category}</span>
                <p className={styles.storeName}>{store.storeName}</p>
                <span className={styles.storePrice}>{store.price}</span> 
                <span className={styles.productCnt}>남은 갯수 : {store.productCnt}</span>
              </div>
            </swiper-slide>
          ))}
        </swiper-container>
      </div>
    </>
  );
};

export default FoodNav;
