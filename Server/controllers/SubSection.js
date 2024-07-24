const Section = require("../models/Section");
const SubSection = require("../models/SubSection");
const { updatedSection } = require("./Section");

exports.createSubSection = async (req,res) => {
    try{
        //fetch the data from req ki body
        const {sectionId, title, timeDuration, description, videoUrl} = req.body;
        
        //extract fike/video
        const video = req.files.videoFile;

        //validation
        if(!sectionId || !title || !timeDuration || !description || !videoUrl){
            return res.status(400).json({
                success:false,
                message:"All Fields are required",
            })
        }

        // upload video to cloudinary 
        const uploadDetails = await uploadImageToCloudinary(video, process.env.FOLDER_NAME);

        // create sub-section
        const subSectionDetails = await SubSection.create({
            title:title,
            timeDuration:timeDuration,
            description:description,
            videoUrl:uploadDetails.secure_url,
        })

        //update section with this sub-section objectId
        const updatedSection = await Section.findByIdAndUpdate({_id:sectionId},
                                                            {
                                                                $push:{
                                                                    subSection:subSectionDetails._id,
                                                                }
                                                            },
                                                            {new:true}
        );
        // HW: log updated section here, after adding the populate query
        //return responce
        return res.status(200).json({
            success:true,
            message:"Sub Section Created Successfully",
            updatedSection,
        });
    }

    catch(error){
        return res.status(500).json({
            success:false,
            message:"Internal Server Error",
            updatedSection,
        })
    }
}

// HW: UpdatesubSection

//HW: deletesubsection 