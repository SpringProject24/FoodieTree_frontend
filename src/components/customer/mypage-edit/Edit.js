import React from 'react';
import styles from './Edit.module.scss'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {
    faUser,
    faClock,
    faPhone,
    faDollarSign,
    faKey,
    faPenToSquare,
    faCircleXmark
} from "@fortawesome/free-solid-svg-icons";
import {faSquareCheck} from "@fortawesome/free-regular-svg-icons";

const Edit = () => {
    return (
        <div className={styles.edit}>
            <div className={styles['edit-box']}>
                <div className={styles.title}>
                    <h3 className={styles["title-text"]}>
                        <span> 내 프로필 </span>
                    </h3>
                </div>
                <div className={styles['edit-wrapper']}>
                    <div className={styles["input-area"]}>
                        <div className={styles["input-wrapper"]}>
                            <div className={styles.icon}><FontAwesomeIcon icon={faUser}/></div>
                            <input type="text" id="nickname"/>
                            <FontAwesomeIcon icon={faSquareCheck}/>
                        </div>
                        <div className={styles["input-wrapper"]}>
                            <div className={styles.icon}><FontAwesomeIcon icon={faPhone}/></div>
                            <div>
                                <span id="store-phone-number-move">
                                    <label>
                                        <input id="customer-number-input" min="1"/>
                                    </label>
                                    <FontAwesomeIcon icon={faSquareCheck}/>
                                </span>
                            </div>
                        </div>
                        <div className={styles["input-wrapper"]}>
                            <div className={styles.icon}>
                                <FontAwesomeIcon icon={faKey}/>
                            </div>
                            <div className="icon"><i className="fa-solid fa-key"></i></div>
                            <button className="btn calendar-button" id="reset-pw-btn">비밀번호 재설정</button>
                        </div>
                    </div>
                    <div id="store-mypage-image-edit" className={styles["image-wrapper"]}>
                        <input type="file" name="profileImage" id="profileImage" accept="image/*"
                               style={{display: "none"}}/>
                        <a href="#" id="avatar" className={styles.avatar}>
                            <FontAwesomeIcon className={styles.i} icon={faPenToSquare}/>
                            <img
                                src={'/assets/img/defaultImage.jpg'}
                                alt="Customer profile image"/>
                        </a>
                        <button>이미지 변경</button>
                    </div>
                </div>
            </div>
            <div className={styles['edit-box']}>
                <div className={styles.title}>
                    <h3 className={styles["title-text"]}>
                        <span> 선호지역 </span>
                    </h3>
                </div>
                <div className={styles['edit-wrapper']}>
                    <ul className={styles.preferred} id="preferred-area">
                        <li id="area-1">
                            <span>서울시 마포구</span>
                            <FontAwesomeIcon className={styles.xmark} icon={faCircleXmark}/>
                        </li>
                    </ul>
                </div>
            </div>
            <div className={styles['edit-box']}>
                <div className={styles.title}>
                    <h3 className={styles["title-text"]}>
                        <span> 선호음식 </span>
                    </h3>
                </div>
                <div className={styles['edit-wrapper']}>
                    <ul className={styles.preferred} id="preferred-area">
                        <li id="food-1">
                            <div className={styles["img-box"]}>
                                <img src={'/assets/img/defaultImage.jpg'} alt="선호음식이미지"/>
                            </div>
                            <span>양식</span>
                            <FontAwesomeIcon className={styles.xmark} icon={faCircleXmark}/>
                        </li>
                    </ul>
                </div>
            </div>
            <div className={styles['edit-box']}>
                <div className={styles.title}>
                    <h3 className={styles["title-text"]}>
                        <span> 최애가게 </span>
                    </h3>
                </div>
                <div className={styles['edit-wrapper']}>
                    <ul className={styles.preferred} id="preferred-area">
                        <li id="store-id">
                            <div className={styles["img-box"]}>
                                <img src={'/assets/img/defaultImage.jpg'} alt="선호음식이미지"/>
                            </div>
                            <span>양식</span>
                            <FontAwesomeIcon className={styles.xmark} icon={faCircleXmark}/>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default Edit;