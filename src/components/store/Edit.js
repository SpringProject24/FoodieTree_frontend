import React from 'react';
import styles from './Edit.module.scss'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

const Edit = () => {
    return (
        <div className={styles.edit}>
            <div>
                <div className={styles.title}>
                    <h3 className={styles.titleText}>
                        <span>
                        내 프로필
                        </span>
                    </h3>
                </div>
                <div className={styles.editWrapper}>
                    {/*<div className="input-area">*/}
                    {/*    <div className="input-wrapper">*/}
                    {/*        <div className="icon"><FontAwesomeIcon icon="fa-solid fa-user" /></div>*/}
                    {/*        <div>상호명</div>*/}
                    {/*        <div id="store-name-mypage-edit">가게이름</div>*/}
                    {/*    </div>*/}
                    {/*    <div className="input-wrapper">*/}
                    {/*        <div className="icon"><FontAwesomeIcon icon="fa-solid fa-user" /></div>*/}
                    {/*        <div>이메일</div>*/}
                    {/*        <div id="store-id-mypage-edit">이메일주소</div>*/}
                    {/*    </div>*/}
                    {/*    <div className="input-wrapper">*/}
                    {/*        <div className="icon"><FontAwesomeIcon icon="fa-regular fa-clock" /></div>*/}
                    {/*        <div>픽업 시작 시간*/}
                    {/*            <label>*/}
                    {/*                <input/>*/}
                    {/*            </label>*/}
                    {/*            <i className="time-set fa-regular fa-square-check"*/}
                    {/*               style="color: #45a049; font-size: 25px; cursor: pointer"></i>*/}
                    {/*        </div>*/}
                    {/*    </div>*/}
                    {/*    <div className="input-wrapper">*/}
                    {/*        <div className="icon"><i className="far fa-clock"></i></div>*/}
                    {/*        <div>픽업 마감 시간*/}
                    {/*            <label>*/}
                    {/*                <input/>*/}
                    {/*            </label>*/}
                    {/*            <i className="time-set fa-regular fa-square-check"*/}
                    {/*               style="color: #45a049; font-size: 25px; cursor: pointer"></i>*/}
                    {/*        </div>*/}
                    {/*    </div>*/}
                    {/*    <div id="error-message" style="color: red; display: none;">픽업 시작 시간은 픽업 마감 시간보다 늦을 수 없습니다.</div>*/}
                    {/*    <div className="input-wrapper">*/}
                    {/*        <div className="icon"><i className="fa-solid fa-user"></i></div>*/}
                    {/*        <div>기본 수량 값*/}
                    {/*            <span id="product-count-move">*/}
                    {/*                <label>*/}
                    {/*                    <input/>*/}
                    {/*                </label>*/}
                    {/*                <i className="product-cnt fa-regular fa-square-check"*/}
                    {/*                   style="color: #45a049; font-size: 25px; cursor: pointer"></i>*/}
                    {/*            </span>*/}
                    {/*        </div>*/}
                    {/*    </div>*/}
                    {/*    <div id="product-cnt-error-message" style="display: none; color: red;"></div>*/}

                    {/*    <div className="input-wrapper">*/}
                    {/*        <i className="fas fa-phone-alt icon"></i>*/}
                    {/*        <div>가게 전화번호*/}
                    {/*            <span id="store-phone-number-move">*/}
                    {/*                <label>*/}
                    {/*                    <input/>*/}
                    {/*                </label>*/}
                    {/*                <i className="business-num fa-regular fa-square-check"*/}
                    {/*                   style="color: #45a049; font-size: 25px; cursor: pointer"></i>*/}
                    {/*            </span>*/}
                    {/*        </div>*/}
                    {/*    </div>*/}
                    {/*    <div id="business-num-error-message" style="display: none; color: red;"></div>*/}
                    {/*    <div className="input-wrapper">*/}
                    {/*        <i className="fas fa-dollar-sign icon"></i>*/}
                    {/*        <div id="special-box-price-des">*/}
                    {/*            스페셜박스 가격*/}
                    {/*        </div>*/}
                    {/*        <span id="special-box-price-move">*/}
                    {/*            <select id="price">*/}
                    {/*                <option value="3900">3900</option>*/}
                    {/*                <option value="5900">5900</option>*/}
                    {/*                <option value="7900">7900</option>*/}
                    {/*            </select>*/}
                    {/*            <FontAwesomeIcon icon="fa-regular fa-square-check" />*/}
                    {/*            <i className="price-update fa-regular fa-square-check"*/}
                    {/*               style="color: #45a049; font-size: 25px; cursor: pointer"></i>*/}
                    {/*        </span>*/}
                    {/*    </div>*/}
                    {/*    <div className="input-wrapper">*/}
                    {/*        <div className="icon"><i className="fa-solid fa-key"></i></div>*/}
                    {/*        <button>비밀번호 재설정</button>*/}
                    {/*    </div>*/}
                    {/*</div>*/}
                    {/*<div id="store-mypage-image-edit" className="image-wrapper">*/}
                    {/*    <input/>*/}
                    {/*    <a href="#" id="avatar" className="before">*/}
                    {/*        <i className="fa-solid fa-pen-to-square"></i>*/}
                    {/*        <img*/}
                    {/*            src="/assets/img/defaultImage.jpg"*/}
                    {/*            alt="Customer profile image"/>*/}
                    {/*    </a>*/}
                    {/*    <button>이미지 변경*/}
                    {/*    </button>*/}
                    {/*</div>*/}
                </div>
            </div>
        </div>
    );
};

export default Edit;