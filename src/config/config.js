
// let config = {};
//
// export const loadConfig = async () => {
//     const response = await fetch('/api/config/kakao-api-key');
//     const kakaoApiKey = await response.text();
//     config = {
//         kakaoApiKey: kakaoApiKey,
//         API_BASE_URL: process.env.REACT_APP_API_BASE_URL,
//         EVENT_URL: `${process.env.REACT_APP_API_BASE_URL}/events`,
//         AUTH_URL: `${process.env.REACT_APP_API_BASE_URL}/auth`,
//     };
// };
//
// export const getConfig = () => config;

// src/config.js
const config = {
    kakaoApiKey: '111f5d20a55ae130963ee1e375b342cb', // 여기에 Kakao API 키를 직접 입력하세요.
    API_BASE_URL: 'http://localhost:8083',
    EVENT_URL: 'http://localhost:8083/events',
    AUTH_URL: 'http://localhost:8083/auth',
};

export default config;