const User = require("../models/User");
const OTP = require("../models/OTP");
const otpGenerator = require("otp-generator"); 
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
        var otp = otpGenerator.generate(6, {
            upperCaseAlphabets:false,
            lowerCaseAlphabets:false,
            specialChars:false,
        });
        console.log("OTP Generated", otp);
        
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
        
        // validate OTP

        // hash password

        //create entry in db

        // return res
    }
    catch(error){

    }
}


//Login

//changePassword    