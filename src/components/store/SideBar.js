import React from 'react';
import styles from './SideBar.module.scss';

const SideBar = () => {
    return (
        <div className={styles.container}>
            <ul>
                <li>
                    <a href="">마이페이지</a>
                </li>
                <li>
                    <a href="">개인정보수정</a>
                </li>
            </ul>
        </div>
    );
};

export default SideBar;