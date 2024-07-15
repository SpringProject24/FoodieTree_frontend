import React from 'react';
import {Outlet} from "react-router-dom";

const StoreMyPage = () => {
    return (
        <>
            <div>store page</div>
            <Outlet/>
        </>
    );
};

export default StoreMyPage;