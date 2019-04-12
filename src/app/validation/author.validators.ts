import Joi from "joi";
import {Author} from "../interfaces/author.interface";

export function authorValidators(author: Author){

    const schema = {
        name: Joi.string().min(5).max(255).required(),
        bio: Joi.string().min(5).max(255).required(),
        website: Joi.string().max(100).optional().allow('')
    };

    return Joi.validate(author, schema);
}
