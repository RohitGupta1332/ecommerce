import express from "express";
import { addProduct } from "../controllers/addProductController.js";
import {isLoggedIn} from "../middlewares/authMiddleware.js";
import { isAdmin } from "../middlewares/isAdmin.js";


const router = express.Router();

router.post("/add-product",isLoggedIn, isAdmin, addProduct);

export default router;