import { useNavigate } from 'react-router-dom';
import {EMAIL_URL} from "../config/host-config";

export const checkAuthToken = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
        return false;
    }

    try {
        const response = await fetch(`${EMAIL_URL}/verifyEmail`, {
            headers: { 'Authorization': 'Bearer ' + token },
            method: 'POST',
        });

        if (response.ok) {
            const data = await response.json();
            return data.isValid; // 서버에서 토큰 검증 결과를 반환하는 방식에 따라 조정
        } else {
            return false;
        }
    } catch (error) {
        console.error("Error verifying token:", error);
        return false;
    }
};

export const handleInvalidToken = (navigate) => {
    alert("로그인이 필요한 서비스입니다.");
    navigate('/sign-in');
};