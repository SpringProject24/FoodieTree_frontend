import React, {useState} from 'react';
import styles from './ProductDetailModal.module.scss'; // SCSS 모듈을 import
import modalStyle from '../common/Modal.module.scss'; // SCSS 모듈을 import
import likeStyle from '../common/LikeBtn.module.scss'; // SCSS 모듈을 import

// 초기 세팅은 닫힌 상태
const ProductDetailModal = ({closeModal}) => {

    return (
        <div className={`${modalStyle.modal} fade`} id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className={`modal-dialog modal-dialog-scrollable`}>
                <div className={modalStyle[`modal-content`]}>
                    <div className={styles[`modal-header`]}>
                        <div className={styles.wrapper}>
                            {/* Heart animation */}
                            <div className={likeStyle[`heart-container`]} title="Like">
                                <input type="checkbox" className={likeStyle.checkbox} id="Give-It-An-Id" />
                                <div className={likeStyle['svg-container']}>
                                    <svg viewBox="0 0 24 24" className={likeStyle['svg-outline']} xmlns="http://www.w3.org/2000/svg">
                                        <path
                                            d="M17.5,1.917a6.4,6.4,0,0,0-5.5,3.3,6.4,6.4,0,0,0-5.5-3.3A6.8,6.8,0,0,0,0,8.967c0,4.547,4.786,9.513,8.8,12.88a4.974,4.974,0,0,0,6.4,0C19.214,18.48,24,13.514,24,8.967A6.8,6.8,0,0,0,17.5,1.917Zm-3.585,18.4a2.973,2.973,0,0,1-3.83,0C4.947,16.006,2,11.87,2,8.967a4.8,4.8,0,0,1,4.5-5.05A4.8,4.8,0,0,1,11,8.967a1,1,0,0,0,2,0,4.8,4.8,0,0,1,4.5-5.05A4.8,4.8,0,0,1,22,8.967C22,11.87,19.053,16.006,13.915,20.313Z"
                                        />
                                    </svg>
                                    <svg viewBox="0 0 24 24" className={likeStyle['svg-filled']} xmlns="http://www.w3.org/2000/svg">
                                        <path
                                            d="M17.5,1.917a6.4,6.4,0,0,0-5.5,3.3,6.4,6.4,0,0,0-5.5-3.3A6.8,6.8,0,0,0,0,8.967c0,4.547,4.786,9.513,8.8,12.88a4.974,4.974,0,0,0,6.4,0C19.214,18.48,24,13.514,24,8.967A6.8,6.8,0,0,0,17.5,1.917Z"
                                        />
                                    </svg>
                                    <svg className={likeStyle['svg-celebrate']} width="100" height="100" xmlns="http://www.w3.org/2000/svg">
                                        <polygon points="10,10 20,20" />
                                        <polygon points="10,50 20,50" />
                                        <polygon points="20,80 30,70" />
                                        <polygon points="90,10 80,20" />
                                        <polygon points="90,50 80,50" />
                                        <polygon points="80,80 70,70" />
                                    </svg>
                                </div>
                            </div>
                            {/* Heart animation end */}
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close">
                                <i className="fa-solid fa-xmark"></i>
                            </button>
                        </div>
                        <div className={`${styles.wrapper} ${styles.info}`}>
                            <div id="product-cnt">1개 남음</div>
                            <div className={styles['store-info']}>
                                <div className={styles['img-box']}>
                                    <img id="store-img" alt="" />
                                    {/* 가게 사진 */}
                                </div>
                                <h6 id="store-name">가게이름</h6>
                            </div>
                        </div>
                    </div>
                    <div className={styles['modal-body']}>
                        <div className={styles.detail}>
                            <div className={styles['prod-info-wrapper']}>
                                <div className={styles['prod-info']}>
                                    <div id="prod-category">
                                        <i className="fa-solid fa-basket-shopping" />
                                        <span>음식종류</span>
                                    </div>
                                    <div className={styles['prod-rate']}>
                                        <i className="fa-solid fa-star" />
                                        <span>평점</span>
                                    </div>
                                    <div className={styles['prod-time']}>
                                        <i className="fa-solid fa-clock" />
                                        <span>픽업시간</span>
                                    </div>
                                </div>
                                <div className={styles['prod-info']}>
                                    <div className={styles['prod-price']}>
                                        <span>가격</span>
                                    </div>
                                    <div className={styles['prod-discount']}>
                                        <span>할인 가격</span>
                                    </div>
                                </div>
                            </div>
                            <div className={styles.wrapper}>
                                <div className={styles['desc-area']}>
                                    <svg viewBox="0 0 24 24">
                                        <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zM6 10.8v2.4h12v-2.4H6zm0 6v2.4h8.4v-2.4H6z"/>
                                    </svg>
                                    <p>설명</p>
                                </div>
                                <div className={styles['rate-area']}>
                                    <p>평가</p>
                                    <div>
                                        <i className="fa-solid fa-star" />
                                        <i className="fa-solid fa-star" />
                                        <i className="fa-solid fa-star" />
                                        <i className="fa-solid fa-star" />
                                        <i className="fa-solid fa-star" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={styles['modal-footer']}>
                        <button type="button" className={`btn btn-primary ${styles['reservation-btn']}`}>예약하기</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ProductDetailModal;
