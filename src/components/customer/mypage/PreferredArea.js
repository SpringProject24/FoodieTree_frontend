import React from 'react';
import styles from './PreferredArea.module.scss';

const PreferredArea = ({ preferredAreas }) => {
    return (
        <div className={styles.preferredAreaForm}>
            <div className={styles.title}>
                <h3 className={styles.titleText}>
                    <span>선호 지역</span>
                </h3>
            </div>
            <div className={styles.infoWrapper}>
                <ul className={`${styles.infoList} ${styles.area}`}>
                    {/*{preferredAreas.map((area, index) => (*/}
                    {/*    <li key={index}>{area}</li>*/}
                    {/*))}*/}zz
                </ul>
            </div>
        </div>
    );
};

export default PreferredArea;