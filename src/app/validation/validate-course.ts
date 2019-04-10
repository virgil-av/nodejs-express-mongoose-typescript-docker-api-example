import {Course} from "../interfaces/course.interface";
import Joi from "joi";

export function validateCourse(course: Course){

    const schema = {
        name: Joi.string().min(3).required(),
        author: Joi.string().min(3).required(),
        tags: Joi.array().items(Joi.string()),
        isPublished: Joi.boolean(),
        price: Joi.number().when('isPublished', {
            is: Joi.boolean().valid(true).required(),
            then: Joi.required(),
            otherwise: Joi.optional()}),
        category: Joi.string()
    };

    return Joi.validate(course, schema);
}
