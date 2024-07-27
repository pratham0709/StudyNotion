const mongoose = require("mongoose");

const courseSchema = new mongoose.Schema({
    courseName: {
        type:String,
        trim:true
    },
    courseDescription: {
        type:String,
    },
    instructor: {
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref: "User"
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
        // required:true
    },
    tag: {
        type:[String],
        ref:"Tag",
        required:true,
    },
    category: {
		type: mongoose.Schema.Types.ObjectId,
		// required: true,
		ref: "Category",
	},
    studentEnrolled: [{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:"User",
    }]
})

module.exports = mongoose.model("Course", courseSchema);