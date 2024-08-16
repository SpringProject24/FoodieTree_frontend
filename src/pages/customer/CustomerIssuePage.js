import React, {useEffect, useState} from 'react';
import IssueImage from "../../components/customer/issue/IssueImage";
import IssueContent from "../../components/customer/issue/IssueContent";
import styles from './CustomerIssuePage.module.scss';
const CustomerIssuePage = () => {

    const [isMobileView, setIsMobileView] = useState(window.innerWidth <= 400);

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
            <IssueContent/>
        </div>
    );
};

export default CustomerIssuePage;