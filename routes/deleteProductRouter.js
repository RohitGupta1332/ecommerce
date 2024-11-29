import express from "express";
import { deleteProduct } from "../controllers/deleteProductController.js";
import { isLoggedIn } from "../middlewares/authMiddleware.js";
import { isAdmin } from "../middlewares/isAdmin.js";

const router = express.Router();

router.delete("/delete-product", isLoggedIn, isAdmin, deleteProduct);

export default router;