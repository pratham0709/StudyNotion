import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form';

const ContactUsForm = () => {
    const [loading, setLoading] = useState(false);

    const {
        register,
        handleSubmit,
        reset,
        formState: {errors, isSubmitSuccessful}
        } = useForm();

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
    <form>

    </form>
  )
}

export default ContactUsForm