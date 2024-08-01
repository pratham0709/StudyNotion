// const category = require("../models/Category");
const User = require("../models/User");
const Course = require("../models/Course");
const { uploadImageToCloudinary } = require("../utils/imageUploader");
const Category = require("../models/Category");
// const { response } = require("express");


//createCourse handler function
exports.createCourse = async (req,res) => {
    try{
        // fetch data
        const userId = req.user.id;
        let {courseName, courseDescription, 
            whatYouWillLearn, price, tag, category, status, instructions} = req.body;

        // get the thumbnail
        const thumbnail = req.files.thumbnailImage;

        // validation 
        if(!courseName || 
           !courseDescription || 
           !whatYouWillLearn || 
           !price || 
           !tag ||
           !thumbnail ||
           !category){
            return res.status(400).json({
                success:false,
                message:"All fields are required",
            })
        }

        if(!status || status === undefined){
            status = "Draft";
        }

        // check for Instructor
        // const userId = req.user.id;
        const instructorDetails = await User.findById(userId, {
            accountType: "Instructor",
        });
        console.log("Instructor Details: " , instructorDetails);
        //TODO: verify that userID and instructorDetails._id are same or different ?


        if(!instructorDetails){
            return res.status(401).json({
                success:false,
                message:"Instructor Details not found",
            })
        }

        const categoryDetails = await Category.findById(category);

        if(!categoryDetails){
            return res.status(404).json({
                success:false,
                message:"Category Details are not found",
            })
        }

        // upload image to cloudinary
        const thumbnailImage =await uploadImageToCloudinary(
            thumbnail, process.env.FOLDER_NAME);
        
        console.log(thumbnailImage);

        // create an entry for new course
        const newCourse = await Course.create({
            courseName,
            courseDescription,
            instructor: instructorDetails._id,
            whatYouWillLearn: whatYouWillLearn,
            price,
            tag:tag,
            category:categoryDetails._id,
            thumbnail:thumbnailImage.secure_url,
            status:status,
            instructions: instructions,
        });

        //add the new course to the user schema for Instructor
        await User.findByIdAndUpdate(
            {_id:instructorDetails._id},
            {
                $push: {
                    courses: newCourse._id,
                }   
            },
            {new:true},
        );
        
        // update the TAG ka schema
        await Category.findByIdAndUpdate(
            {_id: category},
            {
                $push: {
                    course: newCourse._id,
                }
            },
            {new: true}
        )
        // TODO HW

        // return response
        return res.status(200).json({
            success:true,
            data:newCourse,
            message:"Course created Successfully",
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
        const allCourses = await Course.find(
            {},
            {
                courseName:true,
                price:true,
                thumbnail:true,
                ratingAndReviews:true,
                instructor:true,
                studentEnrolled:true, 
            }
        ).populate("instructor").exec();
                    
        return res.status(200).json({
            success:true,
            message:"Data for All courses fetched successfully",
            data:allCourses,
        })
    }
    catch(error){
        console.log(error);
        res.status(404).json({
            success:false,
            message:"Cannot Fetch course data",
            error:error.message,
        })
    }
}

exports.getCourseDetails = async (req,res) => {
    try{
        const {courseId} = req.body;

        const courseDetails = await Course.find(
                                                {_id:courseId})
                                                .populate(
                                                 {
                                                    path:"instructor",
                                                    populate:{
                                                        path:"additionalDetails"
                                                    }
                                                 }
                                                )
                                                .populate("category")
                                                .populate("ratingAndReviews")
                                                .populate(
                                                    {
                                                        path:"courseContent",
                                                        populate:{
                                                            path:"subSection"
                                                        },
                                                    }
                                                )
                                                .exec();

        // validation
        if(!courseDetails){
            return res.status(500).json({
                success:false,
                message: `Could not find the course with ${courseId}`
            })
        }

        // return responce
        return res.status(200).json({
            success:true,
            message:"Course Details fetched Successfully",
            data:courseDetails
        })
    }
    catch(error){
        console.log(error);
        return res.status(500).json({
            success:false,
            message:error.message,
        })
    }
}