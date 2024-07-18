import React, { useState } from 'react'
import LoginForm from '../../components/auth/LoginForm'
import styles from './LoginPage.module.scss'
import {Link} from "react-router-dom";

const LoginPage = () => {
  const [userType, setUserType] = useState('customer'); //기본 상태값 customer

  // user type 상태관리
  const handleUserTypeChange = (type) => {
    setUserType(type);
  };

  const handleResendEmail = () => {
    console.log('이메일 재전송 버튼 누름 !')
  };

  return (
      <>
      <div className={styles['login-page']}>
          <div className={styles.container}>
            <div className={styles['logo']}>FoodieTree</div>
            <div className={styles['login-section']}>
              <div className={styles['user-type-buttons']}>
                <button
                    className={`${styles['user-type-button']} ${userType === 'customer' ? styles.active : ''}`}
                    onClick={() => handleUserTypeChange('customer')}
                >
                  Customer
                </button>
                <button
                    className={`${styles['user-type-button']} ${userType === 'store' ? styles.active : ''}`}
                    onClick={() => handleUserTypeChange('store')}
                >
                  Store
                </button>
              </div>
              <LoginForm userType={userType} onResendEmail={handleResendEmail}/>
            <div className={'sub-wrapper'}>
              {/*<a className={'find-email'} href="#"></a>*/}
              {/*<button className={styles['resend-login-email-btn']} onClick={}>이메일을 받지 못하셨나요? 재전송하기</button>*/}
              <Link className={styles['sub-login']} to="/sign-up">sign up 🌱</Link>
            </div>
            </div>
          </div>
      </div>
      </>
);
};


export default LoginPage;