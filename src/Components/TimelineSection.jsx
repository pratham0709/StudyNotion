import React from 'react'
import Logo1 from '../assets/TimeLineLogo/Logo1.svg'
import Logo2 from '../assets/TimeLineLogo/Logo2.svg'
import Logo3 from '../assets/TimeLineLogo/Logo3.svg'
import Logo4 from '../assets/TimeLineLogo/Logo4.svg'
import timelineImage from '../assets/Images/TimelineImage.png'

const timeline = [
    {
        Logo:Logo1,
        heading: "Leadership",
        Description: "Fully committed to the success company",
    },
    {
      Logo:Logo2,
      heading: "Responsibility",
      Description: "Students will always be our top priority",
    },
    {
      Logo:Logo3,
      heading: "Flexibility",
      Description: "The ability to switch is an important skills",
    },
    {
      Logo:Logo4,
      heading: "Solve the problem",
      Description: "Code your way to a solution",
    },
]

const TimelineSection = () => {
  return (
    <div>
        <div className='flex flex-row gap-15 items-center'>

          <div className='w-[45%] flex flex-col gap-5 '>
            {
              timeline.map( (element, index) => { 
                  return (
                    <div className='flex flex-row gap-6' key={index}>
                        <div className='w-[50px] h-[50px] bg-white flex items-center'>
                          <img src={element.Logo} />
                        </div>

                        <div>
                          <h2 className='font-semibold text-[18px]'>{element.heading}</h2>
                          <p className='text-base'>{element.Description}</p>
                        </div>

                    </div>
                  )
              })
            }
          </div>

          <div className='relative shadow-blue-200'>
            <img src={timelineImage} 
              alt='TimelineImage' 
              className=' object-cover h-fit shadow-[0_35px_60px_-15px_rgba(0,0,0,0.3)]'
            />
          </div>
        </div>
    </div>
  )
}

export default TimelineSection