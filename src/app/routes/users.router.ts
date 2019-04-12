import express from "express";
import * as userController from "../controllers/users.controller";
import {auth} from "../middleware/auth";

const userRouter = express.Router();

userRouter.post('/', userController.createUser);
userRouter.get('/me', auth, userController.getUser);
userRouter.put('/me', userController.editUser);
userRouter.delete('/me', userController.deleteUser);


export default userRouter;
