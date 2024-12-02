import { User } from "../models/user.model.js";
import bcrypt from "bcrypt";
import { generateToken } from "../utils/generateToken.js";


export const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({message: "Invalid email or password"});
        }
        const isValidPassword = await bcrypt.compare(password, user.password);
        if (!isValidPassword) {
            return res.status(401).json({message: "Invalid email or password"});
        }
        
        const token = generateToken(user);
        res.cookie("token", token, {
            httpOnly: true, // Makes it inaccessible via JavaScript
            sameSite: "Lax", // Ensure the cookie works in a cross-origin context
            secure: false, // Disable secure if testing locally over HTTP
        });
        
        res.status(200).json({message: "Log in successful"});
    }
    catch(error){
        res.status(500).json({message: "Internal server error", error: error.message});
    }
        
}

