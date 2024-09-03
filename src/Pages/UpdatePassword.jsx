import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useLocation } from 'react-router-dom';
import { AiFillEyeInvisible } from "react-icons/ai";
import { AiFillEye } from "react-icons/ai";
import { resetPassword } from '../services/operations/authAPI';

const UpdatePassword = () => {
    const dispatch = useDispatch();
    const location = useLocation();
    const [formData, setFormData] = useState({
        password: "",
        confirmPassword: ""
    })
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const {loading} = useSelector( (state) => state.auth);

    const {password, confirmPassword} = formData;
    const handleOnChange = (e) => {
        setFormData( (prevData) => ({
            ...prevData,
            [e.target.name] : e.target.value,
        }))
    }

    const handleOnSubmit = (e) => {
        e.preventDefault();
        const token = location.pathname.split('/').at(-1);
        dispatch(resetPassword(password, confirmPassword, token));
    }
  return (
    <div className='text-white'>
    {
        loading ?  (
            <div>
                Loading....
            </div>
            ) : (
                <div>
                    <h1>Choose new Password</h1>
                    <p>Almost done. Enter your new password and youre all set.</p>
                    <form onSubmit={handleOnSubmit}>
                        <label>
                            <p>New Password<sup>*</sup></p>
                            <input 
                                required
                                name="password"
                                type={showPassword ? "text" : "password"}
                                placeholder='Enter New Password'
                                value={password}
                                onChange={handleOnChange}
                                className='p-3 bg-richblack-600 text-richblack-5'
                            />
                            <span
                                onClick={() => setShowPassword((prev) => !prev)}
                            >
                                {
                                    showPassword ? <AiFillEyeInvisible fontSize={24} />
                                    : <AiFillEye fontSize={24} />
                                }
                            </span>
                        </label>
                        

                        <label>
                            <p>Confirm Password<sup>*</sup></p>
                            <input 
                                required
                                name="confirmPassword"
                                type={showConfirmPassword ? "text" : "password"}
                                placeholder='Enter Confirm Password'
                                value={confirmPassword}
                                onChange={handleOnChange}
                                className='p-3 bg-richblack-600 text-richblack-5'
                            />
                            <span
                                onClick={() => setShowConfirmPassword((prev) => !prev)}
                            >
                                {
                                    showConfirmPassword ? <AiFillEyeInvisible fontSize={24} />
                                    : <AiFillEye fontSize={24} />
                                }
                            </span>
                        </label>
                        
                        <button type='submit'>
                            Reset Password
                        </button>
                    </form>
                    
                    <div>
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

export default UpdatePassword