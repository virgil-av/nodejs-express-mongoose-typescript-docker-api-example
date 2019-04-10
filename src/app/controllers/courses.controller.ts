import {Request, Response} from "express";
import {courseValidators} from "../validation/course.validators";
import CourseModel from "../models/courses.model";


/**
 * GET /api/courses
 *
 */
export let getCourses = async (req: Request, res: Response) => {
    try{
        const courses = await CourseModel.find().populate('author','name -_id'); // populate the author from another collection and only display the name
        res.send(courses);
    }
    catch(error){
        res.status(400).send(error.message);
    }
};

/**
 * POST /api/courses
 *
 */
export let postCourse = async (req: Request, res: Response) => {
    const {error} = courseValidators(req.body); // returnedObject.error

    if (error) {
        res.status(400).send(error.details[0].message);
        return;
    }

    try{
        const course = new CourseModel(req.body);
        const result =  await course.save();

        res.send(result);
    }
    catch(error){
        let errorMessages = [];

        for(let key in error.errors){
            errorMessages.push(error.errors[key]);
        }

        res.status(400).send(errorMessages);
    }

};

/**
 * GET /api/courses/:id
 *
 */
export let getCourse = async (req: Request, res: Response) => {

    try{
        const course = await CourseModel.findById(req.params.id);

        if (!course) {
            return res.status(404).send('The course with the given id was not found');
        }

        res.send(course);
    }
    catch(error){
        return res.status(404).send('That is not a valid id');
    }

};

/**
 * PUT /api/courses/:id
 *
 */
export let putCourse = async (req: Request, res: Response) => {

    const {error} = courseValidators(req.body); // returnedObject.error

    if (error) {
        res.status(400).send(error.details[0].message);
        return;
    }

    try{
        const course = await CourseModel.findByIdAndUpdate(req.params.id, req.body, {new: true});

        if (!course) {
            return res.status(404).send('The course with the given id was not found');
        }
        res.send(course);
    }
    catch(error){
        res.status(400).send(error.message);
    }

};

/**
 * DELETE /api/courses/:id
 *
 */
export let deleteCourse = async (req: Request, res: Response) => {

    try{
        const course = await CourseModel.findByIdAndDelete(req.params.id);
        res.send(course);
    }
    catch(error){
        res.status(400).send(error.message);
    }

};

