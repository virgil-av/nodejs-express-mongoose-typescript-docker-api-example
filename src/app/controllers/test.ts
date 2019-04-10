import {Request, Response} from "express";
import {courseValidators} from "../validation/course.validators";
import TestModel from "../models/test.model";


/**
 * GET /api/courses
 *
 */
export let getTests = async (req: Request, res: Response) => {
    try{
        const courses = await TestModel.find();
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
export let postTest = async (req: Request, res: Response) => {
    const {error} = courseValidators(req.body); // returnedObject.error

    if (error) {
        res.status(400).send(error.details[0].message);
        return;
    }

    try{
        const course = new TestModel(req.body);
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
export let getTest = async (req: Request, res: Response) => {

    try{
        const course = await TestModel.findById(req.params.id);

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
export let putTest = async (req: Request, res: Response) => {

    const {error} = courseValidators(req.body); // returnedObject.error

    if (error) {
        res.status(400).send(error.details[0].message);
        return;
    }

    try{
        const course = await TestModel.findByIdAndUpdate(req.params.id, req.body, {new: true});

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
export let deleteTest = async (req: Request, res: Response) => {

    try{
        const course = await TestModel.findByIdAndDelete(req.params.id);
        res.send(course);
    }
    catch(error){
        res.status(400).send(error.message);
    }

};

