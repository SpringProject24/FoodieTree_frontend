
import React from 'react';
import CategoryBtn from './CategoryBtn';
import styles from './FoodNav.module.scss';
import bannerImg from '../../assets/images/userMain/header.jpg';

const FoodNav = ({ categories }) => {
  const handleCategoryClick = (category) => {
    console.log(`Selected category: ${category}`);
  };

  return (
    <>
      <header className={styles['App-header']}>
        <div className={styles.banner}>
          <img
            src={bannerImg}
            alt="banner Image 나중에 바꿀 예정"
          />
        </div>
        <div className={styles.title}>
          <h1>환경을 생각하는 착한 소비</h1>
          <p>원하는 음식을 선택하세요!</p>
        </div>
      </header>

      <div className={styles.nav}>
        <div className={styles['food-nav']}>
          {categories.map(category => (
            <CategoryBtn key={category} label={category} onClick={() => handleCategoryClick(category)} />
          ))}
        </div>
      </div>
    </>
  );
}

export default FoodNav;
