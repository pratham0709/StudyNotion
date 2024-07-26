const {instance} = require("../config/razorpay");
const Course = require("../models/Course");
const User = require("../models/User");
const mailSender = require("../utils/mailSender");
const courseEnrollmentEmail = require("../mail/templates/courseEnrollmentEmail");
const { default: mongoose } = require("mongoose"); 

//capture the payment and initiate the razorpay clone
exports.capturePayment = async (req,res) => {
        //get courseId and UserId
        const {course_id} = req.body;
        const {userId} = req.user.id;

        //validation
        //valid courseId
        if(!course_id){
            return res.json({
                success:false,
                message:"Please Provide Valid Course ID",
            })
        };

        //valid courseDetails
        let course;
        try{
            course = await Course.findById(course_id);
            if(!course){
                return res.json({
                    success:false,
                    message:"Could not find the course",
                });
            }
            // user already pay for same course
            const uid = new mongoose.Types.ObjectId(userId);
            if(course.studentEnrolled.includes(uid)){
                return res.status(400).json({
                    success:false,
                    message:"Student is already enrolled",
                })
            }
        }
        catch(error){
            console.error(error);
            return res.status(500).json({
                success:false,
                message:error.message,
            });
        }

        //order create
        const amount = course.price;
        const currency = "INR";
        
        const options = {
            amount: amount * 100,
            currency,
            receipt: Math.random(Date.now()).toString(),
            notes: {
                courseId: course_id,
                userId,
            }
        }

        try{
            // initiate the payment using razorpay
            const paymentResponce = await instance.orders.create(options);
            console.log(paymentResponce);
            
            //return responce
            return res.status(200).json({
                success:true,
                courseName:course.courseName,
                courseDescription:course.courseDescription,
                thumbnail:course.thumbnail,
                orderId:paymentResponce.id,
                currency:paymentResponce.currency,
                amount:paymentResponce.amount,
            })
        }
        catch(error){
            console.log(error);
            res.json({
                success:false,
                message:"could not initiate order",
            });
        }
    }


// verify signature
exports.verifySignature = async (req,res) => {
    const webhookSecret = "12345678";

    const signature = req.headers["x-razorpay-signature"];

    const shasum = crypto.createHmac("sha256", webhookSecret);
    shasum.update(JSON.stringify(req.body));
    const digest = shasum.digest("hex");

    if(signature === digest){
        console.log("Payment is Authorised");

        const {courseId, userId} = req.body.payload.payment.entity.notes;

        try{
            // full fil the action

            //find the course and enrolled the student in it
            const enrolledCourse = await Course.findOneAndUpdate(
                                                {_id:courseId},
                                                {$push:{studentEnrolled:userId}},
                                                {new:true},
            )

            if(!enrolledCourse){
                return res.status(500).json({
                    success:false,
                    message:'Course not Found',
                });
            }

            console.log(enrolledCourse);

            //find the student and add the course to their list of enrolled course me
            const enrolledStudent = await User.findOneAndUpdate(
                                                {_id:userId},
                                                {$push:{courses:courseId}},
                                                {new:true}
            );
            console.log(enrolledStudent);

            // amil send krna hai confirmation wala
            const emailResponce = await mailSender(
                                        enrolledStudent.email,
                                        "Congratulation from CodeWithPratham",
                                        "Congratulations, you are onboarded into new CodeHelp Course"
            );
            console.log(emailResponce);
            return res.status(200).json({
                success:true,
                message:"Signature Verifed and Course Added"
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

    else{
        return res.status(400).json({
            success:false,
            message:"Could not find the Course",
        })
    }
} 