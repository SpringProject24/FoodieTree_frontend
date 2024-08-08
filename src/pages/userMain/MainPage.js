import React, { useState, useEffect } from 'react';
import FoodNav from '../../components/mainPage/FoodNav';
import CategoryBtn from '../../components/mainPage/CategoryBtn';
import { STORELISTS_URL } from '../../config/host-config';
import { useNavigate } from 'react-router-dom';
import {checkAuthToken} from "../../utils/authUtil";

const MainPage = () => {
  const [selectedCategory, setSelectedCategory] = useState('전체');
  const [stores, setStores] = useState([]);
  const categories = ["한식", "중식", "양식", "일식", "디저트", "카페", "기타"];

  const navigate = useNavigate();


  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
  };

  useEffect( async () => {
    /**
     * checkAuthToken
     *
     * 토큰이 있으면 현재 페이지 유지
     * - 토큰이 있으면 userType(role), email(sub), token, refreshToken 리턴
     * 토큰이 없으면 sign-in 리다이렉션
     */
    const fetchUserAndData = async () => {
    const userInfo = await checkAuthToken(navigate);
    if (userInfo) {
      const {token, refreshToken} = userInfo;

      // API로부터 데이터 가져오기
      fetch(STORELISTS_URL, {

        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + token,
          'refreshToken': refreshToken
        }
      })
          .then(response => response.json())
          .then(data => setStores(data))
          .catch(error => console.error('데이터를 가져오는 중 오류 발생:', error));
      }
    }
    fetchUserAndData();
  }, [navigate]);


  return (
    <div className="main-page">
      <CategoryBtn categories={categories} onCategoryClick={handleCategoryClick} />
      <FoodNav selectedCategory={selectedCategory} stores={stores} />
    </div>
  );
}

export default MainPage;
