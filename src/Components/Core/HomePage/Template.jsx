import React from 'react'
import SignupForm from './SignupForm'
import LoginForm from './LoginForm'
import { FcGoogle } from "react-icons/fc";

const Template = ({title, desc1, desc2, formType, img1, img2, setIsLoggedIn}) => {
  return (
    <div className='flex items-center justify-between w-11/12 py-12 mx-auto max-w-maxContent gap-x-12 gap-y-0'>
        <div className='w-11/12 max-w-[450px]'>
            <h1 className='text-richblack-5 font-semibold text-[1.875rem] leading-[2.375rem]'>{title}</h1>

            <p className='text-[1.125rem] leading[1.625rem] mt-4'>
                <span className='text-richblack-100'>{desc1}</span>
                <br/>
                <span className='italic text-blue-100'>{desc2}</span>
            </p>

            { formType == "Signup" ?
                (<SignupForm setIsLoggedIn={setIsLoggedIn} />) :
                (<LoginForm setIsLoggedIn={setIsLoggedIn} />)
            }

            <div className='flex items-center w-full my-4 gap-x-2'>
                <div className='w-full h-[1px] bg-richblack-700'></div>
                <p className='text-richblack-700 font-medium leading[1.375rem]'>OR</p>
                <div className='w-full h-[1px] bg-richblack-700'></div>
            </div>

            <button className='w-full flex justify-center items-center rounded-[8px] font-medium text-richblack-100
            border border-richblack-700 px-[12px] py-[8px] gap-x-2 mt-6  '>
                <FcGoogle />
                <p>Sign Up with Google</p>
            </button>
        </div>

        <div className='w-11/12 max-w-[450px] relative'>
            <img 
                src={img2}
                alt='pattern'
                width={558}
                height={490}
                loading="lazy"  
            />
             <img 
                src={img1}
                alt='Students'
                width={558}
                height={490}
                loading="lazy"
                className='absolute right-4 -top-4'  
            />
        </div>
    </div>
  )
}

export default Template