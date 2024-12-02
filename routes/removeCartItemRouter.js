import express from "express";
import {isLoggedIn} from "../middlewares/authMiddleware.js";
import { removeCartItem } from "../controllers/removeCartItemController.js";

const router = express.Router();

router.delete("/remove-item", isLoggedIn, removeCartItem);

export default router;