import React, { useRef, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.css';
import styles from './FoodNav.module.scss';

const BestStoreList = ({ categories = [], stores = [] }) => {
  const swiperElRef = useRef(null);

  useEffect(() => {
    if (swiperElRef.current) {
      swiperElRef.current.addEventListener('swiperprogress', (e) => {
        const [swiper, progress] = e.detail;
        console.log(progress);
      });

      swiperElRef.current.addEventListener('swiperslidechange', () => {
        console.log('slide changed');
      });
    }
  }, []);

  return (
    <>
      {/* 추천 가게 리스트 */}
      <div className={styles.list}>
        <h2 className={styles.title}>추천 가게</h2>
        <Swiper
          slidesPerView={5}
          spaceBetween={10}
          navigation
          pagination={{ clickable: true }}
          loop
          ref={swiperElRef}
        >
          {stores.length === 0 ? (
            <SwiperSlide>No stores available</SwiperSlide>
          ) : (
            stores.map((store, index) => (
              <SwiperSlide key={index}>
                <div className={styles.storeItem}>
                  <img src={store.storeImg} alt={store.storeName} />
                  <p className={styles.storeName}>{store.storeName}</p>
                  <span className={styles.storePrice}>{store.price}</span>
                  <span className={styles.productCnt}></span>
                  <span className={styles.productCnt}>남은 갯수 : {store.productCnt}</span>
                </div>
              </SwiperSlide>
            ))
          )} 
        </Swiper>
      </div>
    </>
  );
};

export default BestStoreList;
