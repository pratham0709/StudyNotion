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

        //if user aleready exit, then return a responce
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
    }
    catch(error){

    }
}

// signUp

//Login

//changePassword    