import React from 'react'
import Template from '../Components/Core/HomePage/Template'
import loginImg from '../assets/Images/login.webp'
import frameImg from '../assets/Images/frame.png'

const Login = ({setIsLoggedIn}) => {
  return (
    <div>
        <Template 
            title="Welcome Back"
            desc1="Build skills for today, tomorrow, and beyond."
            desc2="Education to future-proof your career."
            formType="login"
            img1={loginImg}
            img2={frameImg}
            setIsLoggedIn={setIsLoggedIn}
        />
    </div>
  )
}

export default Login