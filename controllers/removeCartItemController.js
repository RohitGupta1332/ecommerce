import { Cart } from '../models/cart.model.js';

export const removeCartItem = async (req, res) => {
    try {
        const { productId } = req.body;

        if (!productId) {
            return res.status(400).json({ message: "Product ID is required" });
        }

        const cart = await Cart.findOneAndUpdate(
            { userId: req.user.userId },
            { $pull: { products: { productId } } },
            { new: true }
        );

        if (!cart) {
            return res.status(404).json({ message: "Cart not found" });
        }

        res.status(200).json({ message: "Product removed from cart", cart });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
