import express from "express";
import * as authorController from "../controllers/authors.controller";

const authorRouter = express.Router();

authorRouter.get('/', authorController.getAuthors);
authorRouter.post('/', authorController.createAuthor);
authorRouter.get('/:id', authorController.getAuthor);
authorRouter.put('/:id', authorController.editAuthor);
authorRouter.delete('/:id', authorController.deleteAuthor);


export default authorRouter;
