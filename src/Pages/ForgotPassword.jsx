import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom';
import { getPasswordResetToken } from '../services/operations/authAPI';
import { FaArrowLeftLong } from "react-icons/fa6";

const ForgotPassword = () => {
    const [emailSent, setEmailSent] = useState(false);
    const [email, setEmail] = useState("");

    const {loading} = useSelector((state) => state.auth);
    const dispatch = useDispatch()

    const handleOnSubmit = (e) => {
        e.preventDefault();
        dispatch(getPasswordResetToken(email, setEmailSent))
        
    }
  return (
    <div className='flex items-center justify-center h-screen text-white'>
       
        {
            loading ? (
                <div>Loading...</div>
            ) : (
                <div className='w-[448px] flex flex-col gap-3'>
                    <h1 className='text-[1.875rem] font-semibold leading-[2.375rem] text-richblack-5'>
                        {
                            !emailSent ? "Reset your password" : "Check email"
                        }
                    </h1>

                    <p className='text-[#AFB2BF] text-lg'>
                        {
                            !emailSent ? "Have no fear. We’ll email you instructions to reset your password. If you dont have access to your email we can try account recovery" 
                            : `We have sent the reset email to
                            ${email}`
                        }
                    </p>

                    <form onSubmit={handleOnSubmit} className='flex flex-col'>
                        {
                            !emailSent && (
                                <label className='flex flex-col w-full'>
                                    <p className='mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5'>Email Address<sup className='text-pink-200'>*</sup></p>
                                    <input
                                        required
                                        name='email'
                                        type='email' 
                                        value={email}
                                        placeholder='Enter Your Email'
                                        onChange={(e) => setEmail(e.target.value)}
                                        className='w-full rounded-[0.5rem] bg-richblack-800 p-[12px] pr-12 text-richblack-5'
                                    />
                                </label>
                            )
                        }
                        <button type='submit'
                        className='w-full text-black bg-[#FFD60A] mt-4 p-3 rounded-md text-sm font-semibold'>
                            {
                                !emailSent ? "Reset Password" : "Resend email"
                            }
                        </button>

                    </form>

                    <div className='flex items-center gap-2'>
                        <FaArrowLeftLong />
                        <Link to="/login">
                            <p>Back to login</p>
                        </Link>
                    </div>
                </div>
            )
        }
    </div>
  )
}

export default ForgotPassword