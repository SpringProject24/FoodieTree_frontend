import React from 'react';
import {getUserEmail, getUserRole} from "../../utils/authUtil";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCircleUser, faStore} from "@fortawesome/free-solid-svg-icons";

// 내 정보 들어가기
const MyInfo = () => {

    return (
        <>
            <div>
                안녕하세요 {getUserEmail()}님!
            </div>
            <div>
                {getUserRole() === 'store' ? (
                    <>
                        {getUserEmail()}님!
                        <FontAwesomeIcon icon={faStore} />
                    </>
                ) : getUserRole() === 'customer' ? (
                    <>
                        {getUserEmail()}님!
                        <FontAwesomeIcon icon={faCircleUser} />
                    </>
                ) : (
                    <>{getUserEmail()}님!</>
                )}
            </div>
        </>
    );
};

export default MyInfo;