import React from 'react'
import ContactUsForm from '../ContactPage/ContactUsForm'

const ContactFormSection = () => {
  return (
    <div className='flex flex-col gap-4'>
        <h1 className='flex items-center justify-center text-4xl font-semibold text-richblack-5 font-inter'>
        Get in Touch</h1>
        <p className='flex items-center justify-center text-base font-medium font-inter text-richblack-300'>
            We'd love to here for you, Please fill out this form.
        </p>

        <div className='mt-6'>
            <ContactUsForm />
        </div>
    </div>
  )
}

export default ContactFormSection