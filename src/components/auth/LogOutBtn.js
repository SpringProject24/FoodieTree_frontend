import React from 'react';
import {useNavigate} from "react-router-dom";

const LogOutBtn = () => {
    const navigate = useNavigate();

    const logoutAction = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('refreshToken');
        navigate('/sign-in');
    };

    return (
        <button onClick={logoutAction}>
            로그아웃
        </button>
    );
};

export default LogOutBtn;