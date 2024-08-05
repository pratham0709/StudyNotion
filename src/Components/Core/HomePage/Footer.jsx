import React from 'react'
import { FooterLink1 } from '../../../data/footer-links'
import { FooterLink2 }from '../../../data/footer-links'
import Logo from '../../../assets/Logo/Logo-Full-Light.png'
import { Link } from 'react-router-dom'
import { FaFacebook } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";
import { FaGoogle } from "react-icons/fa";
import { FaYoutube } from "react-icons/fa";

const Footer = () => {
    // const title = FooterLink1[0].links.map(link => link.title)
  return (
    <div className='w-11/12 mx-auto max-w-maxContent flex flex-col items-center justify-between'>
        <div className='flex flex-row gap-20 w-full justify-center mt-12'>
            {/* Left part */}
            <div className='flex flex-row gap-12 w-[50%] '>

                {/* div1 */}
                <div className='flex flex-col gap-5'>
                    <img 
                        src={Logo}
                        className='w-[160px] h-[32px]'
                    />
                    <div className='font-inter'>
                        <p className='text-[#AFB2BF] font-semibold text-base'>Company</p>
                        <div className='mt-3'>
                            {
                                FooterLink1.find(item => item.title === "Company").links.map((element, index) => {
                                    return(
                                        <Link to={`${element.link}`}>
                                            <div className='flex flex-col cursor-pointer hover:text-[#AFB2BF] 
                                            transition-all duration-200 mt-2 text-base'>
                                                {element.title}
                                            </div>
                                        </Link>
                                    )
                                })
                            }
                        </div>
                        <div className='flex flex-row gap-3 mt-4 cursor-pointer '>
                            <FaFacebook className='hover:text-[#AFB2BF] transition-all duration-200 w-[20px] h-[20px]' />
                            <FaGoogle className='hover:text-[#AFB2BF] transition-all duration-200 w-[20px] h-[20px]'/>
                            <FaTwitter className='hover:text-[#AFB2BF] transition-all duration-200 w-[20px] h-[20px]'/>
                            <FaYoutube  className='hover:text-[#AFB2BF] transition-all duration-200 w-[20px] h-[20px]'/>
                        </div>
                    </div>
                </div>
                
                {/* div2 */}
                <div className='flex flex-col gap-5'>
                    <div className='font-inter'>
                            <p className='text-[#AFB2BF] font-semibold text-base'>Resources</p>
                            <div className='mt-2'>
                                {
                                    FooterLink1.find(item => item.title === "Resources").links.map((element, index) => {
                                        return(
                                            <Link to={`${element.link}`}>
                                                <div className='flex flex-col cursor-pointer hover:text-[#AFB2BF] 
                                                transition-all duration-200 mt-2 text-base'>
                                                    {element.title}
                                                </div>
                                            </Link>
                                        )
                                    })
                                }
                            </div>

                    </div>

                    <div className='font-inter'>
                        <p className='text-[#AFB2BF] font-semibold text-base'>Support</p>
                        <div className='mt-2'>
                            {
                                FooterLink1.find(item => item.title === "Support").links.map((element, index) => {
                                    return(
                                        <Link to={`${element.link}`}>
                                            <div className='flex flex-col cursor-pointer hover:text-[#AFB2BF] 
                                            transition-all duration-200 mt-2 text-base' key={index}>
                                                {element.title}
                                            </div>
                                        </Link>
                                    )
                                })
                            }
                        </div>

                    </div>
                </div>
                
                {/* div 3 */}
                <div className='flex flex-col gap-5 ml-8'>
                    <div className='font-inter'>
                            <p className='text-[#AFB2BF] font-semibold text-base'>Plans</p>
                            <div className='mt-2'>
                                {
                                    FooterLink1.find(item => item.title === "Plans").links.map((element, index) => {
                                        return(
                                            <Link to={`${element.link}`}>
                                                <div className='flex flex-col cursor-pointer hover:text-[#AFB2BF] 
                                                transition-all duration-200 mt-2 text-base'>
                                                    {element.title}
                                                </div>
                                            </Link>
                                        )
                                    })
                                }
                            </div>

                    </div>

                    <div className='font-inter'>
                        <p className='text-[#AFB2BF] font-semibold text-base'>Community</p>
                        <div className='mt-2'>
                            {
                                FooterLink1.find(item => item.title === "Community").links.map((element, index) => {
                                    return(
                                        <Link to={`${element.link}`}>
                                            <div className='flex flex-col cursor-pointer hover:text-[#AFB2BF] 
                                            transition-all duration-200 mt-2 text-base' key={index}>
                                                {element.title}
                                            </div>
                                        </Link>
                                    )
                                })
                            }
                        </div>

                    </div>
                </div>

                {/* <div className='border-r-[1px] border-[#2C333F]'></div> */}
            </div>

            {/* Right Part  */}
            <div className='flex flex-row gap-12 w-[50%] '>
                
            <div className='border-l-[1px] border-[#2C333F]'></div>
                {/* div1 */}

                <div className='flex flex-col gap-5'>

                    <div className='font-inter'>
                        <p className='text-[#AFB2BF] font-semibold text-base'>Subjects</p>
                        <div className='mt-2'>
                            {
                                FooterLink2.find(item => item.title === "Subjects").links.map((element, index) => {
                                    return(
                                        <Link to={`${element.link}`}>
                                            <div className='flex flex-col cursor-pointer hover:text-[#AFB2BF] 
                                            transition-all duration-200 mt-2 text-base' key={index}>
                                                {element.title}
                                            </div>
                                        </Link>
                                    )
                                })
                            }
                        </div>

                    </div>
                </div>
                
                {/* div2 */}
                <div className='flex flex-col gap-5 ml-8'>
                    <div className='font-inter'>
                        <p className='text-[#AFB2BF] font-semibold text-base'>Languages</p>
                        <div className='mt-2'>
                            {
                                FooterLink1.find(item => item.title === "Languages").links.map((element, index) => {
                                    return(
                                        <Link to={`${element.link}`}>
                                            <div className='flex flex-col cursor-pointer hover:text-[#AFB2BF] 
                                            transition-all duration-200 mt-2 text-base' key={index}>
                                                {element.title}
                                            </div>
                                        </Link>
                                    )
                                })
                            }
                        </div>

                    </div>
                </div>
                
                {/* div 3 */}
                <div className='flex flex-col gap-5 ml-8'>
                    <div className='font-inter'>
                        <p className='text-[#AFB2BF] font-semibold text-base'>Community</p>
                        <div className='mt-2'>
                            {
                                FooterLink1.find(item => item.title === "Community").links.map((element, index) => {
                                    return(
                                        <Link to={`${element.link}`}>
                                            <div className='flex flex-col cursor-pointer hover:text-[#AFB2BF] 
                                            transition-all duration-200 mt-2 text-base' key={index}>
                                                {element.title}
                                            </div>
                                        </Link>
                                    )
                                })
                            }
                        </div>

                    </div>
                </div>

                {/* <div className='border-r-[1px] border-[#2C333F]'></div> */}
            </div>
        </div>

        <div></div>
    </div>
  )
}

export default Footer