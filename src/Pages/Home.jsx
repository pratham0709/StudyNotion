import React from 'react'
import {FaArrowRight} from 'react-icons/fa'
import { Link } from 'react-router-dom'
import HighlightText from '../Components/Core/HomePage/HighlightText'
import CTAButton from '../Components/Core/HomePage/Button'
import Banner from '../assets/Images/banner.mp4'
import CodeBlocks from '../Components/Core/HomePage/CodeBlocks'
import TimelineSection from '../Components/TimelineSection'
import LearningLanguageSection from '../Components/LearningLanguageSection'
import InstructorSection from '../Components/Core/HomePage/InstructorSection'
import ExploreMore from '../Components/Core/HomePage/ExploreMore'
import Footer from '../Components/Core/HomePage/Footer'

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

            <div className='mx-3 my-12 shadow-blue-200'>
                <video 
                muted 
                loop
                autoPlay
                >
                <source src={Banner} type="video/mp4" />
                </video>
            </div>

            {/* Code Section 1 */}
            <div>
                <CodeBlocks 
                    position={"lg:flex-row"}
                    heading={
                        <div className='text-4xl font-semibold'>
                            Unlock your
                            <HighlightText text={"coding potential"} /> {" "}
                            with our online courses
                        </div>
                    }
                    subheading={"Our courses are designed and taught by industry experts who have years of experience in coding and are passionate about sharing their knowledge with you."}
                    ctabtn1={
                        {
                            btnText: "Try it yourself",
                            linkto: "/signup",
                            active:true,
                        }
                    }
                    ctabtn2={
                        {
                            btnText: "Learn more",
                            linkto: "/login",
                            active:false,
                        }
                    }
                    codeblock={`<!DOCTYPE html>\n<html>\nhead><title>Example</\ntitle><linkrel="stylesheet"href="styles.css">\n/head>\nbody>\nh1><ahref="/">Header</a>\n/h1>\nnav><ahref="one/">One</a><ahref="two/">Two</\na><ahref="three/">Three</a>\n/nav>`}
                    codeColor={`text-yellow-25`}
                />
            </div>

             {/* Code Section 2 */}
             <div>
                <CodeBlocks 
                    position={"lg:flex-row-reverse"}
                    heading={
                        <div className='text-4xl font-semibold'>
                            Start
                            <HighlightText text={"coding in seconds"} /> {" "}
                        </div>
                    }
                    subheading={"Go ahead, give it a try. Our hands-on learning environment means you'll be writing real code from your very first lesson."}
                    ctabtn1={
                        {
                            btnText: "Continue Lesson",
                            linkto: "/signup",
                            active:true,
                        }
                    }
                    ctabtn2={
                        {
                            btnText: "Learn more",
                            linkto: "/login",
                            active:false,
                        }
                    }
                    codeblock={`<!DOCTYPE html>\n<html>\nhead><title>Example</\ntitle><linkrel="stylesheet"href="styles.css">\n/head>\nbody>\nh1><ahref="/">Header</a>\n/h1>\nnav><ahref="one/">One</a><ahref="two/">Two</\na><ahref="three/">Three</a>\n/nav>`}
                    codeColor={`text-yellow-25`}
                />
            </div>
            
            <ExploreMore />
        </div>  

        {/* Section 2 */}
        <div className='bg-pure-greys-5 text-richblack-700'>
            <div className='homepage_bg h-[310px]'>
                <div className='w-11/12 max-w-maxContent flex flex-col items-center gap-5 mx-auto justify-between'>
                    <div className='h-[150px]'></div>
                    <div className='flex flex-row gap-7 text-white'>
                        <CTAButton active={true} linkto={"/signup"}>
                            <div className='flex items-center gap-3'>
                                Explore full Catalog
                                <FaArrowRight />
                            </div>
                        </CTAButton>

                        <CTAButton active={false} linkto={"/signup"}>
                            <div>
                                Learn more
                            </div>
                        </CTAButton>
                    </div>
                </div>

                     
            </div>

            <div className='mx-auto w-11/12 max-w-maxContent flex flex-col items-center justify-between gap-7'>
                    
                    <div className='flex flex-row gap-7 justify-between mt-[95px] mb-10'>
                        <div className='text-4xl font-semibold w-[45%]'>
                            Get the skills you need for a 
                            <HighlightText text={"job that is in demand"} />
                        </div>

                        <div className='flex flex-col gap-10 w-[40%] items-start'>
                            <div className='text-[16px]'>
                                The modern StudyNotion is the dictates its own terms. Today, to be a competitive specialist requires more than professional skills.
                            </div>
                            <CTAButton active={true} linkto={"/signup"} >
                                <div>
                                    Learn more
                                </div>
                            </CTAButton>
                        </div>
                    </div>

                    <TimelineSection />

                    <LearningLanguageSection />
                                        
            </div>


        </div>

        {/* Section 3 */}
        <div className='w-11/12 mx-auto max-w-maxContent flex flex-col items-center justify-between gap-8 bg-richblack-900 
        text-white mb-10'>
            <InstructorSection />

            <h2 className='text-center text-4xl font-semibold mt-10'>Review from other learners</h2>
            
            {/* Review Slider Here  */}
        </div>

        {/* Footer */}
        <div className='bg-[#161D29] text-[#424854] mt-13'>
            <Footer />
        </div>
    </div>
  )
}

export default Home