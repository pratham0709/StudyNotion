const Category = require("../models/Category");

// tag handler
exports.createCategory = async (req,res) => {
    try{
        // fetch the data from req body 
        const {name, description } = req.body;

        // validation 
        if(!name){
            return res.status(400).json({
                success:false,
                message:"All Fields are required",
            })
        }

        // create entry in db
        const CategorysDetails = await Category.create({
            name:name,
            description:description,
        })
        console.log(CategorysDetails);

        // return responce
        return res.status(200).json({
            success:true,
            message:"Category created Successfully",
        })
    }
    catch(error){
        return res.status(500).json({
            success:false,
            message:error.message,
        })
    }
}


// get all tag

exports.showAllCategories = async (req,res) => {
    try{
        const allCategories = await Category.find({}, {name:true, description:true})
        return res.status(200).json({
            success:true,
            data:allCategories,
            message:"All Categories returned Successfully",
        })
    }
    catch(error){
        return res.status(500).json({
            success:false,
            message:error.message,
        })
    }
}


// categoryPageDetails

exports.categoryPageDetails = async (req, res) => {
    try{
        // get categoryId
        const categoryId = req.body;
        //get courses for specified category id
        const selectedCategory = await Category.findById(categoryId)
                                                        .populate("courses").exec();
        // validation
        if(!selectedCategory){
            return res.status(404).json({
                success:false,
                message:"Data Not Found",
            })
        }
        // get courses for different category

        const differentCategories = await Category.find({
                                            _id:{$ne: categoryId}
                                            })
                                            .populate("courses").exec();
        console.log(differentCategories);
        //get top selling courses
        // HW: --> How to write it on own

        // return responce
        return res.status(200).json({
            success:true,
            data: {
                selectedCategory,
                differentCategories
            },
        });
    }   
    catch(error){
        console.log(error);
        return res.status(500).json({
            success:false,
            message:error.message,
        })
    }
}