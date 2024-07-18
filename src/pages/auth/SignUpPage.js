// pages/auth/UserSignUpPage.jsx
import React, {useState} from 'react';
import SignUpForm from '../../components/auth/SignUpForm';
import styles from './SignUpPage.module.scss'
import {Link} from "react-router-dom";

const SignUpPage = () => {

  const [userType, setUserType] = useState('customer'); //기본 상태값 customer

  // user type 상태관리
  const handleUserTypeChange = (type) => {
    setUserType(type);
  };

  const handleSignUp = (email, password) => {
    // 개인 회원가입 로직 처리
    console.log('User Sign Up:', email, password);
  };

  const handleResendEmail = () => {
    console.log('이메일 재전송 버튼 누름 !')
  };

  return (
      <>
        <div className={styles['sign-up-page']}>
          <div className={styles.container}>
            <div className={styles['logo']}>FoodieTree</div>
            <div className={styles['sign-up-section']}>
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
              <SignUpForm userType={userType} onSignUp={handleSignUp} onResendEmail={handleResendEmail}/>
              <div className={'sub-wrapper'}>
                {/*<a className={'find-email'} href="#"></a>*/}
                <Link className={styles['sub-login']} to="/login">Login</Link>
              </div>
            </div>
          </div>
        </div>
      </>

  );
};

export default SignUpPage;