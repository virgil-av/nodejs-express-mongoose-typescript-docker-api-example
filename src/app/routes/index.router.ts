import express from "express";
import * as homeController from '../controllers/index.controller';

const indexRouter = express.Router();

indexRouter.get('/', homeController.indexController);

export default indexRouter;
