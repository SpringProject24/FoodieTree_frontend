import React from 'react';
import Profile from "../../components/customer/mypage/Profile";
import styles from "./CustomerMyPage.module.scss";
import CustomerReservationList from "../../components/customer/mypage/CustomerReservationList";
import PreferredArea from "../../components/customer/mypage/PreferredArea";

const CustomerMyPage = () => {
  return (
      <>
          <div className={styles.myPageArea}>
              <div className={styles.container}>
                  <Profile />
                  <div className={styles.content}>
                      <CustomerReservationList />
                      <PreferredArea />
                  </div>
              </div>
          </div>
      </>
  );
};

export default CustomerMyPage;