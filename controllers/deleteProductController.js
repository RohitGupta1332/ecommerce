import { Product } from "../models/product.model.js";

export const deleteProduct = async (req, res) => {
    try{
        let product = await Product.deleteOne({_id: req.body.id});
        if(product){
            return res.status(200).json({message: "Product deleted successfully"});
        }
        return res.status(400).json({message: "Product not found"});
    }
    catch(error){
        res.status(500).json({message: "Internal server error", error: error.message});
    }
}