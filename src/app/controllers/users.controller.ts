import {Request, Response} from "express";
import {authorValidators} from "../validation/author.validators";
import UserModel from "../models/user.model";


/**
 * GET /api/users
 *
 */
export let getUsers = async (req: Request, res: Response) => {
    try{
        const courses = await UserModel.find();
        res.send(courses);
    }
    catch(error){
        res.status(400).send(error.message);
    }
};

/**
 * POST /api/users
 *
 */
export let createUser = async (req: Request, res: Response) => {
    const {error} = authorValidators(req.body); // returnedObject.error

    if (error) {
        res.status(400).send(error);
        return;
    }

    try{
        const author = new UserModel(req.body);
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
 * GET /api/users/:id
 *
 */
export let getUser = async (req: Request, res: Response) => {

    try{
        const author = await UserModel.findById(req.params.id);

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
 * PUT /api/users/:id
 *
 */
export let editUser = async (req: Request, res: Response) => {

    const {error} = authorValidators(req.body); // returnedObject.error

    if (error) {
        res.status(400).send(error.details[0].message);
        return;
    }

    try{
        const author = await UserModel.findByIdAndUpdate(req.params.id, req.body, {new: true});

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
 * DELETE /api/users/:id
 *
 */
export let deleteUser = async (req: Request, res: Response) => {

    try{
        const author = await UserModel.findByIdAndDelete(req.params.id);
        res.send(author);
    }
    catch(error){
        res.status(400).send(error.message);
    }

};

