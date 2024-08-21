import React, {useEffect, useState} from 'react';
import styles from './ReviewForm.module.scss';
import Rating from '@mui/material/Rating';
import {useLocation, useNavigate} from "react-router-dom";
import {checkAuthToken, getRefreshToken, getToken, getUserEmail} from "../../utils/authUtil";

// 해시태그를 백엔드에서 기대하는 Enum으로 매핑
const hashtagMapping = {
  '✨ 특별한 메뉴가 있어요': 'SPECIAL_MENU',
  '🌿 채식 메뉴가 있어요': 'VEGETARIAN_MENU',
  '🍱 메뉴 구성이 알차요': 'GOOD_MENU_COMBINATION',
  '🪙 가성비 좋아요': 'GOOD_VALUE',
  '🥬 재료가 신선해요': 'FRESH_INGREDIENTS',
  '👍 음식이 맛있어요': 'TASTY_FOOD',
  '😆 직원이 친절해요': 'FRIENDLY_STAFF',
  '🫶 재방문 하고 싶어요': 'WANT_TO_REVISIT',
  '🫧 매장이 청결해요': 'CLEAN_STORE',
  '🍽️ 포장 상태가 좋아요': 'GOOD_PACKAGING',
  '🚀 빠르게 수령했어요': 'FAST_SERVICE',
  '🤩 음식 퀄리티가 좋아요': 'HIGH_QUALITY_FOOD',
  '🥣 편하게 먹기 좋아요': 'EASY_TO_EAT',
  '🔥 따뜻하게 먹었어요': 'HOT_FOOD',
  '🍀 의외의 발견': 'PLEASANT_SURPRISE',
};


// 해시태그 변환 함수
const convertToEnumHashtags = (selectedKeywords) => {
  return selectedKeywords.map(keyword => hashtagMapping[keyword]);
};

const ReviewForm = ({ onSubmit, reservationId, storeImg }) => {
  const [image, setImage] = useState(null);
  const [content, setContent] = useState('');
  const [selectedKeywords, setSelectedKeywords] = useState([]);
  const [rating, setRating] = useState(0); // 별점 상태 추가
  const [storeDetails, setStoreDetails] = useState({
    storeName: '',
    storeImg: '',
    storeAddress: ''
  });
  const navigate = useNavigate();

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const rId = queryParams.get('r');
  // const reservationId = queryParams.get('r');
  console.log('알림에서 전달된 예약Id ', rId);
  const customerId  = getUserEmail();
  console.log('customerId : ',customerId);

  useEffect(() => {
    checkAuthToken(navigate)
    fetchStoreDetails();
  }, []);


  const fetchStoreDetails = async () => {
    if (!rId) {
      console.error('Reservation ID is missing');
      return;
    }
    console.log("상점정보 가져오기 !!!!!!!!!!!!!!!!!!!!");
    try {
      const response = await fetch(`/review/storeInfo?reservationId=${rId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + getToken(),
          'refreshToken': getRefreshToken()
        },
      });
      if (response.ok) {
        const data = await response.json();
        setStoreDetails(data);

        console.log("상점정보 get fetch : ", data);
      } else {
        console.error('Failed to fetch store details');
      }
    } catch (error) {
      console.error('Error fetching store details:', error);
    }
  };


  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleKeywordClick = (keyword) => {
    setSelectedKeywords((prev) =>
      prev.includes(keyword)
        ? prev.filter((k) => k !== keyword)
        : [...prev, keyword]
    );
    console.log(`Selected Keyword: ${hashtagMapping[keyword]} (${keyword})`);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // 변환된 해시태그 배열 생성
    const convertedHashtags = convertToEnumHashtags(selectedKeywords);

    const reviewData = {
      reservationId: rId,
      customerId: customerId,
      storeImg: storeImg,
      reviewScore: rating,
      reviewImg: image,
      reviewContent: content,
      hashtags: convertedHashtags, // Enum 형태로 변환된 해시태그
    };

    try {
      const response = await fetch('/review/save', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization' : 'Bearer ' + getToken(),
          'refreshToken' : getRefreshToken()
        },
        body: JSON.stringify(reviewData),
      });
      console.log("review / save API 응답 데이터 : {}" , reviewData);

      if (response.ok) {
        console.log('Review saved successfully!');
        setImage(null);
        setContent('');
        setSelectedKeywords([]);
        setRating(0);

      } else {
        // 서버 응답의 Content-Type 확인
        const contentType = response.headers.get("content-type");

        // JSON 형식 응답 처리
        if (contentType && contentType.includes("application/json")) {
          const errorMessage = await response.json(); // JSON 형식의 에러 메시지 처리
          console.error('Failed to save review:', errorMessage);
          alert(`리뷰 저장 실패: ${errorMessage.message || '오류가 발생했습니다.'}`);
        } else {
          // 텍스트 형식 응답 처리
          const errorMessage = await response.text(); // 텍스트 형식의 에러 메시지 처리
          console.error('Failed to save review:', errorMessage);
          alert(`리뷰 저장 실패: ${errorMessage}`);
        }
      }
    } catch (error) {
      console.error('Error occurred while saving review:', error);
      alert('리뷰 저장 중 오류가 발생했습니다.');
    }
  };

  return (

      <>
        <div className={styles.reviewForm}>

          <div className={styles.reviewCard}>
            <form className={styles.reviewForm} onSubmit={handleSubmit}>
              {/*가게 정보 섹션*/}
              <div className={styles.formStoreInfo}>
                <img src={storeDetails.storeImg} alt={storeDetails.storeName} className={styles.storeImage} />
                <div className={styles.storeDetails}>
                  <div className={styles.storeName}>{storeDetails.storeName}</div>
                  <div className={styles.storeVisit}>에 방문했군요!</div>
                </div>
              </div>
              {/* 별점 입력 섹션 */}
              <div className={styles.formGroup}>
                <p className={styles.title}>가게에 별점을 매겨주세요!</p>
                <Rating
                    name="store-rating"
                    size="large"
                    value={rating}
                    onChange={(event, newRating) => {
                      setRating(newRating);
                      console.log(`Selected Rating: ${newRating}`);
                    }}
                />
              </div>

              {/* 키워드 선택 섹션 */}
              <div className={styles.keywordSection}>
                <p className={styles.title}>이 가게에 어울리는 키워드를 선택해주세요!</p>
                <div className={styles.keywordContainer}>
                  {Object.keys(hashtagMapping).map((keyword) => (
                      <span
                          key={keyword}
                          className={`${styles.keyword} ${selectedKeywords.includes(keyword) ? styles.selectedKeyword : ''}`}
                          onClick={() => handleKeywordClick(keyword)}
                      >
                {keyword}
              </span>
                  ))}
                </div>
              </div>

              {/* 사진 업로드 섹션 */}
              <div className={styles.formGroup}>
                <label htmlFor="image" className={styles.title}>사진 업로드</label>
                <input
                    type="file"
                    id="image"
                    accept="image/*"
                    onChange={handleImageChange}
                    className={styles.fileInput}
                />
                {image && <img src={image} alt="미리보기" className={styles.previewImage} />}
              </div>

              {/* 리뷰 내용 입력 섹션 */}
              <div className={styles.formGroup}>
                <label htmlFor="content" className={styles.title}>리뷰 내용</label>
                <textarea
                    id="content"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    className={styles.textarea}
                    placeholder="내용을 입력하세요!"
                    required
                />
              </div>

              <button type="submit" className={styles.submitButton}>리뷰 작성</button>
            </form>
          </div>
        </div>
      </>

  );
};

export default ReviewForm;
