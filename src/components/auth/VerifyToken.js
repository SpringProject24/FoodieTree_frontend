import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

function VerifyToken() {
  const location = useLocation();
  const navigate = useNavigate();
  const query = new URLSearchParams(location.search);
  const token = query.get('token');
  const [email, setEmail] = useState(null);
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
          if (data.success) {
            setEmail(data.email); // Assuming the server returns the email on success
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
              <p>Email verified successfully!</p>
              <p>Welcome, {email}!</p>
            </div>
        ) : (
            <p>Verifying your email...</p>
        )}
      </div>
  );
}

export default VerifyToken;