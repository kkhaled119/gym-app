import express from "express";
import authRoutes from "./modules/auth/authRoutes.ts";
import { errorHandler } from "./middlewares/errorHandler.ts";

const app = express();

app.use(express.json());

app.use("/auth", authRoutes);

app.use(errorHandler);

export default app;
