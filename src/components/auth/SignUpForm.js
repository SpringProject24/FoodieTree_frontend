// SignUpForm.jsx
import React, { useState } from 'react';
import styles from './SignUpForm.module.scss';
import commonStyles from '../../common.module.scss';
import _ from 'lodash';



const SignUpForm = ({ userType, onSignUp, onResendEmail, onVerificationSent }) => {
  const [id, setId] = useState('');
  const [emailValid, setEmailValid] = useState(false);
  const [verificationSent, setVerificationSent] = useState(false);
  const [isLoading, setIsLoading] = useState(false);


  const checkEmailInput = (id) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(id);
  };

  const checkDupId = async (id) => {
    debugger;
    try {
      const response = await fetch(`/store/check?type=account&keyword=${id}`);
      const result = await response.json();
      if (!result) {
          return true;
      } else {
          console.error('이미 가입된 아이디');
          return false;
      }
  } catch (error) {
      console.error('Error:', error);
      return false;
  }
}

  const sendVerificationLinkForSignUp = async (id) => {
    try {
      //fetch
      const response = { ok: true }; // 더미 값: 요청이 성공했다고 가정
      return response.ok;
    } catch (error) {
      console.error('Error sending verification link:', error);
      return false;
    }
  };

  const handleEmailChange = (e) => {
    const id = e.target.value;
    setId(id);
    if (checkEmailInput(id)) {
      debouncedCheckDupId(id);
    } else {
      setEmailValid(false);
    }
  };

  const debouncedCheckDupId = _.debounce(async (id) => {
    console.log(`Checking duplication for: ${id}`);
    const isUnique = await checkDupId(id);
    setEmailValid(isUnique);
  }, 1000);

  const handleSendVerificationLink = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const result = await sendVerificationLinkForSignUp(id);
    setIsLoading(false);
    if (result) {
      setVerificationSent(true);
      onVerificationSent(); // 상태를 부모 컴포넌트에 알림
    } else {
      alert('잠시 후 다시 시도해주세요.');
    }
  };

  const handleRetrySignUp = () => {
    console.log('Before resetting state:');
    console.log('verificationSent:', verificationSent);
    console.log('email:', id);
    console.log('emailValid:', emailValid);

    setVerificationSent(false);
    setId('');
    setEmailValid(false);


    console.log('After resetting state:');
    console.log('verificationSent:', verificationSent);
    console.log('email:', id);
    console.log('emailValid:', emailValid);

  };

  return (
      <div className={styles['sign-up-form']}>
        <section className={styles['input-area']}>
          <form onSubmit={handleSendVerificationLink}>
            <div className={styles.container}>
              {verificationSent ? (
                  <div className={styles['verify-link-sent']}>
                    <h2>{userType} 회원 등록을 위한 인증 링크가 이메일로 발송되었습니다.</h2>
                    <p> [ {id} ] </p>
                    <p>이메일을 확인하여 인증을 완료해주세요.</p>
                    <button className={styles['resend-signup-email-btn']} onClick={onResendEmail}>
                      이메일을 받지 못하셨나요? 재전송하기
                    </button>
                    <button className={styles['retry-sign-up']} onClick={handleRetrySignUp}>
                      다른 이메일 주소로 회원가입
                    </button>
                  </div>
              ) : (
                  <div className={styles['id-wrapper']}>
                    <h2>{userType} 회원 등록을 위한 이메일을 입력해주세요!</h2>
                    <input
                        type="text"
                        id="input-id"
                        value={id}
                        onChange={handleEmailChange}
                        placeholder="이메일을 입력해주세요"
                    />
                    <button
                        id="id-get-code-btn"
                        className={!emailValid ? styles.disable : ''}
                        disabled={!emailValid}
                    >
                      회원가입 인증메일 발송
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