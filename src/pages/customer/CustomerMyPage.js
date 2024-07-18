import React from 'react';
import Profile from "../../components/customer/mypage/Profile";
import styles from "./CustomerMyPage.module.scss";

const CustomerMyPage = () => {
  return (
      <>
          <div className={styles.myPageArea}>
              <div className={styles.container}>
                  <Profile />
                  <div className={styles.content}>
                  </div>
              </div>
          </div>
      </>
  );
};

export default CustomerMyPage;