import { addToCart } from "../controllers/cartController.js";
import express from "express";
import {isLoggedIn} from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/add-to-cart", isLoggedIn, addToCart);

export default router;