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
        <div className='flex flex-col gap-14'>
            <div className='flex gap-5'>
            {/* FirstName  */}
            <div className='flex flex-col'>
                <label htmlFor='firstname'>First Name</label>
                <input 
                    type='text'
                    name='firstname'
                    id='firstname'
                    placeholder='Enter first name'
                    className='text-black'
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
            <div className='flex flex-col'>
                <label htmlFor='lastname'>Last Name</label>
                <input 
                    type='text'
                    name='lastname'
                    id='lastname'
                    placeholder='Enter Last name'
                    className='text-black'
                    {...register("lastname")}
                />
            </div>
            
            </div>
            
            {/* email  */}
            <div className='flex flex-col'>
                <label htmlFor='email'>Email Address</label>
                <input 
                    type='email'
                    name='email'
                    id='email'
                    placeholder='Enter email Address'
                    className='text-black'
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
                <label htmlFor='phonenumber'>
                    Phone Number
                </label>
                <div className='flex flex-row gap-5 '>
                    {/* dropdown */}
                    <div className='flex flex-col gap-2 w-[80px]'>
                        <select
                            name='dropdown'
                            id='dropdown'
                            className='bg-yellow-50'
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

                    <div className='flex flex-col w-[calc(100% - 90px)]'>
                        <input 
                            type='number'
                            name='phonenumber'
                            id='phonenumber'
                            placeholder='12345 67890'
                            className='text-black'
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
            <div>
                <label htmlFor='message'>Message</label>
                <textarea 
                    name='message'
                    id='message'
                    cols="30"
                    rows="7"
                    placeholder='Enter Your message here'
                    className='text-black'
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
        className='px-6 text-center rounded-md bg-yellow-50 text-[16px] font-bold text-black'>
                Send Message
            </button>
        </div>
    </form>
  )
}

export default ContactUsForm