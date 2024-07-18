import React, { useState, useEffect } from 'react';
import _ from 'lodash';

const StoreSignUpForm = () => {
  const [email, setEmail] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const [password, setPassword] = useState('');
  const [passwordChk, setPasswordChk] = useState('');
  const [emailValid, setEmailValid] = useState(false);
  const [verificationSent, setVerificationSent] = useState(false);
  const [verificationValid, setVerificationValid] = useState(false);
  const [countdown, setCountdown] = useState(300);
  const [isLoading, setIsLoading] = useState(false);

  const BASE_URL = window.location.origin;

  useEffect(() => {
    if (countdown > 0 && verificationSent) {
      const timer = setInterval(() => {
        setCountdown(countdown - 1);
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [countdown, verificationSent]);

  const checkIdInput = (email) => {
    // 간단한 이메일 유효성 검사
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const checkDupId = async (email) => {
    try {
      const response = await fetch(`${BASE_URL}/store/check?type=account&keyword=${email}`);
      const result = await response.json();
      return !result;
    } catch (error) {
      console.error('Error:', error);
      return false;
    }
  };

  const sendVerificationCodeForSignUp = async (email) => {
    try {
      const response = await fetch(`${BASE_URL}/email/sendVerificationCode`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          purpose: 'signup',
        }),
      });
      return response.ok;
    } catch (error) {
      console.error('Error sending verification code:', error);
      return false;
    }
  };

  const sendVerifyCode = async (email, code) => {
    try {
      const response = await fetch(`${BASE_URL}/email/verifyCode?purpose=signup`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, code }),
      });

      if (response.ok) {
        stopCountdown();
        return { ok: true, result: await response.text() };
      } else {
        console.error('Verification failed');
        return { ok: false, result: '실패' };
      }
    } catch (error) {
      console.error('Error verifying code:', error);
      return { ok: false, result: '실패' };
    }
  };

  const handleEmailChange = _.debounce(async (e) => {
    const email = e.target.value;
    setEmail(email);
    if (!checkIdInput(email)) {
      setEmailValid(false);
      return;
    }
    const isUnique = await checkDupId(email);
    setEmailValid(isUnique);
  }, 1000);

  const handleSendVerificationCode = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const result = await sendVerificationCodeForSignUp(email);
    setIsLoading(false);
    if (result) {
      setVerificationSent(true);
    } else {
      alert('잠시 후 다시 시도해주세요.');
    }
  };

  const handleVerificationCodeChange = (e) => {
    setVerificationCode(e.target.value);
  };

  const handleVerifyCode = async (e) => {
    e.preventDefault();
    const result = await sendVerifyCode(email, verificationCode);
    if (result.ok) {
      setVerificationValid(true);
    } else {
      alert('인증번호를 확인해주세요.');
    }
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handlePasswordChkChange = (e) => {
    setPasswordChk(e.target.value);
  };

  const handlePrevStep = (e) => {
    e.preventDefault();
    setVerificationValid(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password !== passwordChk) {
      alert('비밀번호가 일치하지 않습니다.');
      return;
    }
    // Form submission logic here
  };

  return (
    <div className="sign-up-form">
      <header>
        <div className="container">
          <div className="logo margarine-regular">FoodieTree</div>
          <div className="logo-img">
            <img src="/assets/img/img_2.png" alt="Logo" />
          </div>
        </div>
      </header>
      <section className="input-area">
        <form onSubmit={handleSubmit}>
          <div className="container">
            {!verificationValid ? (
              <div className="id-wrapper">
                <h2>회원 등록을 위한 이메일을 입력해주세요!</h2>
                <input
                  type="text"
                  id="input-id"
                  value={email}
                  onChange={handleEmailChange}
                  placeholder="이메일을 입력해주세요"
                />
                <button
                  id="id-get-code-btn"
                  className={!emailValid ? 'disable' : ''}
                  disabled={!emailValid}
                  onClick={handleSendVerificationCode}
                >
                  인증코드 받기
                </button>
                {verificationSent && (
                  <div className="id-verify-wrapper">
                    <h2>해당 이메일로 인증코드가 전송되었습니다</h2>
                    <h3>인증코드를 입력해주세요!</h3>
                    <input
                      type="text"
                      id="id-verify-code"
                      value={verificationCode}
                      onChange={handleVerificationCodeChange}
                      placeholder="인증코드를 입력해주세요"
                    />
                    <span id="countdown">남은 시간: {countdown}초</span>
                    <button id="id-verify-btn" onClick={handleVerifyCode}>
                      이메일 인증번호 확인
                    </button>
                    <button id="id-btn" style={{ display: 'none' }}>
                      계속
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="pass-wrapper">
                <div className="pass">
                  <h2>계속해서 비밀번호를 입력해주세요!</h2>
                  <input
                    id="input-pw"
                    type="password"
                    value={password}
                    onChange={handlePasswordChange}
                    placeholder="비밀번호를 입력해주세요"
                  />
                </div>
                <div className="pass-check">
                  <input
                    id="input-pw-chk"
                    type="password"
                    value={passwordChk}
                    onChange={handlePasswordChkChange}
                    placeholder="비밀번호를 확인해주세요"
                  />
                  <div className="wrapper">
                    <button id="prev-btn" onClick={handlePrevStep}>
                      이전
                    </button>
                    <button
                      id="pass-btn"
                      className={password && password === passwordChk ? '' : 'disable'}
                      disabled={!password || password !== passwordChk}
                      onClick={handleSubmit}
                    >
                      계속
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </form>
      </section>
    </div>
  );
};

export default StoreSignUpForm;