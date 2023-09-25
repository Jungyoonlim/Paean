import React from 'react'
import Footer from '../../components/Footer'
import Navbar from '../../components/Navbar'
import { Navigate, Outlet } from 'react-router-dom'

const HomeLayout = () => {
    const flashcardUser = window.localStorage.getItem('flashcardUser');
    const isAuth = flashcardUser && JSON.parse(flashcardUser) ? true : false; 

    if (isAuth){
        return <Navigate to ='/dashboard' replace />
    }

    return (
        <div>
            <Navbar isDashboard={isAuth} />
            <Outlet />
            <Footer />
        </div>
    )
}
export default HomeLayout