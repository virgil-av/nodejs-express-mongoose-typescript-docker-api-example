import {Request, Response} from "express";
import UserModel from "../models/user.model";
import {userValidators} from "../validation/user.validators";
import _ from 'lodash';
import bcrypt from 'bcrypt';


/**
 * POST /api/users
 *
 */
export let createUser = async (req: Request, res: Response) => {
    const {error} = userValidators(req.body); // returnedObject.error

    if (error) {
        res.status(400).send(error);
        return;
    }

    let user: any = await UserModel.findOne({email: req.body.email});

    if(user){
        res.status(400).send('User already registered');
        return;
    }

    user = new UserModel(_.pick(req.body, ['name', 'email', 'password']));

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);

    await user.save();

    const token = user.generateAuthToken();

    res.header('x-auth-token', token).send(_.pick(user, ['_id', 'name', 'email']));
};

/**
 * GET /api/users/:id
 *
 */
export let getUser = async (req: Request, res: Response) => {

    res.status(404).send('Not implemented');

};

/**
 * PUT /api/users/:id
 *
 */
export let editUser = async (req: Request, res: Response) => {

    res.status(404).send('Not implemented');

};

/**
 * DELETE /api/users/:id
 *
 */
export let deleteUser = async (req: Request, res: Response) => {

    res.status(404).send('Not implemented');

};

