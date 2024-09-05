import React from 'react'
import HighlightText from '../components/core/HomePage/HighlightText'
import BannerImg1 from '../assets/Images/aboutus1.webp'
import BannerImg2 from '../assets/Images/aboutus2.webp'
import BannerImg3 from '../assets/Images/aboutus3.webp'
import Quate from '../components/core/AboutPage/Quate'
import FoundingStory from '../assets/Images/FoundingStory.png'
import StatsComponents from '../components/core/AboutPage/StatsComponents'
import LearningGrid from '../components/core/AboutPage/LearningGrid'
import ContactFormSection from '../components/core/AboutPage/ContactFormSection'

const About = () => {
  return (
    <div className='mt-[100px] text-white w-11/12 max-w-maxContent mx-auto'>
        {/* Section 1 */}
        <section>
            <div>
                <header>Driving Innovation in Online Education for a 
                    <HighlightText text={"Brighter Future"} />

                    <p>Studynotion is at the forefront of driving innovation in online education. We're passionate about creating a brighter future by offering cutting-edge courses, leveraging emerging technologies, and nurturing a vibrant learning community.</p>
                </header>

                <div className='flex mx-auto gap-x-3'>
                    <img 
                        src={BannerImg1}
                    />

                    <img 
                        src={BannerImg2}
                    />

                    <img 
                        src={BannerImg3}
                    />
                </div>
            </div>
        </section>

        {/* Section 2 */}
        <section>
            <div>
                <Quate />
            </div>

        </section>

        {/* Section 3  */}
        <section className='flex flex-col'>
            <div>
                {/* Founding story wala div  */}
                <div className='flex '>
                    {/* FoundingStory left box */}
                    <div>
                        <h1>Our Founding Story</h1>
                        <p>Our e-learning platform was born out of a shared vision and passion for transforming education. It all began with a group of educators, technologists, and lifelong learners who recognized the need for accessible, flexible, and high-quality learning opportunities in a rapidly evolving digital world.</p>
                        <p>As experienced educators ourselves, we witnessed firsthand the limitations and challenges of traditional education systems. We believed that education should not be confined to the walls of a classroom or restricted by geographical boundaries. We envisioned a platform that could bridge these gaps and empower individuals from all walks of life to unlock their full potential.</p>
                    </div>

                    {/* FoundingStory Right box  */}
                    <div>
                        <img src={FoundingStory} />
                    </div>
                </div>

                {/* Vision and mission wala parent div  */}

                <div className='flex'>

                    {/* left wala box */}
                    <div>
                        <h1>Our Vision</h1>
                        <p>With this vision in mind, we set out on a journey to create an e-learning platform that would revolutionize the way people learn. Our team of dedicated experts worked tirelessly to develop a robust and intuitive platform that combines cutting-edge technology with engaging content, fostering a dynamic and interactive learning experience.</p>
                    </div>

                    {/* Right wala Div */}

                    <div>
                        <h1>Our Mission</h1>
                        <p>Our mission goes beyond just delivering courses online. We wanted to create a vibrant community of learners, where individuals can connect, collaborate, and learn from one another. We believe that knowledge thrives in an environment of sharing and dialogue, and we foster this spirit of collaboration through forums, live sessions, and networking opportunities.</p>
                    </div>
                </div>
            </div>
        </section>

        {/* Section 4 */}
        <StatsComponents />

        {/* Section 5 */}
        <section className='flex flex-col items-center justify-between gap-5 mx-auto'>
            <LearningGrid />
            <ContactFormSection />
        </section>
    </div>
  )
}

export default About