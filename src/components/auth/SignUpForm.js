import React, { useState, useEffect } from 'react';
import './SignUpForm.module.scss';

const SignUpForm = () => {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const [password, setPassword] = useState('');
  const [passwordChk, setPasswordChk] = useState('');
  const [selectedFoods, setSelectedFoods] = useState([]);
  const [map, setMap] = useState(null);

  useEffect(() => {
    if (step === 4) {
      const script = document.createElement('script');
      script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.REACT_APP_KAKAO_API_KEY}`;
      script.async = true;
      script.onload = () => {
        const container = document.getElementById('map');
        const options = {
          center: new window.kakao.maps.LatLng(33.450701, 126.570667),
          level: 3
        };
        const map = new window.kakao.maps.Map(container, options);
        setMap(map);
      };
      document.head.appendChild(script);
    }
  }, [step]);

  const handleEmailChange = (e) => setEmail(e.target.value);
  const handleVerificationCodeChange = (e) => setVerificationCode(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);
  const handlePasswordChkChange = (e) => setPasswordChk(e.target.value);

  const handleFoodSelection = (food) => {
    setSelectedFoods(prev => {
      if (prev.includes(food)) {
        return prev.filter(item => item !== food);
      } else if (prev.length < 3) {
        return [...prev, food];
      }
      return prev;
    });
  };

  const handleNextStep = () => {
    if (step === 3 && selectedFoods.length === 0) {
      alert('선호하는 음식을 1개 이상 선택해주세요.');
      return;
    }
    if (step === 3 && selectedFoods.length > 3) {
      alert('선호하는 음식은 최대 3개까지 선택 가능합니다.');
      return;
    }
    setStep(step + 1);
  };

  const handlePrevStep = () => setStep(step - 1);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Submit form logic here
  };

  return (
    <div className="sign-up-form">
      {step === 1 && (
        <div className="id-wrapper">
          <h2>회원 등록을 위한 이메일을 입력해주세요!</h2>
          <input type="text" value={email} onChange={handleEmailChange} placeholder="이메일을 입력해주세요" />
          <button onClick={handleNextStep} disabled={!email}>인증코드 받기</button>
        </div>
      )}
      {step === 2 && (
        <div className="id-verify-wrapper">
          <h2>해당 이메일로 인증코드가 전송되었습니다</h2>
          <h3>인증코드를 입력해주세요!</h3>
          <input type="text" value={verificationCode} onChange={handleVerificationCodeChange} placeholder="인증코드를 입력해주세요" />
          <button onClick={handleNextStep} disabled={!verificationCode}>이메일 인증번호 확인</button>
          <button onClick={handlePrevStep}>이전</button>
        </div>
      )}
      {step === 3 && (
        <div className="pass-wrapper">
          <h2>계속해서 비밀번호를 입력해주세요!</h2>
          <input type="password" value={password} onChange={handlePasswordChange} placeholder="비밀번호를 입력해주세요" />
          <input type="password" value={passwordChk} onChange={handlePasswordChkChange} placeholder="비밀번호를 확인해주세요" />
          <button onClick={handlePrevStep}>이전</button>
          <button onClick={handleNextStep} disabled={!password || password !== passwordChk}>계속</button>
        </div>
      )}
      {step === 4 && (
        <div className="food-wrapper">
          <h2>선호하는 음식을 선택해주세요!</h2>
          <p>(최대 3 종류)</p>
          <div className="foods">
            {['한식', '중식', '일식', '양식', '디저트', '카페', '기타'].map((food) => (
              <div key={food} className={`food-item ${selectedFoods.includes(food) ? 'checked' : ''}`}>
                <input
                  type="checkbox"
                  value={food}
                  checked={selectedFoods.includes(food)}
                  onChange={() => handleFoodSelection(food)}
                />
                <label>
                  <span>{food}</span>
                  <img src={`/assets/img/${food.toLowerCase()}.jpg`} alt={food} />
                </label>
              </div>
            ))}
          </div>
          <button onClick={handlePrevStep}>이전</button>
          <button onClick={handleNextStep}>계속</button>
        </div>
      )}
      {step === 5 && (
        <div className="location-wrapper">
          <h2>선호하는 지역을 선택해주세요!</h2>
          <p>(최대 3 곳)</p>
          <div id="map"></div>
          <button onClick={handlePrevStep}>이전</button>
          <button onClick={handleSubmit}>완료</button>
        </div>
      )}
    </div>
  );
};

export default SignUpForm;