import express from "express";
import * as authController from "../controllers/auth.controller";

const authRouter = express.Router();

authRouter.post('/', authController.authUser);

export default authRouter;
