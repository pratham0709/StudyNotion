import React from 'react'
import { HiChatBubbleLeftRight } from "react-icons/hi2";
import { IoCall } from "react-icons/io5";
import { BiWorld } from "react-icons/bi";
import ContactUsForm from '../components/core/ContactPage/ContactUsForm';
import Footer from '../components/common/Footer';

const data = [
    {
        heading:"Chat on us",
        icon: <HiChatBubbleLeftRight className='h-[24px] w-[24px] text-richblack-200' />,
        description1:"Our friendly team is here to help.",
        description2:"info@studynotion.com"
    },
    {
        heading:"Visit us",
        icon: <BiWorld className='h-[24px] w-[24px] text-richblack-200' />,
        description1:"Come and say hello at our office HQ. ",
         description2:"Akshya Nagar 1st Block 1st Cross, Rammurthy nagar, Bangalore-560016"
    },
    {
        heading:"Call us",
        icon: <IoCall className='h-[24px] w-[24px] text-richblack-200' />,
        description1:"Mon - Fri From 8am to 5pm ",
        description2:"+123 456 7869"
    }
]


const ContactUs = () => {
  return (
    <div className='text-white '>
        <div className='w-11/12 mx-auto mt-16 max-w-maxContent '>
            <div className='flex flex-col items-center justify-center gap-10 lg:items-start lg:flex-row'>
                <div className='w-[490px] mt-3 bg-richblack-800 h-fit py-9 px-9 rounded-lg flex flex-col gap-12'>
                    {
                        data.map( (element, index) => (
                            <div className='flex flex-col' 
                            key={index}>
                                <div className='flex items-center gap-3'>
                                    
                                    <div className=''>
                                        {element.icon}
                                    </div>

                                    <h1 className='text-lg font-semibold leading-7 font-inter'>
                                        {element.heading}
                                    </h1>
                                </div>

                                <div className='text-[0.890rem] leading-[1.25rem] font-medium font-inter text-richblack-200'>{element.description1}</div>
                                <div className='text-[0.890rem] leading-[1.25rem] font-semibold font-inter text-richblack-200'>{element.description2}</div>
                            </div>
                        ))
                    }
                </div>
                <div className='flex flex-col gap-8 mt-3 border rounded-lg px-14 py-14 border-richblack-600 w-[60%]'>
                    <div className='flex flex-col w-full gap-4'>
                        <h1 className='text-4xl font-semibold text-richblack-5 font-inter'>
                        Got a Idea? We've got the skills. Let's team up</h1>
                        
                        <p className='text-base font-medium font-inter text-richblack-300'>
                        Tell us more about yourself and what you're got in mind.</p>
                    </div>

                    <div>
                        <ContactUsForm />
                    </div>
                </div>
            </div>
        
            <div className='h-[150px]'></div>
            <div className='flex w-full mt-8'>
                <h1 className='flex items-center justify-center w-full text-4xl font-semibold text-richblack-5 font-inter'>
                    Reviews From Other Learners
                </h1>
            </div>
            <div className='h-[150px]'></div>
            </div>
        
        <Footer />
    </div>
  )
}

export default ContactUs