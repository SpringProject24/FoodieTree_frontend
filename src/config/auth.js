import { redirect } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

// 로그인한 유저의 정보 가져오기
export const getUserData = () => {
    const userDataJson = localStorage.getItem('token');
    const userData = JSON.parse(userDataJson);

    return userData;
};

export const getToken = () => {
    const token = localStorage.getItem('token');

    return token;
}

export const getRefreshToken = () => {
    const refreshToken = localStorage.getItem('refreshToken');

    return refreshToken;
}

// 로컬스토리지에서 이메일 가져오기
export const getUserEmail = () => {
    const userEmail = localStorage.getItem("email");

    return userEmail;
};

// 인증 토큰에서 role 가져오기
export const getUserRole = () => {
    const userType = localStorage.getItem("userType");

    return userType;
};


// 로그인 회원정보를 불러오는 loader
export const userDataLoader = () => {
    console.log('userDataLoader call!');
    return getUserData();
};

// 접근 권한을 확인하는 loader
export const authCheckLoader = () => {
    const userData = getUserData();

    if(!userData) {
        alert('로그인이 필요한 서비스 입니다');
        return redirect('/');
    }
    return null; // 현재페이지에 머묾...
}


// 이메일 토큰 판별
export const verifyTokenLoader = async ({ request }) => {
    const url = new URL(request.url);
    const token = url.searchParams.get('token');
    const refreshToken = url.searchParams.get('refreshToken');

    console.log('token, refreshtoken', token, refreshToken);

    if (token && refreshToken) {
        const response = await fetch(`/email/verifyEmail`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ token, refreshToken }),
        });

        // 응답 상태 코드와 메시지 로그
        console.log('Response Status:', response.status);
        console.log('Response Status Text:', response.statusText);

        if (!response.ok) {
            // 응답 본문에서 에러 메시지 로그
            const errorData = await response.json();
            console.error('Error Response Data:', errorData);
            throw new Error('Token verification failed');
        }

        const data = await response.json();
        console.log('Response Data:', data);

        if (data.success) {
            localStorage.setItem('token', data.token);
            localStorage.setItem('refreshToken', data.refreshToken);
            return { email: data.email, userType: data.role };
        }
    }

    throw new Error('Token is missing or invalid');
};