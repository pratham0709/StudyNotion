const Profile = require("../models/Profile");
const User = require("../models/User");

exports.updateProfile = async (req, res) => {
    try{
        // get data
        const {dateOfBirth="", about="", contactNumber, gender} = req.body;
        // get userId
        const id = req.user.id;
        //validation
        if(!contactNumber || !gender || !id){
            return res.status(400).json({
                success:false,
                message:"All fields are required",
            })
        }
        // find the profile
        const userDetails = await User.findById(id);
        const profileId = userDetails.additionalDetails;
        const profileDetails = await Profile.findById(profileId);

        // update the profile
        profileDetails.dateOfBirth = dateOfBirth;
        profileDetails.about = about;
        profileDetails.contactNumber = contactNumber;
        profileDetails.gender = gender;
        await profileDetails.save();


        // return responce
        return res.status(200).json({
            success:true,
            message:"Profile Updated Successfully",
            profileDetails,
        })
    }
    catch(error){
        return res.status(500).json({
            success:false,
            error:error.message,
        });
    }
};



// delete Account
// Explore -> how can we schedule the deletion of chrone job


exports.deleteAccount = async (req,res) => {
    try{
        // get id
        const id = req.user.id;
        // validation
        const userDetails = await User.findById(id);
        if(!userDetails){
            return res.status(400).json({
                success:false,
                message:"User not found",
            })
        }

        // delete profile
        await Profile.findByIdAndDelete({_id:userDetails.additionalDetails});
        
        // TODO: HW uneroll user from all enrolled courses
        //delete user
        await User.findByIdAndDelete({_id:id});

        // return responce
        return res.status(200).json({
            success:true,
            message:"User Deleted Successfully",
        })
    }
    catch(error){
        return res.status(500).json({
            success:false,
            message:"User cannot be deleted Successfully",
        });
    }
};

exports.getAllUserDetails = async (req, res) => {
    try{
        // get id
        const id = req.user.id;

        //validation and get user details
        const userDetails = await User.findById(id).populate("additionalDetails").exec();

        return res.status(200).json({
            success:true,
            message:error.message,
        })
    }
    catch(error){
        return res.status(500).json({
            success:false,
            message:error.message,
        });
    }
}