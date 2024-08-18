import React from 'react';
import styles from './CommunityMainPage.module.scss';
import { extractArea } from "../../utils/authUtil";

const defaultReviews = [
    {
        profilePic: 'https://via.placeholder.com/50',
        name: 'customerId',
        reviewImage: 'https://via.placeholder.com/300',
        reviewText: '처음 마셔보는 차를 설명과 함께 마셔서 좋은 경험이었어요 홍시랑 먹는 산딸기막국수도 새롭고 맛있었어요 또 오고싶은 곳입니다Highly recommend it.',
        store: 'Sunny Cafe',
        storeAddress: '123 Green Street, Newtown',
        storeImage: '/mnt/data/C37C4DC6-F223-46FB-B43D-B7B25EE26AF7.png',  // Assuming this is the store image you uploaded
        favorites: true,
    },
    {
        profilePic: 'https://via.placeholder.com/50',
        name: 'Jane customerId',
        reviewImage: 'https://via.placeholder.com/300',
        reviewText: 'Not bad, but could be improved.',
        store: 'Cafe Delight',
        storeAddress: '456 Blue Avenue, Uptown',
        storeImage: '/your/path/to/anotherStoreImage.png',  // Replace with correct path
        favorites: false,
    },
    // 추가적인 더미 리뷰 데이터
];

const CommunityMainPage = ({ treesPlanted, topGroups, stores, users, reviews = defaultReviews, latestReviews }) => {

    let userArea = extractArea();

    return (
        <div className={styles.container}>
            {/* Header Section */}
            <header className={styles.header}>
                <h1>우리의 리뷰가 <strong>나무가 되어</strong> 지구를 살려요!</h1>
            </header>

            {/* Tree Planting Section */}
            <section className={styles.treePlanting}>
                <h2>🌳 {userArea}에서 심어진 나무</h2>
                <div className={styles.treeInfo}>
                    {/*<img src="/path/to/map-image.jpg" alt="Mapo Trees Planted" className={styles.mapImage} />*/}
                    <div className={styles.treeStats}>
                        <div className={styles.statItem}>
                            <span className={styles.statNumber}>{treesPlanted}</span>
                            <span className={styles.statLabel}>그루</span>
                        </div>
                        <div className={styles.statItem}>
                            <span className={styles.statNumber}>{stores}</span>
                            <span className={styles.statLabel}>STORES</span>
                        </div>
                        <div className={styles.statItem}>
                            <span className={styles.statNumber}>{users}</span>
                            <span className={styles.statLabel}>USERS</span>
                        </div>
                        <div className={styles.statItem}>
                            <span className={styles.statNumber}>{reviews.length}</span>
                            <span className={styles.statLabel}>REVIEWS</span>
                        </div>
                    </div>
                </div>
            </section>

            {/* Latest Reviews Section */}
            <section className={styles.latestReviews}>
                <h3>요즘 뜨는 {userArea} 최신 리뷰</h3>
                <div className={styles.reviewGrid}>
                    {reviews && reviews.map((review, index) => (
                        <div key={index} className={styles.reviewItem}>
                            <img src={review.storeImage} alt={review.store} className={styles.storeImage} />
                            <div className={styles.overlay}>
                                <p className={styles.storeName}>#{review.store}</p>
                            </div>
                        </div>
                    ))}
                </div>
                <button className={styles.viewMoreButton}>{userArea} 최신리뷰 보러가기!</button>
            </section>

            {/* Review Writing Section */}
            <section className={styles.writeReview}>
                <h3>작성해야 할 리뷰</h3>
                <div className={styles.reviewBox}>
                    <p>여기에 작성해야 할 리뷰 정보를 표시하세요</p>
                    <button className={styles.writeReviewButton}>리뷰 참여하기</button>
                </div>
            </section>
        </div>
    );
};

export default CommunityMainPage;