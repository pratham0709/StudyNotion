import React, { useState } from 'react'
import toast from 'react-hot-toast';
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { Link, useNavigate } from 'react-router-dom';


const LoginForm = ({setIsLoggedIn}) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email:"",
    password:"",
  })

  const[showPassword, setShowPassword] = useState(false);
  
  const changeHandler =(event) => {

        setFormData( (prevData) =>(
            {
                ...prevData,
                [event.target.name]:event.target.value
            }
        ) )

    }
    
  const submitHandler = (event) => {
    event.preventDefault();
    setIsLoggedIn(true);
    toast.success("Logged In");
    console.log("Printing Form Data");
    console.log(formData);
    navigate("/dashboard");
  }
  
  return (
      <form onSubmit={submitHandler}
      className='flex flex-col w-full mt-6 gap-y-4'>
        <label className='w-full'>
          <p className='text-[0.875rem] text-richblack-5 mb-1 leading-[1.375rem]'>Email Address <sup className='text-pink-200'>*</sup></p>
          <input 
            type="email"
            onChange={changeHandler}
            name="email"
            value={formData.name}
            placeholder='Enter email address'
            className='bg-richblack-800 rounded-[0.5rem] text-richblack-5 w-full p-[12px]'
          />
        </label>

        <label className='relative w-full'>
            <p className='text-[0.875rem] text-richblack-5 mb-1 leading-[1.375rem]'>
                Password<sup className='text-pink-200'>*</sup>
            </p>
            <input 
                required
                type= {showPassword ? ("text") : ("password")}
                value = {formData.password}
                onChange={changeHandler}
                placeholder="Enter Password"
                name="password"
                className='bg-richblack-800 rounded-[0.5rem] text-richblack-5 w-full p-[12px]'
            />

            <span 
            className='absolute right-3 top-[38px] cursor-pointer'
            onClick={() => setShowPassword((prev) => !prev)}>
                {showPassword ? 

                (<AiOutlineEyeInvisible fontSize={24} fill='#AFB2BF'/>) : 

                (<AiOutlineEye fontSize={24} fill='#AFB2BF'/>)}
            </span>

            <Link to="#">
                <p className='mt-1 ml-auto text-xs text-blue-100 max-w-max'>
                    Forgot Password
                </p>
            </Link>
        </label>
        
        <button className='bg-yellow-50 rounded-[8px] font-medium text-richblack-900 px-[12px] py-[8px] mt-6'>
            Sign In
        </button>
      </form>
  )
}

export default LoginForm