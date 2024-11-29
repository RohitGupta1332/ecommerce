import express from "express";
import { isLoggedIn } from "../middlewares/authMiddleware.js";
import { viewProduct } from "../controllers/viewPoductsContoller.js";

const router = express.Router();

router.get("/product", isLoggedIn, viewProduct);

export default router;