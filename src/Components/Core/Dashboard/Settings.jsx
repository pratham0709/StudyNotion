import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import { IoIosArrowBack } from "react-icons/io";
import {updateDisplayPicture} from '../../../services/operations/authAPI'

const Settings = () => {

    const {user} = useSelector((state) => state.profile);
    const navigate = useNavigate();
    const dispatch = useDispatch();

  return (
    <div className='flex flex-col w-full text-white'>

        <div className='flex flex-col w-full gap-2 px-6'>
            <div className='flex items-center gap-1 text-sm text-richblack-200'>
                <IoIosArrowBack />      
                <p>Back</p>
            </div>
            
            <h1 className='text-lg font-medium font-inter text-richblack-5'>Edit Profile</h1>
        </div>
        
        <div className='w-[790px] flex mx-auto mt-10'>
            {/* Section 1 */}
            <div className='flex'>
                <div>
                    <img 
                        src={user?.image}
                        alt={`profile-${user?.firstName}`}
                        className='aspect-square object-cover w-[78px] rounded-full'
                    />
                </div>
                <div className='flex flex-col'>
                    <p>Change Your Profile Picture</p>
                    <div className='flex'>

                        <input 
                            type='file'
                            name='file'
                            placeholder='Change'
                        />
                       

                        <button>
                            Remove
                        </button>
                    </div>
                </div>    
            </div>
        </div>
    </div>
  )
}

export default Settings