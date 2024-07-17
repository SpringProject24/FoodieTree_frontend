import React from 'react';
import Profile from '../../components/store/mypage/Profile';
import styles from './StoreMyPage.module.scss';
import ReservationList from "../../components/store/mypage/ReservationList";

// 더미데이터
const storeInfo = {
    storeImg: "/assets/img/defaultImage.jpg",
    storeName: "그곳",
    storeId: "ggot@gmail.com",
};
const stats = {
    coTwo: "xx",
    customerCnt: "xx"
};
const reservations = [
    {
        status: "CANCELED",
        profileImage: "/assets/img/defaultImage.jpg",
        nickname: "김",
        cancelReservationAtF: "12월 12일 12시 12분",
        pickupTimeF: "",
        pickedUpAtF: "",
    },
    // 다른 예약 상태들 추가
];

const StoreMyPage = () => (
    <div className={styles.myPageArea}>
        <div className={styles.container}>
            <Profile storeInfo={storeInfo} stats={stats} />
            <div className={styles.content}>
                <ReservationList reservations={reservations} />
                {/*<ProductCount />*/}
                {/*<Calendar />*/}
            </div>
        </div>
    </div>
);

export default StoreMyPage;