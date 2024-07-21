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

    }
    catch(error){
        return res.status(400).json({
            success:false,
            message:"Something went wrong while validating token",
        })
    }
}