import express from "express";
import { signUp, login, verifyToken,getAllUsers } from "../controllers/usersController.js";

const router = express.Router();

router.post("/signup", signUp);
router.post("/login", login);
router.get("/token:id", verifyToken);
router.get("/allusers", getAllUsers);

export default router;