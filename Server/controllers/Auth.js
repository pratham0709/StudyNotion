const User = require("../models/User");
const OTP = require("../models/OTP");
const jwt = require("jsonwebtoken");
const otpGenerator = require("otp-generator");
const mailSender = require("../utils/mailSender");
const { passwordUpdated } = require("../mail/templates/passwordUpdate");
const Profile = require("../models/Profile"); 
const bcrypt = require("bcrypt");
require("dotenv").config();

//sendOTP

exports.sendOTP = async (req,res) => {
    try{
        // fetch email from request body
        const {email} = req.body;

        // check user is already present
        const checkUserPresent = await User.findOne({email});

        //if user aleready exist, then return a responce
        if(checkUserPresent){
            return res.status(401).json({
                success:false,
                message:"User is already registered",
            })
        }

        //generate OTP
        // This code generates a 6-digit OTP (One-Time Password) using the otpGenerator library.
        // The options specify that the OTP should only contain numeric digits (no uppercase letters, lowercase letters, or special characters).
        var otp = otpGenerator.generate(6, {
            upperCaseAlphabets:false,
            lowerCaseAlphabets:false,
            specialChars:false,
        });
        console.log("OTP Generated", otp);
        

        // The code checks if the generated OTP already exists in the database (OTP collection).
        // If the OTP exists (result is not null), it generates a new OTP and checks again.
        // This loop ensures that the OTP is unique and not already in use.
        let result = await OTP.findOne({otp: otp});
        
        while(result){
            otp = otpGenerator(6, {
                upperCaseAlphabets:false,
                lowerCaseAlphabets:false,
                specialChars:false,
            });
            result = await OTP.findOne({otp: otp});
        }

        const otpPayload = {email, otp};

        // create an entry for OTP
        //.create method means => save
        const otpBody = await OTP.create(otpPayload);
        console.log("OTP Body", otpBody);

        //return responce successfully
        res.status(200).json({
            success:true,
            message:"OTP Sent Successfully",
            otp,
        })
    }
    catch(error){
        console.log(error.message);
        return res.status(500).json({
            success:false,
            message:error.message,
        })
    }
}



// signUp

exports.signup = async (req,res) => {
    try{
        // data fetch from req ki body 
        const {
            firstName,
            lastName,
            email,
            password,
            confirmPassword,
            accountType,
            contactNumber,
            otp,
        } = req.body;

        // validation krlo
        if(!firstName || !lastName || !email || !password || !confirmPassword || !otp){
            return res.status(403).json({
                success: false,
                message:"All fields are required"
            })
        }

        // 2 password match krlo
        if(password !== confirmPassword){
            return res.status(400).json({
              success:false,
              message:"Password and ConfirmPassword Value does not match, please try again",  
            })
        }

        // check user is already exist or not
        const existingUser = await User.findOne({email});

        if(existingUser){
            return res.status(400).json({
                success:false,
                message:"User is alreday registered. Please sign in to continue."
            });
        }

        //Find the most recent OTP stored for User
        const recentOtp = await OTP.find({email}).sort({createdAt:-1}).limit(1);
        console.log(recentOtp);
        // validate OTP
        if(recentOtp.length == 0){
            // return res
            return res.status(400).json({
                success:false,
                message:"OTP Not Found"
            })
        } else if(otp !== recentOtp[0].otp){
            return res.status(400).json({
                success:false,
                message:"Invalid OTP"
            })
        }

        // hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // create the user 
        let approved =  "";
        approved === "Instructor" ? (approved = false) : (approved = true);

        //create entry in db

        const profileDetails = await Profile.create({
            gender:null,
            dateOfBirth:null,
            about:null,
            contactNumber:null,
        })

        const user = await User.create({
            firstName,
            lastName,
            email,
            contactNumber,
            password:hashedPassword,
            accountType: accountType,
            approved:approved,
            additionalDetails:profileDetails._id,
            image: `https://api.dicebear.com/5.x/initials/svg?seed=${firstName} ${lastName}`,
        })
        // return res
        return res.status(200).json({
            success:true,
            user,
            message:"User registered Successfully",
        })
    }
    catch(error){
        console.error(error); 
        return res.status(500).json({
            success:false,
            message:"User cannot be registered. Please try again"
        })
    }
    
}


//Login
exports.login = async (req,res) => {
    try{    
        // get data from req ki body
        const {email, password} = req.body;

        //validation data
        if(!email || !password){
            return res.status(403).json({
                success:false,
                message:"All fields required, please try again",
            })
        }
        
        //user check exist or not
        const user = await User.findOne({email}).populate("additionalDetails");
        if(!user){
            return res.status(400).json({
                success:false,
                message:"User is not registered, please signup first",
            })
        }
        
        //generate JWT Token, after matching password
        if(await bcrypt.compare(password, user.password)){
            const payload = {
                email: user.email,
                id: user._id,
                accountType: user.accountType,
            }

            const token = jwt.sign(payload, process.env.JWT_SECRET, {
                expiresIn:"24h",
            });

            user.token = token;
            user.password = undefined;

            //create cookie and send responce

            const options = {
                expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
				httpOnly: true,
            }

            res.cookie("token", token, options).status(200).json({
                success:true,
                token,
                user,
                message:"Logged in Successfully",
            })

        }
        else{
            return res.status(401).json({
                success:false,
                message:"Password is incorrect",
            })
        }
       

    }
    catch(error){
        console.error(error);
        return res.status(500).json({
            success:false,
            message:"Login Failure, please try again",
        })
    }
}


//changePassword    

// TODO: Homework
exports.changePassword = async (req, res) => {
    try{
        // get data from req body
    const userDetails = await User.findById(req.user.id);
    
    // get oldPassword, newPassword, confirmNewPassword
    const {oldPassword, newPassword, confirmPassword} = req.body;

    // const {password, confirmPassword}
    const isPasswordMatch = await bcrypt.compare(
        oldPassword,
        userDetails.password,
    );

    if(!isPasswordMatch){
        return res.status(400).json({
            success:false,
            message:"The Passeord is incorrect",
        })
    }

    // validation
    if(newPassword !== confirmPassword){
        return res.status(401).json({
            success:false,
            message:"The Password and confirm Password does not match",
        })
    }
    //update password in DB
    const encryptedPassword = await bcrypt.hash(newPassword, 10);
    const updatedUserDetails = await User.findByIdAndUpdate(
        req.user.id,
        {password: encryptedPassword},
        {new:true},
    );
    
    // send mail - Password updated
    try{
        const emailResopnce = await mailSender(
            updatedUserDetails.email,
            passwordUpdated(
                updatedUserDetails.email,
                `Password Updated Sucessfully for ${updatedUserDetails.firstName} ${updatedUserDetails.lastName}`
            )
        );
        console.log("Email Sent successfully:", emailResopnce.response);
    }
    catch(error){
        console.error("Error occured while sending email:", error);
        return res.status(500).json({
            success:false,
            message: "Error occurred while seding email:",
            error:error.message,  
        });
    }
    // return responce
    return res
			.status(200)
			.json({ success: true, message: "Password updated successfully" });
    }
    catch(error){
        console.error("Error occurred while updating password:", error);
		return res.status(500).json({
			success: false,
			message: "Error occurred while updating password",
			error: error.message,
		});
    }    
}
