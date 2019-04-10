import express from "express";
import * as homeController from './controllers';

const indexRouter = express.Router();

indexRouter.get('/', homeController.index);

export default indexRouter;
