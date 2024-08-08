import React, { useEffect, useState } from 'react'
import logo from '../../assets/Logo/Logo-Full-Light.png'
import { Link, matchPath, useLocation } from 'react-router-dom'
import { NavbarLinks } from '../../data/navbar-links'
import { useSelector } from 'react-redux'
import { FaOpencart } from "react-icons/fa";
import ProfileDropDown from '../Core/Auth/ProfileDropDown'
import { apiConnector} from '../../services/apiconnector'
import { categories } from '../../services/apis'
import { IoMdArrowDropdownCircle } from "react-icons/io";

const subLinks = [
    {
        title : "Python",
        link: "/catalog/python"
    },
    {
        title: "Web Development",
        link: "/catalog/web-development"
    }
]
const Navbar = () => {

    const {token} = useSelector( (state) => state.auth);
    const {user} = useSelector( (state) => state.profile);
    const {totalItems} = useSelector( (state) => state.cart);

    // const [subLinks, setSubLinks] = useState([]);
   
    // const fetchSublinks =  async() => {
    //     try{
    //         const result = await apiConnector("GET", categories.CATEGORIES_API);
    //         console.log("Printing Sublink result:", result);
    //         setSubLinks(result.data.data);
    //     }
    //     catch(error){
    //         console.log("Could not fetch the category list");
    //     }
    // }

    // useEffect( () => {
    //     fetchSublinks();
    // })

    const location = useLocation();
    const matchRoute = (route) => {
        return matchPath({path:route}, location.pathname);
    }
  return (
    <div className='flex justify-center h-14 items-center border-b-[1px] border-b-richblack-700'>
        <div className='flex w-11/12 max-w-maxContent items-center justify-between'>
            <Link to="/">
                <img 
                src={logo} 
                width={160} height={42} loading='lazy'
                alt='logo'
                />
            </Link>

            {/* Navlink  */}
            <nav>
                <ul className='flex gap-x-6 text-richblack-25'>
                {
                    NavbarLinks.map( (link, index) => (
                        <li key={index}>
                        {
                            link.title === "Catalog" ? (
                                <div className='relative flex items-center gap-2 group'>
                                    <p>{link.title}</p>
                                    <IoMdArrowDropdownCircle />

                                    <div className='invisible absolute left-[50%] top-[50%] bg-richblack-5 text-richblack-900
                                    rounded-md flex flex-col p-4 opacity-0 transition-all duration-200 group-hover:visible
                                    group-hover:opacity-100 lg:w-[300px] translate-x-[-50%] translate-y-[25%] cursor-pointer'>

                                        <div className='absolute left-[50%] h-6 w-6 top-0 bg-richblack-5 rounded rotate-45
                                        translate-x-[80%] translate-y-[-45%]'>
                                            
                                        </div>
                                        {
                                                subLinks.length ? (
                                                    subLinks.map((subLinks, index) => (
                                                        <Link to={`${subLinks.link}`} key={index}>
                                                            <p className='p-3 text-[1rem]'>{subLinks.title} </p>
                                                        </Link>
                                                    ))
                                                ) : (<div></div>)
                                            }
                                    </div>
                                </div>
                                ) : (
                                <Link to={link?.path}>
                                    <p className={`${matchRoute(link?.path) ? "text-yellow-25" : "text-richblack-25"}`}>
                                        {link.title}
                                    </p>
                                </Link>
                            )
                        }
                        </li>
                    ))
                }
                </ul>
            </nav>

            {/* login/SignUp/Dashbord */}
            <div className='flex gap-x-4 items-center'>
                {
                    user && user?.accountType != "Instructor" && (
                        <Link to="/dashboard/cart" className='relative'>
                            <FaOpencart />
                            {
                                totalItems > 0 && (
                                    <span>
                                        {totalItems}
                                    </span>
                                )
                            }
                        </Link>
                    )
                }
                {
                    token === null && (
                        <Link to="/login">
                            <button className='border border-richblack-700 bg-richblack-800 px-[12px] py-[8px]
                            text-richblack-100 rounded-md'>
                                Log in
                            </button>
                        </Link>
                    )
                }
                {
                    token === null && (
                        <Link to="/signup">
                            <button className='border border-richblack-700 bg-richblack-800 px-[12px] py-[8px]
                            text-richblack-100 rounded-md'>
                                Sign Up
                            </button>
                        </Link>
                    )
                }
                {
                    token !== null && <ProfileDropDown />
                }
            </div>

        </div>

    </div>
  )
}

export default Navbar