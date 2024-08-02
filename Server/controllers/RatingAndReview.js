const RatingAndReview = require("../models/RatingAndReview");
const Course = require("../models/Course");
const { mongo, default: mongoose } = require("mongoose");

// create Rating
exports.createRating = async (req,res) => {
    try{
        // get user id
        const userId = req.user.id;
        // fetch the data from req ki body
        const {rating, review, courseId} =  req.body;
        // console.log(userId);
        // console,log()
        //check if user is already enrolled or not 
        const courseDetails = await Course.findOne({_id:courseId,
                                    studentEnrolled: {$elemMatch: {$eq: userId}}
                            });
        if(!courseDetails){
            return res.status(404).json({
                success:false,
                message:"Student is enrolled in the course",
            })
        }

        // check if user is already reviewd or not 
        const alreadyReviewed = await RatingAndReview.findOne({
                                                    user:userId,
                                                    course:courseId
        })

        if(alreadyReviewed){
            return res.status(403).json({
                success:false,
                message:"Course is already reviewed by the user",
            })
        }
        
        //create rating and review
        const ratingReview = await RatingAndReview.create({
                                            rating, review,
                                            course:courseId,
                                            user:userId,
        })

        // update course with rating/review
        const updatedCourseDeatails = await Course.findByIdAndUpdate(
                                    {_id:courseId},
                                    {
                                        $push: {
                                            ratingAndReviews:ratingReview._id,
                                        }
                                    },
                                    {new:true}
        )
        console.log(updatedCourseDeatails);
        // return responce
        return res.status(200).json({
            success:true,
            message:"Rating and Review created Successfully",
            ratingReview,
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

//getAverage Rating
exports.getAverageRating = async (req,res) => {
    try{
        const courseId = req.body.courseId;

        const result = await RatingAndReview.aggregate([
            {
                $match:{
                    course: new mongoose.Types.ObjectId(courseId),
                },
            },
            {
                $group: {
                    _id:null,
                    averagerating: {$avg: "$rating"},
                }
            }
        ])

        // return rating
        if(result.length > 0){
            return res.status(200).json({
                success:true,
                averagerating:result[0].averagerating,
            })
        }

        //if no rating/review exist 
        return res.status(200).json({
            success:true,
            message:"Average rating is 0, and no rating is till now",
            averagerating:0,
        })
    }
    catch(error){
        return res.status(500).json({
            success:false,
            message:error.message,
        })
    }
}


// course id ke corressponding rating review lekar aane hai

//getAllRating
exports.getAllRating = async (req,res) => {
    try{
        const allreview = RatingAndReview.find({})
                                          .sort({rating: "desc"})
                                          .populate({
                                                path:"user",
                                                select:"firstName lastName email image",
                                          })
                                          .populate({
                                                path:"course",
                                                select:"courseName"
                                          })
                                          .exec();

        return res.status(200).json({
            success:true,
            message:"All review fetched successfully",
            data:allreview,
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


