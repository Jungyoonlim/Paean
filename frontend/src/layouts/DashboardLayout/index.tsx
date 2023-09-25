import Navbar from '../../components/Navbar'
import { Navigate, Outlet } from 'react-router-dom'
import './styles.scss'
import React from 'react'

const DashboardLayout = () => {
    const flashcardUser = window.localStorage.getItem('flashcardUser');
    const isAuth = flashcardUser && JSON.parse(flashcardUser) ? true : false;

    if(!isAuth){
        return <Navigate to='/login' replace/>
    }

    return (
        <div className='flex w-full h-screen bg-white relative'>
            <div className='main flex-row w-full lg:w-[calc(100vw - 287px)] md:ml-0 lg:ml-[287px] h-full bg-[#F9F9F9]'>
                <div className='flex w-full'>
                    <div className='flex-col w-full'>
                        <div className='overflow-scroll px-[40px] lg:pt-12s'>
                            <Navbar isDashboard={true} />
                            <Outlet />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DashboardLayout