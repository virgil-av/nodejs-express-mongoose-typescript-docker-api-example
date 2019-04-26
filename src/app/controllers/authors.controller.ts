import { Request, Response, Router } from 'express';
import { AuthorModel } from '../models/author.model';
import { authorValidators } from '../validation/author.validators';
import { Types } from 'mongoose';
import { auth } from '../middleware/auth';
import { admin } from '../middleware/admin';

export const authorRouter = Router();

/**
 * GET /api/authors
 *
 */
authorRouter.get('/', auth, async (req: Request, res: Response) => {

    const courses = await AuthorModel.find();
    res.send(courses);

});

/**
 * POST /api/authors
 *
 */
authorRouter.post('/', auth, async (req: Request, res: Response) => {
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
authorRouter.get('/:id', auth, async (req: Request, res: Response) => {

    if (!Types.ObjectId.isValid(req.params.id)) {
        return res.status(400).send(`${req.params.id} is not a valid id`);
    }

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
authorRouter.put('/:id', auth, async (req: Request, res: Response) => {

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
authorRouter.delete('/:id', [auth, admin], async (req: Request, res: Response) => {

    const author = await AuthorModel.findByIdAndDelete(req.params.id);
    res.send(author);

});
