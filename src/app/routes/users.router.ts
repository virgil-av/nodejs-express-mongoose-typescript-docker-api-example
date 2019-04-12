import express from "express";
import * as userController from "../controllers/users.controller";

const userRouter = express.Router();

userRouter.get('/', userController.getUser);
userRouter.post('/', userController.createUser);
userRouter.get('/:id', userController.getUser);
userRouter.put('/:id', userController.editUser);
userRouter.delete('/:id', userController.deleteUser);


export default userRouter;
