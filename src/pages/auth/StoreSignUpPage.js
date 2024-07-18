// pages/auth/StoreSignUpPage.jsx
import React from 'react';
import SignUpForm from '../../components/auth/SignUpForm';

const StoreSignUpPage = () => {
  const handleSignUp = (email, password) => {
    // 상점 회원가입 로직 처리
    console.log('Store Sign Up:', email, password);
    
  };

  return <SignUpForm userType="store" onSignUp={handleSignUp} />;

};

export default StoreSignUpPage;