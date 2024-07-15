import React from 'react';
import styles from './SideBar.module.scss';
import {Link} from "react-router-dom";

const SideBar = () => {
    return (
        <>
            <div className={styles.profile}>
                <ul className={styles.nav}>
                    <li>
                        <Link className={styles.navLink} href="#" to={'/store'}>마이페이지</Link>
                    </li>
                    <li>
                        <a className={styles.navLink} href="#">개인정보수정</a>
                    </li>
                </ul>
                <div className={styles.stats}>
                    <div id="carbon" >
                        <img src="/assets/img/mypage-carbon.png" alt="leaf"/>
                        <div>kg의 이산화탄소 배출을 줄였습니다</div>
                    </div>
                    <div id="community" >
                        <img src="/assets/img/mypage-community.png" alt="community"/>
                        <div>지금까지 명의 손님을 만났어요</div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default SideBar;