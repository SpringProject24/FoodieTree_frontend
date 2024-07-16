import React from 'react';
import Profile from '../../components/store/mypage/Profile';
import styles from './StoreMyPage.module.scss';

const storeInfo = {
    storeImg: "/assets/img/defaultImage.jpg",
    storeName: "가게 이름",
    storeId: "가게 ID",
};

const stats = {
    coTwo: "xx",
    customerCnt: "xx"
};

const reservations = [
    {
        status: "CANCELED",
        profileImage: "/assets/img/defaultImage.jpg",
        nickname: "닉네임",
        cancelReservationAtF: "날짜",
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
                aaa
                {/*<ReservationList reservations={reservations} />*/}
                {/*<ProductCount />*/}
                {/*<Calendar />*/}
            </div>
        </div>
    </div>
);

export default StoreMyPage;