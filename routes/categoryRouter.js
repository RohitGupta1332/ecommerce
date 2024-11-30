import express from "express";
import { categoryProduct } from "../controllers/categoryController.js";
import {isLoggedIn} from "../middlewares/authMiddleware.js";

const router = express.Router();

router.get("/:category", isLoggedIn, categoryProduct);

export default router;