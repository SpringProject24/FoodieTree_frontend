import React from 'react';
import {Outlet} from "react-router-dom";

const StoreMyPageOutlet = () => {
    return (
        <>
            <div>store page</div>
            <Outlet/>
        </>
    );
};

export default StoreMyPageOutlet;