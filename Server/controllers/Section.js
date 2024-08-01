const Section = require("../models/Section");
const Course = require("../models/Course");

exports.createSection = async (req, res) => {
    try{
        // fetch data from res body
        const { sectionName, courseId } = req.body;

        // validation perform
        if(!sectionName || !courseId){
            return res.status(400).json({
                success:false,
                message:"Mising Properties",
            })
        }

        // create section
        const newSection = await Section.create({sectionName});

        // update course with section ObjectID
        const updatedCourseDetails = await Course.findByIdAndUpdate(
                                                courseId,
                                                {
                                                    $push: {
                                                        courseContent: newSection._id,
                                                    }
                                                },
                                                {new: true} // for updated Document
        )
        .populate({
            path: "courseContent",
            populate: {
                path: "subSection"
            }
        })
        .exec();

        //HW: Use Populate to replace section/sub-sections both in the updatedCourseDetails

        // return responce
        return res.status(200).json({
            success:true,
            message:"Section Created Successfully",
            updatedCourseDetails,
        })

    }
     catch(error){
        console.log(error);
        return res.status(500).json({
            success:false,
            message:"Unable to create section, please try again",
            error:error.message,
        })
     }
}


exports.updatedSection = async (req, res) => {
    try{
        // data input
        const {sectionName, sectionId} = req.body;

        // validate data
        if(!sectionName || !sectionId){
            return res.status(400).json({
                success:false,
                message:"Missing Properties",
            })
        }

        // update the data 
        const section = await Section.findByIdAndUpdate(sectionId, {sectionName}, {new:true});

        // return res
        return res.status(200).json({
            success:true,
            data:section,
            message:"Section Updated Successfully",
        })
    }
    catch(error){
        console.log(error);
        return res.status(500).json({
            success:false,
            message:"Unable to upadate section, please try again",
            error:error.message,
        })
    }
}

exports.deleteSection = async (req, res) => {
    try{
        // get ID - assume that we are sending id as params
        const {sectionId}  = req.params;
        
        // use findByIdandDelete
        await Section.findByIdAndDelete({sectionId});

        //TODO[Testing] : do we need to delete the entry from the course schema
        //return responce
        return res.status(200).json({
            success:tre,
            message:"Section Deleted Successfully",
        })
    }
    catch(error){
        console.log(error);
        return res.status(500).json({
            success:false,
            message:"Unable to delete section, please try again",
            error:error.message,
        })
    }
}