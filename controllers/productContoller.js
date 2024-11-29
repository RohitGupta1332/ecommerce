import {Product} from "../models/product.model.js";

export const viewProduct = async(req, res) => {
    try{
        const products = await Product.find();
        if(products){
            res.status(404).json({message: "No product available"});
        }
        res.status.json({products: products});
    }
    catch(error){
        res.status(500).json({message: "Internal server error"});
    }
}