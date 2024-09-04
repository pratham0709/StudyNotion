import React from 'react'
import HighlightText from '../HomePage/HighlightText'

const Quate = () => {
  return (
    <div>
        We are passionate about revolutionizing the way we learn. Our innovative platform
        <HighlightText text={"combines technology"} />,
        <span className='font-bold text-transparent bg-clip-text bg-gradient-to-t from-[#FF512F]  to-[#F09819] animate-gradient'>
            {" "}
            expertise
        </span>
        , and community to create an 
        <span className='font-bold text-transparent bg-clip-text bg-gradient-to-t from-[#E65C00]  to-[#F9D423] animate-gradient'>
            {" "}
            unparalleled educational experience.
        </span>
        
    </div>
  )
}

export default Quate