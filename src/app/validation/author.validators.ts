import {Course} from "../interfaces/course.interface";
import Joi from "joi";

export function authorValidators(course: Course){

    const schema = {
        name: Joi.string().min(5).max(255).required(),
        bio: Joi.string().min(5).max(255).required(),
        website: Joi.string().max(100).optional().allow('')
    };

    return Joi.validate(course, schema);
}
