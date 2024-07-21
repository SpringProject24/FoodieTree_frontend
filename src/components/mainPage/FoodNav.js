import React, { useState } from "react";
import CategoryBtn from "./CategoryBtn";
import styles from "./FoodNav.module.scss";
// import bannerImg from "../../assets/images/userMain/header.jpg";

import { useRef, useEffect } from "react";
import { register } from "swiper/element/bundle";

register();

const FoodNav = ({categories, stores}) => {
  const swiperElRef = useRef(null);

  useEffect(() => {
    swiperElRef.current.addEventListener("swiperprogress", (e) => {
      const [swiper, progress] = e.detail;
      console.log(progress);
    });

    swiperElRef.current.addEventListener("swiperslidechange", (e) => {
      console.log("slide changed");
    });
  }, []);


  return (
    <>

      {/* 내가 찜한 가게 리스트 */}
      <div className={styles.list1}>
        <h2 className={styles.title1}>내가 찜한 가게</h2>
        <div className={styles["favorite-store-list"]}>
     
        </div>
        <swiper-container
            ref={swiperElRef}
            slides-per-view="4"
            navigation="true"
            pagination="true"
            loop="true"
          >
              {stores.map((store, index) => (
                <swiper-slide>
                  <div key={index} className={styles.storeItem}>
                    <img src={store.image} alt={store.name} />
                    <p className={styles.storeName}>{store.name}</p>
                    <span className={styles.storePrice}>{store.price}</span>
                  </div>
                </swiper-slide>
              ))}
          </swiper-container>

      </div>


      {/* 주변 가게 리스트 */}
      <div className={styles.list1}>
        <h2 className={styles.title1}>주변 가게</h2>
        <div className={styles["favorite-store-list"]}>
     
        </div>
        <swiper-container
            ref={swiperElRef}
            slides-per-view="5"
            navigation="true"
            pagination="true"
            loop="true"
          >
              {stores.map((store, index) => (
                <swiper-slide>
                  <div key={index} className={styles.storeItem}>
                    <img src={store.image} alt={store.name} />
                    <p className={styles.storeName}>{store.name}</p>
                    {/* <span className={styles.discount}>{store.discount}</span> */}
                    <span className={styles.storePrice}>{store.price}</span>
                  </div>
                </swiper-slide>
              ))}
          </swiper-container>

      </div>




      {/* 추천 가게 리스트 */}
      <div className={styles.list1}>
        <h2 className={styles.title1}>추천 가게</h2>
        <div className={styles["favorite-store-list"]}>
     
        </div>
        <swiper-container
            ref={swiperElRef}
            slides-per-view="5"
            navigation="true"
            pagination="true"
            loop="true"
          >
              {stores.map((store, index) => (
                <swiper-slide>
                  <div key={index} className={styles.storeItem}>
                    <img src={store.image} alt={store.name} />
                    <p className={styles.storeName}>{store.name}</p>
                    {/* <span className={styles.discount}>{store.discount}</span> */}
                    <span className={styles.storePrice}>{store.price}</span>
                  </div>
                </swiper-slide>
              ))}
          </swiper-container>

      </div>
    </>
  );
};

export default FoodNav;
