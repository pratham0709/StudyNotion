const mongoose = require("mongoose");

const courseSchema = new mongoose.Schema({
    courseName: {
        type:String,
        trim:true
    },
    courseDescription: {
        type:String,
        trim:true
    },
    Instructor: {
        type:mongoose.Schema.Types.ObjectId,
        ref: "User",
        required:true
    },
    whatYouWillLearn: {
        type:String,
    },
    courseContent: [
        {
            type:mongoose.Schema.Types.ObjectId,
            ref: "Section"
        }
    ],
    ratingAndReviews :[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"RatingAndReview", 
        }
    ],
    price: {
        type:Number,
    },
    thumbnails: {
        type:String,
        required:true
    },
    tag: {
        type:mongoose.Schema.Types.ObjectId,
        ref:"Tag",
        required:true,
    },
    studentEnrolled: [{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:"User",
    }]
})

module.exports = mongoose.model("Course", courseSchema);