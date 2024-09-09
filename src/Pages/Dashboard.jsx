import React from 'react'
import { useSelector } from 'react-redux'
import { Outlet } from 'react-router-dom';
import Sidebar from '../components/core/Dashboard/Sidebar';
// import MyProfile from '../components/core/Dashboard/MyProfile';

const Dashboard = () => {
    const {loading: authLoading} = useSelector( (state) => state.auth);
    const {loading: profileLoading} = useSelector( (state) => state.profile)
    const {user} = useSelector((state) => state.profile);

    if(user === null) {
        return (
            <div>
                User is Null
            </div>
        )
    }

    if(authLoading || profileLoading){
        return (
            <div className='mt-10'>
                Loading....
            </div>
        )
    }

  return (
    <div className='text-white relative flex min-h-[calc(100vh-3.5rem)]'>
        <Sidebar />
        <div className='h-[calc(100vh - 3.5rem)] overflow-auto'>
            <div className='mx-auto w-full max-w-[1000px] py-10'>
                <Outlet />
            </div>
        </div>
    </div>
  )
}

export default Dashboard