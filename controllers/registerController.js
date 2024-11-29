import {User} from "../models/user.model.js";
import bcrypt from "bcrypt";
import { generateToken } from "../utils/generateToken.js";


export const registerUser = async (req, res) => {
    try {
        const { name, contact, email, password, isAdmin } = req.body;
        const user = await User.findOne({email: email});

        if (user) {
            return res.status(400).json({message: "User already exists!"});
        }

        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(password, salt);

        const newUser = await User.create({
            name,
            contact,
            email,
            password: hash,
            isAdmin
        });

        let token = generateToken(newUser);
        res.cookie("token", token);

        res.status(201).json({message: "User registered"});

    }
    catch(error){
        res.status(500).json({message: "Internal server error", error: error.message});
    }

}

