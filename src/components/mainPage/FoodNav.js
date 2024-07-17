import React from "react";
import CategoryBtn from "./CategoryBtn";
import styles from "./FoodNav.module.scss";
import bannerImg from "../../assets/images/userMain/header.jpg";
import { register } from "swiper/element";
import { useRef, useEffect } from "react";

register();
const FoodNav = ({ categories, stores }) => {
  const swiperElRef = useRef(null);

  // useEffect(() => {
  //   // listen for Swiper events using addEventListener
  //   swiperElRef.current.addEventListener("swiperprogress", (e) => {
  //     const [swiper, progress] = e.detail;
  //     console.log(progress);
  //   });

  //   swiperElRef.current.addEventListener("swiperslidechange", (e) => {
  //     console.log("slide changed");
  //   });
  // }, []);
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
            <CategoryBtn key={category} label={category} />
          ))}
        </div>
      </div>

      {/* 내가 찜한 가게 리스트 */}
      <div className={styles.list1}>
        <h2 className={styles.title1}>❤️ 내가 찜한 가게</h2>
        <div className={styles["favorite-store-list"]}>
          {/* <Swiper
            slidesPerView={4}
            spaceBetween={10}
            navigation
            pagination={{ clickable: true }}
          >
            {stores.map((store, index) => (
              <SwiperSlide key={index} className={styles.storeItem}>
                <img src={store.image} alt={store.name} />
                <p className={styles.storeName}>{store.name}</p>
                <p className={styles.storePrice}>{store.price}</p>
              </SwiperSlide>
            ))}
          </Swiper> */}
        </div>
        {/* <swiper-container
          ref={swiperElRef}
          slides-per-view="1"
          navigation="true"
          pagination="true"
        >
          <swiper-slide>Slide 1</swiper-slide>
          <swiper-slide>Slide 2</swiper-slide>
          <swiper-slide>Slide 3</swiper-slide>
          <swiper-slide>Slide 4</swiper-slide>
          <swiper-slide>Slide 5</swiper-slide>
          <swiper-slide>Slide 6</swiper-slide>
        </swiper-container> */}
      </div>
    </>
  );
};

export default FoodNav;
