import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styles from './Review.module.scss'; 
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart as faHeartSolid, faHeart as faHeartRegular } from "@fortawesome/free-solid-svg-icons";

const Review = ({ profilePic, name, reviewImage, reviewText, store, storeAddress }) => {
  // 하트 상태를 관리하는 state
  const [isFavorited, setIsFavorited] = useState(false);

  // 하트 아이콘 클릭 시 호출되는 함수
  const handleFavoriteClick = () => {
    setIsFavorited(!isFavorited);
  };

  return (
    <>
    <div className={styles.review}>
      <div className={styles.reviewHeader}>
        <img src={profilePic} alt={`${name}'s profile`} className={styles.profilePic} />
        <div className={styles.reviewerInfo}>
          <h3 className={styles.reviewerName}>@{name}</h3>
        </div>
      </div>
      <img src={reviewImage} alt="Review" className={styles.reviewImage} />
      <p className={styles.reviewText}>{reviewText}</p>
    
    </div>
    <div className={styles.storeInfo}>
        <div className={styles.storeDetail}>
            <div className={styles.storeName}>{store}</div>
            <div className={styles.storeAddress}>{storeAddress}</div>
        </div>
        <FontAwesomeIcon 
          icon={isFavorited ? faHeartSolid : faHeartRegular} 
          className={styles.favoriteIcon} 
          onClick={handleFavoriteClick} 
        />
      </div>
      </>
    
  );
};

Review.propTypes = {
  profilePic: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  reviewImage: PropTypes.string.isRequired,
  reviewText: PropTypes.string.isRequired,
  store: PropTypes.string.isRequired,
  storeAddress: PropTypes.string.isRequired,
};

export default Review;
