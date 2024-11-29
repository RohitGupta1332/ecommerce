import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export function generateToken(user){
    return jwt.sign({email: user.email, userId: user._id, isAdmin: user.isAdmin}, process.env.JWT_KEY);
}