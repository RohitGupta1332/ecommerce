import { Cart } from "../models/cart.model.js";

export const addToCart = async (req, res) => {
    try {
        const { productId, quantity } = req.body;

        if (!productId || !quantity) {
            return res.status(400).json({ message: "Product ID and quantity are required" });
        }

        const parsedQuantity = Number(quantity);
        if (isNaN(parsedQuantity) || parsedQuantity <= 0) {
            return res.status(400).json({ message: "Invalid quantity" });
        }

        let cart = await Cart.findOne({ userId: req.user.userId });

        if (cart) {
            const existingProductIndex = cart.products.findIndex(p => p.productId.equals(productId));

            if (existingProductIndex > -1) {
                cart.products[existingProductIndex].quantity += parsedQuantity;
            } else {
                cart.products.push({ productId, quantity: parsedQuantity });
            }

            await cart.save();
        } else {
            cart = await Cart.create({
                userId: req.user.userId,
                products: [{ productId, quantity: parsedQuantity }]
            });
        }

        res.status(201).json({ message: "Product added to cart", cart });
    } catch (error) {
        res.status(500).json({ message: "Internal server error", error: error.message });
    }
};
