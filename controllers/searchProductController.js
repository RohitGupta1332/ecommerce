import {Product} from "../models/product.model.js"

export const searchProduct = async (req, res) => {
    try{
        const query = req.query.query;
        const regex = new RegExp(query, 'i');
        const products = await Product.find({name: regex});
        res.status(200).json(products);
    }
    catch(error){
        res.status(500).json({message: error.message});
    }
}