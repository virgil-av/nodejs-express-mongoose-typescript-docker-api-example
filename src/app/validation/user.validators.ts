import Joi from "joi";
import {User} from "../interfaces/user.interface";

export function userValidators(user: User){

    const schema = {
        name: Joi.string().min(5).max(255).required(),
        email: Joi.string().min(5).max(255).required().email(),
        password: Joi.string().min(5).max(255).required()
    };

    return Joi.validate(user, schema);
}
