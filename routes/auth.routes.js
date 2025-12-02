import { Router } from "express";
import { title } from "process";

const authRouter = Router();

authRouter.post("/sign-up", (req, res) => {
  // Handle sign-up
  res.send({ body: { title: 'Sign-up' } });
});

authRouter.post("/sign-in", (req, res) => {
  // Handle sign-in
  res.send({ body: { title: 'Sign-in' } });
});

authRouter.post("/sign-out", (req, res) => {
  // Handle sign-out
  res.send({ body: { title: 'Sign-out' } });
});
export default authRouter;