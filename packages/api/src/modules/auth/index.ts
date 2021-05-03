import { Router } from "express";
import github from "./providers/github";

export const authRouter = Router();

authRouter.use("/github", github);
