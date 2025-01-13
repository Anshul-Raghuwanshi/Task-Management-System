import User from "../models/userModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const signUp = async (req, res) => {
    const { username, password, admin } = req.body;
    try {
        const saltRounds = 10;
        const hashpassword = await bcrypt.hash(password, saltRounds);
        const user = await User.create({ username,password: hashpassword, admin });
        res.status(200).json(user);
    } catch (error) {
        console.log(error);
        res.status(400).json({ error: error.message });
    }
};

const login = async (req, res) => {
    const { username, password } = req.body;
    try {
        const user = await User.findOne({ username });
        
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }
        
        if (await bcrypt.compare(password, user.password)) {
            const token = jwt.sign({ id: user._id }, "Secret_key" || process.env.JWT_SECRET, { expiresIn: "1h"});
            return res.status(200).json({"user":user,"userToken":token});
        }
        return res.status(401).json({ error: "Invalid password" });
    } catch (error) {
        console.log(error);
        res.status(400).json({ error: error.message });
    }
};

const verifyToken = (req, res) => {
    const token = req.body.token || req.query.token || req.headers["x-access-token"] || req.params.id;
    
    if (!token) {
        return res.status(401).json({ error: "Token not provided", verified: false });
    }
    try {
        const decoded = jwt.verify(token, "Secret_key" || process.env.JWT_SECRET);
        res.json({message:"Token is valid",user:decoded, verified: true});
        
    } catch (error) {
        console.log(error);
        res.status(401).json({ error: "Invalid token", verified: false });
    }
};

const getAllUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json(users);
        
    } catch (error) {
        console.log(error);
        res.status(400).json({ error: error.message });
    }
};

export { signUp, login, verifyToken,getAllUsers };