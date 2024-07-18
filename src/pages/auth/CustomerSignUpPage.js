// pages/auth/UserSignUpPage.jsx
import React from 'react';
import SignUpForm from '../../components/auth/SignUpForm';

const CustomerSignUpPage = () => {
  const handleSignUp = (email, password) => {
    // 개인 회원가입 로직 처리
    console.log('User Sign Up:', email, password);
  };

  return <SignUpForm userType="customer" onSignUp={handleSignUp} />;
};

export default CustomerSignUpPage;