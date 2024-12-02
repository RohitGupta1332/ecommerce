import {Product} from "../models/product.model.js";

export const categoryProduct = async (req, res) => {
    try{
        let category = req.params.category;
        let categoryProduct = await Product.find({category});
        if(categoryProduct){
            return res.status(200).json({products: categoryProduct});
        }
        res.status(404).json({message: "No product found for this category"});
    }
    catch(error){
        res.status(500).json({message: error.message})
    }
}