import React from 'react';
import FoodNav from '../../components/mainPage/FoodNav';


const MainPage = () => {
  const categories = ["한식", "중식", "양식", "일식", "디저트", "기타"];

  return (
    <div className="main-page">
      
      <FoodNav categories={categories} />
    </div>
  );
}

export default MainPage;
