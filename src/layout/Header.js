import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'; // useNavigate 훅 임포트
import { logoutAction } from '../utils/authUtil'; // 로그아웃 액션 임포트
import styles from './Header.module.scss';
import LogoutLoginBtn from "../components/header/LogoutLoginBtn";
import MyInfo from "../components/header/MyInfo"; // 헤더 스타일 임포트

const Header = () => {


    return (
        <header>
            <h1>Header</h1>
            <LogoutLoginBtn />
            <MyInfo />
        </header>
    );
}
export default Header;