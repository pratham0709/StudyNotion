const User = require("../models/User");
const OTP = require("../models/OTP");
const otpGenerator = require("otp-generator"); 
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
        const otpBody = await OTP.create(otpPayload);
        console.log(otpBody);

        //return responce successfully
        res.status(200).json({
            success:true,
            message:"OTP Sent Successfully",
            otp,
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



// signUp

exports.signUp = async (req,res) => {
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
        if(!firstName || !lastName || !email || !password || !confirmPassword || !contactNumber){
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
                message:"User is alreday registered"
            });
        }

        //Find the most recent OTP stored for User
        const recentOtp = await OTP.find({email}).sort({createdAt:-1}).limit(1);
        
        // validate OTP
        if(recentOtp.length == 0){
            // return res
            return res.status(400).json({
                success:false,
                message:"OTP Not Found"
            })
        } else if(otp !== recentOtp.otp){
            return res.status(400).json({
                success:false,
                message:"Invalid OTP"
            })
        }

        // hash password
        const hashedPassword = await bcrypt.hash(password, 10);

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
            accountType,
            additionalDetails:profileDetails._id,
            image: `https://api.dicebear.com/5.x/initials/svg?seed=${firstName} ${lastName}`,
        })
        // return res
        return res.status(200).json({
            success:true,
            message:"User is registered Successfully",
            user,
        })
    }
    catch(error){
        console.log(error); 
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
                expiresIn:"2h",
            });

            user.token = token;
            user.password = undefined;

            //create cookie and send responce

            const options = {
                expiresIn: new Date(Date.now() + 3*24*60*60*1000),
                httpOnly:true,
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
        console.log(error);
        return res.status(500).json({
            success:false,
            message:"Login Failure, please try again",
        })
    }
}


//changePassword    

// TODO: Homework
exports.changePassword = async (req, res) => {
    // get data from req body
    // const {password, confirmPassword}
    // get oldPassword, newPassword, confirmNewPassword
    // validation

    //update password in DB
    // send mail - Password updated
    // return responce
}
