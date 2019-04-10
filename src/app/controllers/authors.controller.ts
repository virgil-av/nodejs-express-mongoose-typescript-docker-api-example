import {Request, Response} from "express";
import AuthorModel from "../models/author.model";
import {authorValidators} from "../validation/author.validators";



/**
 * GET /api/courses
 *
 */
export let getAuthors = async (req: Request, res: Response) => {
    try{
        const courses = await AuthorModel.find();
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
export let createAuthor = async (req: Request, res: Response) => {
    const {error} = authorValidators(req.body); // returnedObject.error

    if (error) {
        res.status(400).send(error);
        return;
    }

    try{
        const author = new AuthorModel(req.body);
        const result =  await author.save();

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
export let getAuthor = async (req: Request, res: Response) => {

    try{
        const author = await AuthorModel.findById(req.params.id);

        if (!author) {
            return res.status(404).send('The author with the given id was not found');
        }

        res.send(author);
    }
    catch(error){
        return res.status(404).send('That is not a valid id');
    }

};

/**
 * PUT /api/courses/:id
 *
 */
export let editAuthor = async (req: Request, res: Response) => {

    const {error} = authorValidators(req.body); // returnedObject.error

    if (error) {
        res.status(400).send(error.details[0].message);
        return;
    }

    try{
        const author = await AuthorModel.findByIdAndUpdate(req.params.id, req.body, {new: true});

        if (!author) {
            return res.status(404).send('The author with the given id was not found');
        }
        res.send(author);
    }
    catch(error){
        res.status(400).send(error.message);
    }

};

/**
 * DELETE /api/courses/:id
 *
 */
export let deleteAuthor = async (req: Request, res: Response) => {

    try{
        const author = await AuthorModel.findByIdAndDelete(req.params.id);
        res.send(author);
    }
    catch(error){
        res.status(400).send(error.message);
    }

};

