import React, { useEffect, useState } from 'react';
import Review from '../../components/communityReivew/Review';
import styles from './CommunityPage.module.scss';

const REVIEWS_API_URL = '/review/all';
const STORE_INFO_API_URL = '/review/storeInfo';

const CommunityPage = () => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [storeInfoMap, setStoreInfoMap] = useState({}); // 가게 정보를 저장할 상태

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await fetch(REVIEWS_API_URL);
        const reviewsData = await response.json();

        if (Array.isArray(reviewsData)) {
          setReviews(reviewsData);
          
          // 모든 리뷰의 reservationId를 추출
          const reservationIds = reviewsData.map(review => review.reservationId);

          // reservationId를 기반으로 가게 정보 요청
          const storeInfoPromises = reservationIds.map(async (id) => {
            const storeResponse = await fetch(`${STORE_INFO_API_URL}?reservationId=${id}`);
            const storeData = await storeResponse.json();
            return { id, storeData };
          });

          // 모든 가게 정보 요청을 병렬로 수행
          const storeInfoResults = await Promise.all(storeInfoPromises);

          // 결과를 맵 형태로 변환
          const storeInfoMap = storeInfoResults.reduce((acc, { id, storeData }) => {
            acc[id] = storeData;
            return acc;
          }, {});

          setStoreInfoMap(storeInfoMap);
        } else {
          console.error('Expected an array but received:', reviewsData);
          setReviews([]); // 빈 배열로 초기화
        }
      } catch (err) {
        console.error('Error fetching reviews:', err);
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchReviews();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error loading reviews</div>;
  if (!reviews.length) return <div>No reviews found</div>;

  return (
    <div className={styles.communityPage}>
      {reviews.map((review) => {
        const name = review.customerId.split('@')[0];
        const storeInfo = storeInfoMap[review.reservationId] || {};
        return (
          <Review
            key={review.reservationId}
            profilePic={review.profilePic}
            name={name}
            reviewImage={review.reviewImg}
            reviewText={review.reviewContent}
            store={storeInfo.storeName || review.storeName} // 가게 이름
            storeAddress={storeInfo.address || review.address} // 가게 주소
          />
        );
      })}
    </div>
  );
};

export default CommunityPage;
