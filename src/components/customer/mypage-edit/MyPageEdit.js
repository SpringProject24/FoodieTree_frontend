import React from 'react';
import styles from './MyPageEdit.module.scss';
import SideBar from "./SideBar";
import Edit from "./Edit";

const MyPageEdit = () => {
    return (
        <section>
            <div className={styles.container}>
                <SideBar />
                <Edit />
            </div>
        </section>
    );
};

export default MyPageEdit;