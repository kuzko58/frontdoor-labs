import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAppContext } from '../contexts/app-context';

const AuthGuard = () => {
    const { state } = useAppContext();

    if (!state.isAuthenticated) return <Navigate to="/login" replace={true} />;

    return (
        <>
            <Outlet />
        </>
    );
};

export default AuthGuard;
