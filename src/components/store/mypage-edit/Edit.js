import React from 'react';
import styles from './Edit.module.scss'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faUser, faClock, faPhone, faDollarSign, faKey, faPenToSquare} from "@fortawesome/free-solid-svg-icons";
import {faSquareCheck} from "@fortawesome/free-regular-svg-icons";
import ProfileImgBtn from "./ProfileImgBtn";

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
                            <div>상호명</div>
                            <div id="store-name-mypage-edit">가게이름</div>
                        </div>
                        <div className={styles["input-wrapper"]}>
                            <div className={styles.icon}><FontAwesomeIcon icon={faUser}/></div>
                            <div>이메일</div>
                            <div id="store-id-mypage-edit">이메일주소</div>
                        </div>
                        <div className={styles["input-wrapper"]}>
                            <div className={styles.icon}><FontAwesomeIcon icon={faClock}/></div>
                            <div>픽업 시작 시간
                                <label>
                                    <input/>
                                </label>
                                <FontAwesomeIcon icon={faSquareCheck}/>
                            </div>
                        </div>
                        <div id="error-message" style={{color: "red", display: "none"}}>픽업 시작 시간은 픽업 마감
                            시간보다 늦을 수 없습니다.
                        </div>
                        <div className={styles["input-wrapper"]}>
                            <div className={styles.icon}><FontAwesomeIcon icon={faClock}/></div>
                            <div>픽업 마감 시간
                                <label>
                                    <input/>
                                </label>
                                <FontAwesomeIcon icon={faSquareCheck}/>
                            </div>
                        </div>
                        <div className={styles["input-wrapper"]}>
                            <div className={styles.icon}><FontAwesomeIcon icon={faUser}/></div>
                            <div className="icon"><i className="fa-solid fa-user"></i></div>
                            <div>기본 수량 값
                                <span id="product-count-move">
                                    <label>
                                        <input type={"number"} min={1}/>
                                    </label>
                                    <FontAwesomeIcon icon={faSquareCheck}/>
                                </span>
                            </div>
                        </div>
                        <div id="product-cnt-error-message"
                             style={{display: 'none', color: 'red'}}></div>
                        <div className={styles["input-wrapper"]}>
                            <div className={styles.icon}><FontAwesomeIcon icon={faPhone}/></div>
                            <div>가게 전화번호
                                <span id="store-phone-number-move">
                                    <label>
                                        <input id="business-number-input" min="1"/>
                                    </label>
                                    <FontAwesomeIcon icon={faSquareCheck}/>
                                </span>
                            </div>
                        </div>
                        <div id="business-num-error-message"
                             style={{display: 'none', color: 'red'}}></div>
                        <div className={styles["input-wrapper"]}>
                            <div className={styles.icon}>
                                <FontAwesomeIcon icon={faDollarSign}/>
                            </div>
                            <div id="special-box-price-des">
                                스페셜박스 가격
                            </div>
                            <span id="special-box-price-move">
                                <select id="price">
                                    <option value="3900">3900</option>
                                    <option value="5900">5900</option>
                                    <option value="7900">7900</option>
                                </select>
                                <FontAwesomeIcon icon={faSquareCheck}/>
                            </span>
                        </div>
                        <div className={styles["input-wrapper"]}>
                            <div className={styles.icon}>
                                <FontAwesomeIcon icon={faKey}/>
                            </div>
                            <div className="icon"><i className="fa-solid fa-key"></i></div>
                            <button className="btn calendar-button" id="reset-pw-btn">비밀번호 재설정</button>
                        </div>
                    </div>
                    <ProfileImgBtn />
                </div>
            </div>
        </div>
    );
};

export default Edit;