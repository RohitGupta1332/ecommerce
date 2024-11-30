import dotenv from "dotenv";
import jwt from "jsonwebtoken";

dotenv.config();

export const isLoggedIn = async (req, res, next) => {
    try{
        const token = req.cookies.token;
        console.log(req.cookies);
        if(!token) return res.status(401).json({message: "Unauthorised  token"});
        const decoded = jwt.verify(token, process.env.JWT_KEY);
        req.user = decoded;
        next();
    }
    catch(error){
        return res.status(401).json({message: "Error in token verification "});
    }
}