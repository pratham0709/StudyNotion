import React from 'react'
import Template from '../Components/Core/HomePage/Template'
import SignupImg from '../assets/Images/signup.webp'
import frameImg from '../assets/Images/frame.png'

const Signup = ({setIsLoggedIn}) => {
  return (
    <div>
        <Template 
            title="Join the millions learning to code with StudyNotion for free"
            desc1="Build skills for today, tomorrow, and beyond."
            desc2="Education to future-proof your career."
            formType="Signup"
            img1={SignupImg}
            img2={frameImg}
            setIsLoggedIn={setIsLoggedIn}
        />
    </div>
  )
}

export default Signup