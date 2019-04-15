import {Request, Response} from "express";
import AuthorModel from "../models/author.model";
import {authorValidators} from "../validation/author.validators";

import express from "express";

const authorRouter = express.Router();

/**
 * GET /api/authors
 *
 */
authorRouter.get('/', async (req: Request, res: Response) => {

    const courses = await AuthorModel.find();
    res.send(courses);

});

/**
 * POST /api/authors
 *
 */
authorRouter.post('/', async (req: Request, res: Response) => {
    const {error} = authorValidators(req.body); // returnedObject.error

    if (error) {
        res.status(400).send(error);
        return;
    }

    const author = new AuthorModel(req.body);
    const result = await author.save();

    res.send(result);

});

/**
 * GET /api/authors/:id
 *
 */
authorRouter.get('/:id', async (req: Request, res: Response) => {


    const author = await AuthorModel.findById(req.params.id);

    if (!author) {
        return res.status(404).send('The author with the given id was not found');
    }

    res.send(author);

});

/**
 * PUT /api/authors/:id
 *
 */
authorRouter.put('/:id', async (req: Request, res: Response) => {

    const {error} = authorValidators(req.body); // returnedObject.error

    if (error) {
        res.status(400).send(error.details[0].message);
        return;
    }


    const author = await AuthorModel.findByIdAndUpdate(req.params.id, req.body, {new: true});

    if (!author) {
        return res.status(404).send('The author with the given id was not found');
    }
    res.send(author);

});

/**
 * DELETE /api/authors/:id
 *
 */
authorRouter.delete('/:id', async (req: Request, res: Response) => {

    const author = await AuthorModel.findByIdAndDelete(req.params.id);
    res.send(author);

});

export default authorRouter;

