// components/auth/LoginForm.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './LoginForm.module.scss';

const LoginForm = ({ userType }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const BASE_URL = window.location.origin;

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // 주석 처리된 실제 로그인 요청 코드
      /*
      const response = await fetch(`${BASE_URL}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        const result = await response.json();
        onLogin(result);
        navigate(userType === 'customer' ? '/customer' : '/store');
      } else {
        alert('로그인에 실패했습니다. 다시 시도해주세요.');
      }
      */

      // 로그인 성공을 가정하는 임시 코드
      console.log('Logging in with:', { email, password });
      navigate(userType === 'customer' ? '/customer' : '/store');
    } catch (error) {
      console.error('Login error:', error);
      alert('로그인에 실패했습니다. 다시 시도해주세요.');
    }
  };

  return (
    <div className={styles['login-form']}>
      <header>
        <div className={styles.container}>
          <div className={`${styles.logo} ${styles['margarine-regular']}`}>FoodieTree</div>
          <div className={styles['logo-img']}>
            <img src="/assets/img/img_2.png" alt="Logo" />
          </div>
        </div>
      </header>
      <section className={styles['input-area']}>
        <form onSubmit={handleSubmit}>
          <div className={styles.container}>
            <h2>{userType} 로그인</h2>
            <input
              type="text"
              id="input-id"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="이메일을 입력해주세요"
            />
            <div className={styles['auto-login']}>
              <input type="checkbox" id="auto-login" />
              <label className={styles['auto-login-check']} htmlFor="auto-login">자동 로그인</label>
            </div>
            <button id="login-btn" type="submit">
              로그인
            </button>
          </div>
        </form>
      </section>
    </div>
  );
};

export default LoginForm;