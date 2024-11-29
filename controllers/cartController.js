import { Cart } from "../models/cart.model.js";

export const addToCart = async (req, res) => {
    try {
        const { products } = req.body;

        let cart = await Cart.findOne({ userId: req.user.userId });

        if (cart) {
            products.forEach((newProduct) => {
                const existingProductIndex = cart.products.findIndex(p => p.productId.equals(newProduct.productId));

                if (existingProductIndex > -1) {
                    cart.products[existingProductIndex].quantity += newProduct.quantity;
                } else {
                    cart.products.push(newProduct);
                }
            });

            await cart.save();
        } else {
            cart = await Cart.create({
                userId: req.user.userId,
                products
            });
        }

        res.status(201).json({ message: "Product added to cart", cart });
    } catch (error) {
        res.status(500).json({ message: "Internal server error", error: error.message });
    }
};
