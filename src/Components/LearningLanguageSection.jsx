import React from 'react'
import HighlightText from './Core/HomePage/HighlightText'
import know_more_progress from '../assets/Images/Know_your_progress.svg'
import compare_with_others from '../assets/Images/Compare_with_others.svg'
import plan_your_lessons from '../assets/Images/Plan_your_lessons.svg'
import CTAButton from './Core/HomePage/Button'

const LearningLanguageSection = () => {
  return (
    <div className='mt-[130px] mb-32'>
        <div className='flex flex-col gap-5 items-center'>
            <div className='text-4xl font-semibold'>
              Your Swiss Knife for 
              <HighlightText text={"learning any language"} />
            </div>

            <div className='text-center text-richblack-600 mx-auto text-base font-medium w-[70%]'>
            Using spin making learning multiple languages easy. with 20+ languages realistic voice-over, 
            progress tracking, custom schedule and more.
            </div>

            <div className='flex flex-row items-center justify-center'>
              <img 
                src={know_more_progress}
                alt='know_more_progressImage'
                className='object-contain -mr-32'
              />

              <img 
                src={compare_with_others}
                alt='compare_with_othersImage'
                className='object-contain'
              />

               <img 
                src={plan_your_lessons}
                alt='plan_your_lessonsImage'
                className='object-contain -ml-36'
              />
            </div>

            <div>
               <CTAButton active={true} linkto={"/signup"}>
                  <div>
                    Learn More
                  </div>
               </CTAButton>
            </div>
        </div>
    </div>
  ) 
}
  
export default LearningLanguageSection