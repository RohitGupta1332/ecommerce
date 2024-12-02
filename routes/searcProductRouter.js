import express from "express";
import { searchProduct } from "../controllers/searchProductController.js";

const router = express.Router();

router.get("/search", searchProduct);

export default router;