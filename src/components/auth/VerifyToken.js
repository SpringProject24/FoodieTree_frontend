import React, { useEffect, useState } from 'react';
import { useNavigate, redirect } from 'react-router-dom';
import { EMAIL_URL } from '../../config/host-config'

function VerifyToken() {
  const navigate = useNavigate();
  const query = new URLSearchParams(window.location.search);
  const token = query.get('token');
  const [email, setEmail] = useState(null);
  const [userType, setUserType] = useState(null);
  const [verificationFailed, setVerificationFailed] = useState(false);

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
      const relativePath = `/verifyEmail?token=${token}`;
      const absoluteURL = window.location.origin + relativePath;
      window.location.href = absoluteURL;
    };

    const verifyToken = async (tokenToVerify) => {
      try {
        const response = await fetch(`/email/verifyEmail`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            // verify에서는 token 검증이 아예 안되고, 다른 페이지에서 토큰이 있으면 verifyEmail로 보내는로직을 사용해야 할듯
            // 토큰이 없어도 확인할 수 있어야 한다. 로그아웃하면 토큰이 브라우저에서 삭제됨.
          },
          body: JSON.stringify({ token: tokenToVerify }),
        });
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        console.log('json 파싱한 데이터 :', data);
        if (data.success) {
          setEmail(data.email); // 서버에서 반환된 이메일을 설정
          setUserType(data.role); // 서버에서 반환된 userType을 설정
          localStorage.setItem('token', tokenToVerify); // 성공 시 토큰을 localStorage에 저장
        } else {
          console.log("data에서 값이 가져와지지 않아서 로컬스토리지에 토큰 저장할 수 없 어 ! ");
          setVerificationFailed(true);
        }
      } catch (error) {
        console.error('Error:', error);
        setVerificationFailed(true);
      }
    };

    if (token) {
      verifyToken(token);
    } else {
      const storedToken = localStorage.getItem('token');
      if (storedToken) {
        verifyToken(storedToken);
      } else {
        redirectToAbsoluteURL();
      }
    }
  }, [token]);

  useEffect(() => {
    if (verificationFailed) {
      navigate('/sign-in');
    }
  }, [verificationFailed, navigate]);

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