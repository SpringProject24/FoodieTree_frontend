// SignUpForm.jsx
import React, { useState } from 'react';
import _ from 'lodash';
import styles from './SignUpForm.module.scss';
import commonStyles from '../../common.module.scss';

const SignUpForm = ({ userType, onSignUp, onResendEmail }) => {
  const [email, setEmail] = useState('');
  const [emailValid, setEmailValid] = useState(false);
  const [verificationSent, setVerificationSent] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // const BASE_URL = window.location.origin;

  const checkEmailInput = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  // 새로운 아이디 -> 중복검사 후 ok
  const checkDupId = async (email) => {
    try {
      // const response = await fetch(`${BASE_URL}/store/check?type=account&keyword=${email}`);
      // const result = await response.json();
      const result = false; // 더미 값: 이메일이 유효하다고 가정
      return !result;
    } catch (error) {
      console.error('Error:', error);
      return false;
    }
  };

  const sendVerificationLinkForSignUp = async (email) => {
    try {
      // const response = await fetch(`${restfulapi~}/email/sendVerificationLink`, {
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'application/json',
      //   },
      //   body: JSON.stringify({
      //     email,
      //     purpose: 'signup',
      //   }),
      // });
      const response = { ok: true }; // 더미 값: 요청이 성공했다고 가정
      return response.ok;
    } catch (error) {
      console.error('Error sending verification link:', error);
      return false;
    }
  };

  const handleEmailChange = (e) => {
    const email = e.target.value;
    setEmail(email);
    if (checkEmailInput(email)) {
      debouncedCheckDupId(email);
    } else {
      setEmailValid(false);
    }
  };

  const debouncedCheckDupId = _.debounce(async (email) => {
    console.log(`Checking duplication for: ${email}`);
    const isUnique = await checkDupId(email);
    setEmailValid(isUnique);
  }, 1000);

  const handleSendVerificationLink = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const result = await sendVerificationLinkForSignUp(email);
    setIsLoading(false);
    if (result) {
      setVerificationSent(true);
    } else {
      alert('잠시 후 다시 시도해주세요.');
    }
  };

  return (
    <div className={styles['sign-up-form']}>
      {/*<header>*/}
      {/*  <div className={styles.container}>*/}
      {/*    <div className={`${styles.logo} ${styles['margarine-regular']}`}>FoodieTree</div>*/}
      {/*    <div className={styles['logo-img']}>*/}
      {/*      <img src="/assets/img/img_2.png" alt="Logo" />*/}
      {/*    </div>*/}
      {/*  </div>*/}
      {/*</header>*/}
      <section className={styles['input-area']}>
        <form onSubmit={handleSendVerificationLink}>
          <div className={styles.container}>
            {verificationSent ? (
                <div className={styles['verify-link-sent']}>
                  <h2>{userType} 회원 등록을 위한 인증 링크가 이메일로 발송되었습니다.</h2>
                  <p> [ {email} ] </p>
                  <p>이메일을 확인하여 인증을 완료해주세요.</p>
                  <button className={styles['resend-login-email-btn']} onClick={onResendEmail}>
                    이메일을 받지 못하셨나요? 재전송하기
                  </button>
                </div>
            ) : (
                <div className={styles['id-wrapper']}>
                  <h2>{userType} 회원 등록을 위한 이메일을 입력해주세요!</h2>
                <input
                  type="text"
                  id="input-id"
                  value={email}
                  onChange={handleEmailChange}
                  placeholder="이메일을 입력해주세요"
                />
                <button
                  id="id-get-code-btn"
                  className={!emailValid ? styles.disable : ''}
                  disabled={!emailValid}
                >
                  인증 링크 발송
                </button>
              </div>
            )}
          </div>
        </form>
      </section>
    </div>
  );
};

export default SignUpForm;
