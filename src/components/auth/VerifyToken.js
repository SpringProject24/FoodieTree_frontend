import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function VerifyToken() {
  const navigate = useNavigate();
  const query = new URLSearchParams(window.location.search);
  const token = query.get('token');
  const [email, setEmail] = useState(null);
  const [userType, setUserType] = useState(null);
  const [verificationFailed, setVerificationFailed] = useState(false);

  useEffect(() => {
    const redirectToAbsoluteURL = () => {
      const relativePath = `/verifyEmail?token=${token}`;
      const absoluteURL = window.location.origin + relativePath;
      window.location.href = absoluteURL;
    };

    const verifyToken = async () => {
      if (token) {
        console.log('token : ', token);
        try {
          const response = await fetch('/email/verifyEmail', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ token }),
          });

          if (!response.ok) {
            throw new Error('Network response was not ok');
          }

          const data = await response.json();
          console.log("json 파싱한 데이터 :", data);
          if (data.success) {
            setEmail(data.email); // 서버에서 반환된 이메일을 설정
            setUserType(data.role); // 서버에서 반환된 userType을 설정
          } else {
            setVerificationFailed(true);
          }
        } catch (error) {
          console.error('Error:', error);
          setVerificationFailed(true);
        }
      } else {
        redirectToAbsoluteURL();
      }
    };

    verifyToken();
  }, [token]);

  useEffect(() => {
    if (verificationFailed) {
      navigate('/sign-in');
    }
  }, [verificationFailed, navigate]);

  return (
      <div>
        {email ? (
            <div>
              <p>Congratulations on completing your registration!</p>
              <p>Email verified successfully!</p>
              <p>Welcome, {email}!</p>
              <p>Your role is: {userType}</p>
            </div>
        ) : (
            <p>Verifying your email...</p>
        )}
      </div>
  );
}

export default VerifyToken;