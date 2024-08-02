import React from 'react'
import {FaArrowRight} from 'react-icons/fa'
import { Link } from 'react-router-dom'
import HighlightText from '../Components/Core/HomePage/HighlightText'
import CTAButton from '../Components/Core/HomePage/Button'

const Home = () => {
  return (
    <div>
        {/* Section 1 */}
        <div className='relative mx-auto w-11/12 max-w-maxContent flex flex-col items-center text-white justify-between'>
            <Link to={"/signup"}>
                
                <div className=' group mt-16 p-1 mx-auto rounded-full bg-richblack-800 text-bold text-richblack-200 
                transition-all duration-200 hover:scale-95 w-fit'>
                    <div className='flex flex-row items-center gap-2 rounded-full px-10 py-[5px] transition-all duration-200
                    group-hover:bg-richblack-900'>
                        <p>Become an Instructor</p>
                        <FaArrowRight />
                    </div>
                </div>
            </Link>

            <div className='text-center text-4xl font-semibold mt-7'>
                Empower Your Future with
                <HighlightText text={"Coding Skills"} /> 
            </div>

            <div className='w-[90%] text-lg text-center font-bold text-richblack-300 mt-4'>
                With our online coding courses, you can learn at your own pace, from anywhere in the world, and get access to a wealth of resources, including hands-on projects, quizzes, and personalized feedback from instructors.
            </div>
            
            <div className='flex flex-row gap-7 mt-8'>
                <CTAButton active={true} linkto={"/signup"}>
                    Learn More
                </CTAButton>

                <CTAButton active={false} linkto={"/login"}>
                    Book a Demo
                </CTAButton>
            </div>
        </div>  

        {/* Section 2 */}

        {/* Section 3 */}

        {/* Footer */}

    </div>
  )
}

export default Home