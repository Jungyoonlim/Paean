import React from 'react';
import Navbar from '../../components/Navbar'
import { Navigate, Outlet } from 'react-router-dom';

const AuthLayout = () => {
    const flashcardUser = window.localStorage.getItem('flashcardUser');
    const isAuth = flashcardUser && JSON.parse(flashcardUser) ? true : false;

    if (isAuth) {
        return <Navigate to='/dashboard' replace />
    }

    return (
        <div>
            <Navbar />
            <Outlet />
        </div>
    )
}

export default AuthLayout