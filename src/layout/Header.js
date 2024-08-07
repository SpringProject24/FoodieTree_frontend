import React from 'react';
import {getToken, getUserType} from "../config/auth";
import LogOutBtn from "../components/auth/LogOutBtn";
import {Link} from "react-router-dom";

const Header = () => {

    return (
        <header>
            { getToken() &&
                <>
                    <Link to={'/main'}><button>홈</button></Link>
                    <Link to={`/${getUserType()}`}><button>마이페이지</button></Link>
                    <LogOutBtn/>
                </>
            }

        </header>
    );
};

export default Header;