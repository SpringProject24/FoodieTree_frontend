
import { jwtDecode } from 'jwt-decode';

/**
 * 로그아웃 기능
 * @param navigate to sign-in
 * @returns {Promise<void>}
 */
export const logoutAction = async (navigate) => {
    localStorage.removeItem('token');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('email');
    localStorage.removeItem('userType');
    // navigate를 호출하는 것도 비동기 작업으로 상태가 안정적으로 업데이트된 후 호출되도록 합니다.
    await new Promise((resolve) => setTimeout(resolve, 0));
    navigate('/');
};

/**
 * checkAuthToken method
 *
 * 위의 메서드 활용하여 리턴값{token, refreshToken, userType, email}으로 활용
 * jwtDecode(token).role : userType
 * jwtDecode(token).sub : user email
 * @type {string}
 */
export const checkAuthToken = async (navigate) => {
    const token = localStorage.getItem("token");
    const refreshToken = localStorage.getItem("refreshToken");
    if (!token) {
        alert("로그인이 필요한 서비스입니다.");
        navigate('/sign-in');
        return null;
    }
    const tokenInfo = jwtDecode(token);
    const userType = tokenInfo.role;
    const email = tokenInfo.sub;

    return {token, refreshToken, userType, email};
}

/**
 * access 토큰이 없을 경우 (로그아웃) sign-in page 리다이렉션
 * 예외 처리 : sign-up 페이지에 있을 경우 아무 동작 하지 않음
 *
 * @param navigate : customerMyPage, storeMyPage path 리다이렉션
 * @param currentPath : 다른페이지에서 location.pathname 으로 get 하여 강제 navigate
 */
//로그인 창에서 토큰이 이미 있으면
export const checkLoggedIn = (navigate, currentPath) => {
    const token = localStorage.getItem("token");

    // access token이 없을 때
    if (!token) {
        console.log("로그인이 안되어 있어요. 엑세스 토큰이 없어요 ~ ❌");
        if (currentPath === '/sign-up') {
            // 사인업 페이지에서는 로그인이 안 되어 있어도 경고를 출력하지 않습니다.
            return;
        }
        navigate('/sign-in');
        return null;
    }

    // access token이 있을 때
    try {
        const tokenInfo = jwtDecode(token);
        const userType = tokenInfo.role;
        const email = tokenInfo.sub;

        console.log("usertype : ", userType);
        console.log("로그인이 되어있어요 ~ ✅");

        if (currentPath === '/sign-up') {
            alert(`안녕하세요 ${email}님! 이미 로그인되어 있어 ${userType} 마이페이지로 이동합니다.`);
            if (userType === 'store') {
                navigate('/store');
            } else if (userType === 'customer') {
                navigate('/customer');
            }
            return;
        }

        if (userType === 'store') {
            alert(`안녕하세요 ${email}님! 이미 로그인되어 있어 ${userType} 마이페이지로 이동합니다.`);
            navigate('/store');
        } else if (userType === 'customer') {
            alert(`안녕하세요 ${email}님! 이미 로그인되어 있어 ${userType} 마이페이지로 이동합니다.`);
            navigate('/customer');
        }
    } catch (error) {
        console.error('Invalid token:', error);
        navigate('/sign-in');
    }
};