import React from 'react'

const learningGridArray = [
    {
        order: -1,
        heading: "Word-Class Learning for",
        highlightText: "Anyone, Anywhere",
        description:
            "Studynotion partners with more than 275+ leading universities and companies to bring flexible, affordable, job-relevant online learning to individuals and organizations worldwide.",
        BtnText: "Learn More",
        btnLink: "/",
    },
    {
        order: 1,
        heading: "Curriculum Based on Industry Needs",
        description:
            "Save time and money! The Belajar curriculum is made to be easier to understand and in line with industry needs.",
    },
    {
        order: 2,
        heading: "Our Learning Methods ",
        description:
            "Studynotion partners with more than 275+ leading universities and companies to bring",
    },
    {
        order: 3,
        heading: "Certification",
        description:
            "Studynotion partners with more than 275+ leading universities and companies to bring",
    },
    {
        order: 4,
        heading: `Rating "Auto-grading"`,
        description:
            "Studynotion partners with more than 275+ leading universities and companies to bring",
    },
    {
        order: 5,
        heading: "Ready to Work",
        description:
            "Studynotion partners with more than 275+ leading universities and companies to bring",
    }
]

const LearningGrid = () => {

  return (
    <div className='grid grid-cols-1 mx-auto mb-10 lg:grid-cols-4'>
    {
        learningGridArray.map((card, index) => (
            <div
                className=''
                key={index}
            >

            </div>
        ))
    }

    </div>
  )
}

export default LearningGrid