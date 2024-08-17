import React, { useEffect, useState } from 'react';
import LogoutLoginBtn from "../components/header/LogoutLoginBtn";
import MyInfo from "../components/header/MyInfo";
import {getUserRole} from "../utils/authUtil"; // 헤더 스타일 임포트

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