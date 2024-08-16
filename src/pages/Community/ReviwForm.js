import React, { useState } from 'react';
import styles from './ReviewForm.module.scss';

const ReviewForm = ({ onSubmit }) => {
  const [author, setAuthor] = useState('');
  const [image, setImage] = useState(null);
  const [content, setContent] = useState('');
  const [selectedKeywords, setSelectedKeywords] = useState([]);

  // 더미 데이터: 가게 이름과 가게 사진
  const [storeName] = useState('김밥천국');
  const [storeImage] = useState('https://via.placeholder.com/150');  // Placeholder 이미지 URL

  const keywords = [
    '✨ 특별한 메뉴가 있어요',
    '🌿 채식 메뉴가 있어요',
    '🍱 메뉴 구성이 알차요',
    '🪙 가성비 좋아요',
    '🥬 재료가 신선해요',
    '👍음식이 맛있어요',
    '😆 직원이 친절해요',
    '🫶 재방문 하고 싶어요',
    '🫧 매장이 청결해요',
    '🍽️ 포장 상태가 좋아요',
    '🚀 빠르게 수령했어요',
    '🤩 음식 퀄리티가 좋아요',
    '🥣 편하게 먹기 좋아요',
    '🔥 따듯하게 먹었어요',
    '🍀 의외의 발견'
  ];

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
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onSubmit) {
      onSubmit({ image, content, keywords: selectedKeywords });
    }
    setImage(null);
    setContent('');  // 제출 후에 텍스트 필드를 초기화
    setSelectedKeywords([]); // 제출 후에 선택된 키워드 초기화
  };

  return (
    <div className={styles.reviewCard}>
      <form className={styles.reviewForm} onSubmit={handleSubmit}>

        {/* <div className={styles.formGroup}>
          <label htmlFor="author" className={styles.label}>Customer ID (자동 입력되도록)</label>
          <input
            type="text"
            id="author"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            className={styles.input}
            placeholder="이름을 입력하세요"
            required
          />
        </div> */}

        <div className={styles.formStoreInfo}>
          <img src={storeImage} alt={storeName} className={styles.storeImage} />
          <div className={styles.storeDetails}>
            <div className={styles.storeName}>{storeName}</div>
            <div className={styles.storeVisit}>에 방문했군요!</div>
          </div>
        </div>

        <div className={styles.keywordSection}>
          <p className={styles.title}>이 가게에 어울리는 키워드를 선택해주세요!</p>
          <div className={styles.keywordContainer}>
            {keywords.map((keyword) => (
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
  );
};

export default ReviewForm;
