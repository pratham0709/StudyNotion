import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form';
import ContryCode from '../../../data/countrycode.json'

const ContactUsForm = () => {
    const [loading, setLoading] = useState(false);

    const {
        register,
        handleSubmit,
        reset,
        formState: {errors, isSubmitSuccessful}
        } = useForm();

        const submitContactForm = async (data) => {
            console.log("logging Data", data);
            try{
                setLoading(true);
                // const responce = await apiConnector("POST", contactusEndpoint.CONTACT_US_API, data);
                const responce = {status:"OK"};
                console.log("logging responce", responce);
                setLoading(false);
            }
            catch(error){
                console.log("Error:", error.message);
                setLoading(false);

            }
        }   

    useEffect( () => {
        if(isSubmitSuccessful){
            reset({
                email:"",
                firstname:"",
                lastname:"",
                message:"",
                phoneNo:""

            }, [reset, isSubmitSuccessful])
        }
    })
  return (
    <form onSubmit={handleSubmit(submitContactForm)}>
        <div className='flex flex-col gap-8'>
            <div className='flex justify-between w-full gap-5'>
            {/* FirstName  */}
            <div className='flex flex-col w-full'>
                <label htmlFor='firstname' className='mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5'
                >First Name</label>
                <input 
                    type='text'
                    name='firstname'
                    id='firstname'
                    placeholder='Enter first name'
                    style={{
                        boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                    }}
                    className="w-full rounded-[0.5rem] bg-richblack-800 p-[12px] text-richblack-5"
                    {...register("firstname", {required:true})}
                />
                {
                    errors.firstname && (
                        <span>
                            Please enter your name 
                        </span>
                    )
                }
            </div>

            {/* LastName */}
            <div className='flex flex-col w-full'>
                <label htmlFor='lastname'
                    className='mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5'
                >Last Name</label>
                <input 
                    type='text'
                    name='lastname'
                    id='lastname'
                    placeholder='Enter Last name'
                    style={{
                        boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                    }}
                    className="w-full rounded-[0.5rem] bg-richblack-800 p-[12px] text-richblack-5"
                    {...register("lastname")}
                />
            </div>
            
            </div>
            
            {/* email  */}
            <div className='flex flex-col'>
                <label htmlFor='email'
                className='mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5'
                >Email Address</label>
                <input 
                    type='email'
                    name='email'
                    id='email'
                    placeholder='Enter email Address'
                    style={{
                        boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                    }}
                    className="w-full rounded-[0.5rem] bg-richblack-800 p-[12px] text-richblack-5"
                    {...register("email", {required:true})}
                />
                {
                    errors.email && (
                        <span>
                            Please enter your email address
                        </span>
                    )
                }
            </div>

            {/* Phone no  */}
            <div className='flex flex-col '>
                <label htmlFor='phonenumber'
                className='mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5'
                >
                    Phone Number
                </label>
                <div className='flex flex-row items-center gap-5 '>
                    {/* dropdown */}
                    <div className='flex flex-col gap-2 w-[95px]'>
                        <select
                            name='dropdown'
                            id='dropdown'
                            style={{
                                boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                            }}
                            className="w-full rounded-[0.5rem] bg-richblack-800 p-[12px] text-richblack-5"
                            {...register("contrycode", {required:true})}
                        >
                            {
                                ContryCode.map( (element, index) => {
                                    return (
                                        <option key={index} value={element.code}>
                                            {element.code} -{element.country}
                                        </option>
                                    )
                                })
                            }
                        </select>
                    </div>

                    <div className='flex flex-col w-full'>
                        <input 
                            type='number'
                            name='phonenumber'
                            id='phonenumber'
                            placeholder='12345 67890'
                            style={{
                                boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                            }}
                            className="w-full rounded-[0.5rem] bg-richblack-800 p-[12px] text-richblack-5"
                            {...register("phoneNo", 
                            {
                                required:{value:true, message:"Please Enter Phone Number"}, 
                                maxLength: {value:10, message:"Invalid Phone Number"},
                                minLength: {value:8, message:"Invalid Phone Number"}
                            })}
                        />
                    </div>
                </div>
                {
                    errors.phoneNo && (
                        <span>
                            {errors.phoneNo.message}
                        </span>

                    )
                }
            </div>

            {/* message */}
            <div className='flex flex-col'>
                <label htmlFor='message'
                className='mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5'
                >Message</label>
                <textarea 
                    name='message'
                    id='message'
                    cols="30"
                    rows="7"
                    placeholder='Enter Your message here'
                    style={{
                                boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                            }}
                    className="w-full rounded-[0.5rem] bg-richblack-800 p-[12px] text-richblack-5"
                    {...register("message", {required:true})}
                />
                {
                    errors.message && (
                        <span>
                            Please enter your message.
                        </span>
                    )
                }
            </div>
            
            <button type='submit'
            className='`text-center text-[15px] px-6 py-3 rounded-md font-bold bg-yellow-50 text-black hover:scale-95 transition-all duration-200'>
                Send Message
            </button>
        </div>
    </form>
  )
}

export default ContactUsForm