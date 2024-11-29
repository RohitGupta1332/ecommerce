import { Product } from "../models/product.model.js";

export const addProduct = async (req, res) => {
    try {
        let { name, price, description, image, category, brand, stock, expiry } = req.body;

        const product = await Product.create({
            name, price, description, image, category, brand, stock, expiry
        });
        console.log(product);
        if (product) {
            return res.status(201).json({ message: "Product added successfully" });
        }
        res.status(400).json({ message: "Failed to add product" });
    }
    catch (error) {
        res.status(500).json({ message: "Internal server error" , error: error.message});
    }
}