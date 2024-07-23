const Tag = require("../models/tags");
const User = require("../models/User");
const Course = require("../models/Course")


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

        // create an entry in db
        const newCourse = await Course.create({
            courseName,
            courseDescription,
            instructor: instructorDetails._id,
        })
    }
    catch(error){

    }
}