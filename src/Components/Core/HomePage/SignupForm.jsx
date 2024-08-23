import React, { useState } from 'react'

const SignupForm = ({setIsLoggedIn}) => {
  const [accountType, setAccountType] = useState("student");

  return (
    <form className='flex gap-2 mt-2 flex-w-full'>
        <div className={`${accountType}`}>
          <div>Student</div>
          <div>Instructor</div>
        </div>
    </form>
  )
}

export default SignupForm