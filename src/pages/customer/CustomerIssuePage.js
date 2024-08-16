import React from 'react';
import IssueImage from "../../components/customer/issue/IssueImage";
import IssueContent from "../../components/customer/issue/IssueContent";
import styles from './CustomerIssuePage.module.scss';
const CustomerIssuePage = () => {
    return (
        <div className={styles.customerIssuePage}>
            <IssueImage/>
            <IssueContent/>
        </div>
    );
};

export default CustomerIssuePage;