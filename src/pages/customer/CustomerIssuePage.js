import React, {useEffect, useState} from 'react';
import IssueImage from "../../components/customer/issue/IssueImage";
import IssueContent from "../../components/customer/issue/IssueContent";
import styles from './CustomerIssuePage.module.scss';
import {useLocation} from "react-router-dom";
const CustomerIssuePage = () => {

    const [isMobileView, setIsMobileView] = useState(window.innerWidth <= 400);

    const location = useLocation();
    const reservationDetail = location.state?.reservationDetail;

    // 이제 reservationDetail을 사용할 수 있습니다.
    console.log('Received Reservation Detail:', reservationDetail);


    useEffect(() => {
        const handleResize = () => {
            setIsMobileView(window.innerWidth <= 400);
        };

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return (
        <div className={styles.customerIssuePage}>
            {!isMobileView && <IssueImage/>}
            <IssueContent reservationDetail={reservationDetail}/>
        </div>
    );
};

export default CustomerIssuePage;