import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Review from '../../components/communityReivew/Review';
import styles from './CommunityPage.module.scss';

const REVIEWS_API_URL = '/review/all';

const CommunityPage = () => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await axios.get(REVIEWS_API_URL);
        console.log(response.data); // 데이터 구조 확인
        if (Array.isArray(response.data)) {
          setReviews(response.data);
        } else {
          console.error('Expected an array but received:', response.data);
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
  if (!reviews.length) return <div>No reviews found</div>; // 추가된 조건

  return (
    <div className={styles.communityPage}>
      {reviews.map((review) => {
        const name = review.customerId.split('@')[0];
        return (
          <Review
            key={review.reservationId} 
            profilePic={review.profilePic}
            name={name}
            reviewImage={review.reviewImg}
            reviewText={review.reviewContent}
            hashtags={review.hashtags}
            store={review.storeName}
            storeAddress={review.address}
          />
        );
      })}
    </div>
  );
};

export default CommunityPage;
