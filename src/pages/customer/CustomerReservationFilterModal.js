import React, { useState } from 'react';
import styles from './CustomerReservationFilterModal.module.scss';
import { useModal } from "../common/ModalProvider";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRotateRight } from "@fortawesome/free-solid-svg-icons";

const CustomerReservationFilterModal = ({ onApply }) => {
    const { closeModal } = useModal();
    const [category, setCategory] = useState([]);
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [status, setStatus] = useState([]);

    const handleCategoryClick = (value) => {
        setCategory((prev) =>
            prev.includes(value) ? prev.filter((item) => item !== value) : [...prev, value]
        );
    };

    const handleStatusClick = (value) => {
        setStatus((prev) =>
            prev.includes(value) ? prev.filter((item) => item !== value) : [...prev, value]
        );
    };

    const handleApply = () => {
        onApply({ category, dateRange: { startDate, endDate }, status });
        closeModal();
    };

    const handleReset = () => {
        setCategory([]);
        setStartDate('');
        setEndDate('');
        setStatus([]);
    };

    return (
        <div className={styles.modalContent}>
            <div className={styles.header}>
                <h2></h2>
            </div>
            <div className={styles.filterGroup}>
                <label>메뉴 종류(카테고리)</label>
                <div className={styles.options}>
                    {['카테고리1', '카테고리2', '카테고리3'].map((item) => (
                        <div
                            key={item}
                            className={`${styles.option} ${category.includes(item) ? styles.selected : ''}`}
                            onClick={() => handleCategoryClick(item)}
                        >
                            {item}
                        </div>
                    ))}
                </div>
            </div>
            <div className={styles.filterGroup}>
                <label>조회 기간</label>
                <div className={styles.dateRange}>
                    <input
                        type="date"
                        value={startDate}
                        onChange={(e) => setStartDate(e.target.value)}
                    />
                    <span>~</span>
                    <input
                        type="date"
                        value={endDate}
                        onChange={(e) => setEndDate(e.target.value)}
                    />
                </div>
            </div>
            <div className={styles.filterGroup}>
                <label>주문 상태</label>
                <div className={styles.options}>
                    {['예약', '취소됨', '픽업 완료'].map((item) => (
                        <div
                            key={item}
                            className={`${styles.option} ${status.includes(item) ? styles.selected : ''}`}
                            onClick={() => handleStatusClick(item)}
                        >
                            {item}
                        </div>
                    ))}
                </div>
            </div>
            <div className={styles.buttons}>
                <div className={styles.resetButton} onClick={handleReset}>
                    <FontAwesomeIcon icon={faRotateRight} className={styles.resetIcon}/>
                    <div className={styles.resetText}>초기화</div>
                </div>
                <button className={styles.applyButton} onClick={handleApply}>필터 적용하기</button>
            </div>
        </div>
    );
};

export default CustomerReservationFilterModal;