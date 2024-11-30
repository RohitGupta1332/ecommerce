import express from "express";
import { viewCart } from "../controllers/viewCartController.js";
import {isLoggedIn} from "../middlewares/authMiddleware.js";


const router = express.Router();

router.get("/view-cart", isLoggedIn, viewCart);

export default router;