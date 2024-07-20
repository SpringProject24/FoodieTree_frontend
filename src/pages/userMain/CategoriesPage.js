import React from 'react';
import { useParams } from 'react-router-dom';
import CategoryBtn from '../../components/mainPage/CategoryBtn';
import styles from './CategoriesPage.module.scss';

import kFood from "../../assets/images/userMain/kFood.png";
import cFood from "../../assets/images/userMain/cFood.png";
import uFood from "../../assets/images/userMain/uFood.png";
import jFood from "../../assets/images/userMain/jFood.png";
import dessert from "../../assets/images/userMain/dessert.png";
import cafe from "../../assets/images/userMain/cafe.png";
import salad from "../../assets/images/userMain/salad.png";

//카테고리 정보
const categoriesInfo = {
  korean: { name: '한식', image: kFood },
  chinese: { name: '중식', image: cFood },
  western: { name: '양식', image: uFood },
  japanese: { name: '일식', image: jFood },
  dessert: { name: '디저트', image: dessert },
  cafe: { name: '카페', image: cafe },
  etc: { name: '기타', image: salad },
};

const categories = Object.keys(categoriesInfo).map(key => categoriesInfo[key].name);

const CategoriesPage = () => {
  const { categoryName } = useParams();
  const category = categoriesInfo[categoryName];

  return (
    <>
      <div className={styles.header}>
        <h1>{category.name}</h1>
        <div className={styles.btnImg}>
          <img src={category.image} alt={category.name} />
        </div>
      </div>
      
      <CategoryBtn categories={categories} />
    </>
  );
};

export default CategoriesPage;
