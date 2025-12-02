import { Router } from "express";
import { title } from "process";
import { signIn, signOut, signUp } from "../controllers/auth.controller";

const authRouter = Router();

authRouter.post("/sign-up", signUp);

authRouter.post("/sign-in",signIn);

authRouter.post("/sign-out", signOutr);
export default authRouter;