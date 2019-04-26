import { Request, Response, Router } from 'express';
import { courseValidators } from '../validation/course.validators';
import { CourseModel } from '../models/courses.model';
import { authorValidators } from '../validation/author.validators';
import { Types } from 'mongoose';
import { validateObjectId } from '../middleware/validate-objectid';
import { auth } from '../middleware/auth';
import { admin } from '../middleware/admin';

export const coursesRouter = Router();

/**
 * GET /api/courses
 *
 */
coursesRouter.get('/', async (req: Request, res: Response) => {

    const courses = await CourseModel.find().populate('author', 'name -_id'); // populate the author from another collection and only display the name
    res.send(courses);
});

/**
 * POST /api/courses
 *
 */
coursesRouter.post('/', auth, async (req: Request, res: Response) => {
    const {error} = courseValidators(req.body); // returnedObject.error

    if (error) {
        res.status(400).send({error: error.details[0].message});
        return;
}

    if (!Types.ObjectId.isValid(req.body.author)) {
        return res.status(400).send({error: 'Invalid object id for author'});
    }

    const course = new CourseModel(req.body);
    const result = await course.save();

    res.send(result);
});

/**
 * GET /api/courses/:id
 *
 */
coursesRouter.get('/:id', validateObjectId, async (req: Request, res: Response) => {

    const course = await CourseModel.findById(req.params.id).populate('author', 'name -_id'); // populate is used when referencing documents from other collections

    if (!course) {
        return res.status(404).send('The course with the given id was not found');
    }

    res.send(course);
});

/**
 * PUT /api/courses/:id
 *
 */
coursesRouter.put('/:id', auth, async (req: Request, res: Response) => {

    const {error} = courseValidators(req.body); // returnedObject.error

    if (error) {
        res.status(400).send(error.details[0].message);
        return;
    }

    if (!Types.ObjectId.isValid(req.params.id)) {
        return res.status(400).send(`${req.params.id} is not a valid id`);
    }

    const course = await CourseModel.findByIdAndUpdate(req.params.id, req.body, {new: true});

    if (!course) {
        return res.status(404).send('The course with the given id was not found');
    }

    res.send(course);
});

/**
 * DELETE /api/courses/:id
 *
 */
coursesRouter.delete('/:id', [auth, admin], async (req: Request, res: Response) => {

    const course = await CourseModel.findByIdAndDelete(req.params.id);
    res.send(course);
});

/**
 * POST /api/courses/:id/collaborators
 *
 */
coursesRouter.post('/:id/collaborators', auth, async (req: Request, res: Response) => {

    const {error} = authorValidators(req.body); // returnedObject.error

    if (error) {
        res.status(400).send(error.details[0].message);
        return;
    }

    if (!Types.ObjectId.isValid(req.params.id)) {
        return res.status(400).send(`${req.params.id} is not a valid id`);
    }

    const course: any = await CourseModel.findById(req.params.id);

    if (!course) {
        return res.status(404).send(`The course with id ${req.params.id} was not found`);
    }

    course.collaborators.push(req.body);
    course.save();

    res.send(course);
});
