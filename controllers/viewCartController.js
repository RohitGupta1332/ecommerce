import {Cart} from "../models/cart.model.js";

export const viewCart = async(req, res) => {
    try{
        let cart = await Cart.find({userId: req.user.userId}).populate("products.productId");
        if(cart.length > 0){
            return res.json(cart);
        }
        res.status(404).json({message: "Cart is empty"});
    }
    catch(error){
        res.status(500).json({message: error.message});
    }
}