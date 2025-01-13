import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";
import userRoutes from './routers/userRoutes.js';
import taskRoutes from "./routers/taskRoutes.js";
import morgan from "morgan";
const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

app.use("/api/users", userRoutes);
app.use("/api/task", taskRoutes);

export default app;