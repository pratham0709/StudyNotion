const Tag = require("../models/tags");
const User = require("../models/User");
const Course = require("../models/Course");
// const { response } = require("express");


//createCourse handler function
exports.createCourse = async (req,res) => {
    try{
        // fetch data
        const {courseName, courseDescription, whatYouWillLearn, price, tag} = req.body;

        // get the thumbnail
        const thumbnail = req.files.thumbnailImage;

        // validation 
        if(!courseName || !courseDescription || !whatYouWillLearn || !price || !tag){
            return res.status(400).json({
                success:false,
                message:"All fields are required",
            })
        }

        // check for Instructor
        const userId = req.user.id;
        const instructorDetails = await User.findById(userId);
        console.log("Instructor Details: " , instructorDetails);
        //TODO: verify that userID and instructorDetails._id are same or different ?


        if(!instructorDetails){
            return res.status(401).json({
                success:false,
                message:"Instructor Details not found",
            })
        }

        const tagDetails = await Tag.findById(tag);

        if(!tagDetails){
            return res.status(401).json({
                success:false,
                message:"Tags Details are not found",
            })
        }

        // upload image to cloudinary
        const thumbnailImage =await uploadImageToCloudinary(thumbnail, process.env.FOLDER_NAME); 

        // create an entry for new course
        const newCourse = await Course.create({
            courseName,
            courseDescription,
            instructor: instructorDetails._id,
            whatYouWillLearn: whatYouWillLearn,
            price,
            tag:tagDetails,
            thumbnail:thumbnailImage.secure_url,
        })

        //add the new course to the user schema for Instructor
        await User.findByIdAndUpdate(
            {id:instructorDetails._id},
            {
                $push: {
                    courses: newCourse._id,
                }   
            },
            {new:true},
        );
        
        // update the TAG ka schema
        // TODO HW

        // return response
        return res.status(200).json({
            success:true,
            message:"Course created Successfully",
            data:newCourse,
        });

    }
    catch(error){
        console.log(error);
        return res.status(500).json({
            success:false,
            message:"Failed to create course",
            error:error.message
        })
    }
}



// getAllCourses handler function

exports.showAllCourses = async (req,res) => {
    try{
       // TODO: change the below statement increamentally
        const allCourses = await Course.find({});


        // const allCourses = await Course.find({}, {courseName:true,
        //                                           price:true,
        //                                           thumbnail:true,
        //                                           ratingAndReviews:true,
        //                                           instructor:true,
        //                                           studentEnrolled:true, }).populate("instructor").exec();
        
        return res.status(200).json({
            success:true,
            message:"Data for All courses fetched successfully",
            data:allCourses,
        })
    }
    catch(error){
        console.log(error);
        res.status(500).json({
            success:false,
            message:"Cannot Fetch course data",
            error:error.message,
        })
    }
}