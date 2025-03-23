import { Router } from "express";
import AuthController from "../controller/auth.controller.js";

const authRouter = Router();

const controller = new AuthController();

authRouter.post("/auth/register", (req, res) =>
  controller.registerController(req, res)
);
authRouter.post("/auth/login", (req, res) =>
  controller.loginController(req, res)
);

export default authRouter;
