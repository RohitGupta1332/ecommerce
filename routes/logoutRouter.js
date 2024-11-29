import { logoutUser } from "../controllers/logoutController.js";
import { isLoggedIn } from "../middlewares/authMiddleware.js";
import express from "express";

const router = express.Router();

router.post("/logout", isLoggedIn, logoutUser);

export default router