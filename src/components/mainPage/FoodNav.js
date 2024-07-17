import React, { useState } from "react";
import CategoryBtn from "./CategoryBtn";
import styles from "./FoodNav.module.scss";
import bannerImg from "../../assets/images/userMain/header.jpg";

import { useRef, useEffect } from "react";
import { register } from "swiper/element/bundle";

register();

const FoodNav = ({categories, stores}) => {
  const swiperElRef = useRef(null);

  useEffect(() => {
    // listen for Swiper events using addEventListener
    swiperElRef.current.addEventListener("swiperprogress", (e) => {
      const [swiper, progress] = e.detail;
      console.log(progress);
    });

    swiperElRef.current.addEventListener("swiperslidechange", (e) => {
      console.log("slide changed");
    });
  }, []);

  // const handleNextClick = () => {
  //   if(currentIndex<stores.length-4){
  //     setCurrentIndex(currentIndex+4);
  //   }
  // };
  // const handlePrevClick = () => {
  //   if(currentIndex>0){
  //     setCurrentIndex(currentIndex-4);
  //   }
  // };

  return (
    <>
      <header className={styles["App-header"]}>
        <div className={styles.banner}>
          <img src={bannerImg} alt="banner Image 나중에 바꿀 예정🚩" />
        </div>
        <div className={styles.title}>
          <h1>환경을 생각하는 착한 소비</h1>
          <p>원하는 음식을 선택하세요!</p>
        </div>
      </header>

      <div className={styles.nav}>
        <div className={styles["food-nav"]}>
          {categories.map((category) => (
            <CategoryBtn
              key={category}
              label={category}
              // onClick={() => handleCategoryClick(category)}
            />
          ))}
        </div>
      </div>

      {/* 내가 찜한 가게 리스트 */}
      <div className={styles.list1}>
        <h2 className={styles.title1}>❤️ 내가 찜한 가게</h2>
        <div className={styles["favorite-store-list"]}>
          {/* <button className={`${styles['navButton']} ${styles.left}`} onClick={handlePrevClick}>&lt;</button> */}

                    {/* <button className={`${styles.navButton} ${styles.right}`} onClick={handleNextClick}>&gt;</button> */}
        </div>
        <swiper-container
            ref={swiperElRef}
            slides-per-view="4"
            navigation="true"
            pagination="true"
          >
            {/* <div className={styles.storeList}> */}
              {stores.map((store, index) => (
                <swiper-slide>
                  <div key={index} className={styles.storeItem}>
                    <img src={store.image} alt={store.name} />
                    <p className={styles.storeName}>{store.name}</p>
                    <p className={styles.storePrice}>{store.price}</p>
                  </div>
                </swiper-slide>
              ))}
            {/* </div> */}
          </swiper-container>

      </div>
    </>
  );
};

export default FoodNav;
