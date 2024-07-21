import React, { useState } from 'react';
import FoodNav from '../../components/mainPage/FoodNav';

import img1 from '../../assets/images/userMain/image1.jpg';
import img2 from '../../assets/images/userMain/image2.jpg';
import img3 from '../../assets/images/userMain/image3.jpg';
import CategoryBtn from '../../components/mainPage/CategoryBtn';

const MainPage = () => {
  const [selectedCategory, setSelectedCategory] = useState('전체');
  const categories = ["한식", "중식", "양식", "일식", "디저트", "카페", "기타"];

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
  };

  // 내가 찜한 가게 리스트 더미
  const stores = [
    { name: '공차', category: '카페', image: img1, price: 3900, discount: '55%'},
    { name: '김밥천국', category: '한식', image: img2, price: 3900  },
    { name: '메가커피', category: '카페', image: img3, price: 3900  },
    { name: 'Store 4', category: '양식', image: img1, price: 3900  },
    { name: 'Store 5', category: '중식', image: img2, price: 3900  },
    { name: 'Store 6', category: '일식', image: img3, price: 3900  },
    { name: 'Store 7', category: '양식', image: img3, price: 6900  },

  ];

  return (
    <div className="main-page">
      <CategoryBtn categories={categories} onCategoryClick={handleCategoryClick} />
      <FoodNav selectedCategory={selectedCategory} stores={stores} />
    </div>
  );
}

export default MainPage;
