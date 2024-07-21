const jwt = require("jsonwebtoken");
require("dotenv").config();
const User = require("../models/User");


exports.auth = async (req, res, next) => {
    try{
        // extract token
        const token = req.cookies.token 
                    || req.body.token
                    || req.header("Authorisation").replace("Bearer ", "");

        // if token is missing 
        if(!token){
            return res.status(401).json({
                success:false,
                message:"Token is missing"
            })
        }
        

        // verify the token
        try{
            const decode = jwt.verify(token, process.env.JWT_SECRECT);
            console.log(decode);
            req.user = decode;
        }
        catch(error){
            return res.status(401).json({
                success:false,
                message:"token is invalid",
            })
        }
        next();
    }
    catch(error){
        return res.status(400).json({
            success:false,
            message:"Something went wrong while validating the token",
        })
    }
}

//is Student
exports.isStudent = async (req,res, next) => {
    try{
        if(req.user.accountType !== "Student"){
            return res.status(401).json({
                success:false,
                message:"This is Protected Route for student only",
            })
        }
        next();
    }
    catch(error){
        return res.status(500).json({
            success:false,
            message:"User role cannot be verified, please try again",
        })
    }
}

// isInstructor
exports.isInstructor = async (req,res, next) => {
    try{
        if(req.user.accountType !== "Instructor"){
            return res.status(401).json({
                success:false,
                message:"This is Protected Route for instructor only",
            })
        }
        next();
    }
    catch(error){
        return res.status(500).json({
            success:false,
            message:"User role cannot be verified, please try again",
        })
    }
}

// isAdmin

exports.isAdmin = async (req, res, next) => {
    try{
        if(req.user.accountType !== "Admin"){
            return res.status(401).json({
                success:false,
                message:"This is Protected Route for Admin only"
            })
        }
        next();
    }
    catch(error){
        return res.status(500).json({
            success:false,
            message:"User role cannot be verified, please try again",
        })
    }
}