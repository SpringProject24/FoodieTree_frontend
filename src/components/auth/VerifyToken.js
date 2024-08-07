import React, { useEffect, useState } from 'react';
import { useNavigate, redirect } from 'react-router-dom';
import { EMAIL_URL } from '../../config/host-config'

function VerifyToken() {
  const navigate = useNavigate();
  const query = new URLSearchParams(window.location.search);
  const token = query.get('token');
  const refreshToken = query.get('refreshToken');
  const [email, setEmail] = useState(null);
  const [userType, setUserType] = useState(null);
  const [verificationFailed, setVerificationFailed] = useState(false);
  const [storeApprove, setStoreApprove] = useState(false);

  // 컴포넌트인데 실제 컴포넌트가 없는 경우에는 반드시
  // redirect코드가 필요
  const logoutAction = () => {
    let item = localStorage.getItem("token");
    console.log('token 을 웹에서 파싱해서 로그아웃 하기 ! ', item);
    localStorage.removeItem('token');
    navigate('/sign-in');
  };

  useEffect(() => {
    const redirectToAbsoluteURL = () => {
      const storedToken = localStorage.getItem("token");
      const storedRefreshToken = localStorage.getItem("refreshToken");

      const relativePath = `/verifyEmail?token=${storedToken}&refreshToken=${storedRefreshToken}`;
      const absoluteURL = window.location.origin + relativePath;
      window.location.href = absoluteURL;
    };

    const verifyToken = async (tokenToVerify, refreshTokenToVerify) => {
      try {
        const response = await fetch(`/email/verifyEmail`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ token: tokenToVerify, refreshToken: refreshTokenToVerify }),
        });
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        console.log('json 파싱한 데이터 :', data);
        if (data.success) {
          setEmail(data.email); // 서버에서 반환된 이메일을 설정
          setUserType(data.role); // 서버에서 반환된 userType을 설정
          setStoreApprove(data.storeApprove);
          localStorage.setItem('token', data.token); // 서버에서 반환된 토큰을 저장
          localStorage.setItem('refreshToken', data.refreshToken); // 서버에서 반환된 리프레시 토큰을 저장
        } else {
          console.log("data에서 값이 가져와지지 않아서 로컬스토리지에 토큰 저장할 수 없 어 !");
          setVerificationFailed(true);
        }
      } catch (error) {
        console.error('Error:', error);
        setVerificationFailed(true);
      }
    };

    if (token && refreshToken) {
      verifyToken(token, refreshToken);
    } else {
      const storedToken = localStorage.getItem('token');
      const storedRefreshToken = localStorage.getItem('refreshToken');
      if (storedToken || storedRefreshToken) {
        verifyToken(storedToken, storedRefreshToken);
      } else {
        redirectToAbsoluteURL();
      }
    }
  }, [token, refreshToken]);

  useEffect(() => {
    if (verificationFailed) {
      navigate('/sign-in');
    }
  }, [verificationFailed, navigate]);

  useEffect(() => {
    if (email && userType) {
      const timeoutId = setTimeout(() => {
        let redirectPath;
        if (userType === 'store') {
          redirectPath = '/store/approval'; // store approve 가 없는 경우
          if (storeApprove) redirectPath = '/store' // store approve가 있는 경우
        } else {
          redirectPath = '/main';
        }
        navigate(redirectPath);
      }, 1800); // 1초 지연

      return () => clearTimeout(timeoutId); // 클린업 함수로 타임아웃 제거
    }
  }, [email, userType, navigate]);


  return (
      <>
        <div>
          {email ? (
              <div>
                <p>Congratulations on completing your SIGN IN!</p>
                <p>Email verified successfully!</p>
                <p>Welcome, {email}!</p>
                <p>Your role is: {userType}</p>
              </div>
          ) : (
              <p>Verifying your email...</p>
          )}
        </div>
        <button onClick={logoutAction}>log out </button>
      </>
  );
}

export default VerifyToken;