import express from "express";
import * as testController from "../controllers/test";

const testRouter = express.Router();

testRouter.get('/', testController.getTests);
testRouter.post('/', testController.postTest);
testRouter.get('/:id', testController.getTest);
testRouter.put('/:id', testController.putTest);
testRouter.delete('/:id', testController.deleteTest);


export default testRouter;
