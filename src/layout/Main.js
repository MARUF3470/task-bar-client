import React from 'react';
import { Outlet } from 'react-router-dom';
import Headers from '../pages/shared/Headers';

const Main = () => {
    return (
        <div>
            <Headers></Headers>
            <Outlet></Outlet>
        </div>
    );
};

export default Main;