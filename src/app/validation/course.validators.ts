import { ICourse } from '../interfaces/course.interface';
import Joi from 'joi';

export function courseValidators(course: ICourse) {

    const schema = {
        name: Joi.string().min(3).required(),
        author: Joi.string().min(3).required(),
        tags: Joi.array().items(Joi.string()),
        isPublished: Joi.boolean(),
        price: Joi.number().greater(10).max(200).when('isPublished', {
            is: Joi.boolean().valid(true).required(),
            then: Joi.required(),
            otherwise: Joi.optional()}),
        category: Joi.string().required()
    };

    return Joi.validate(course, schema);
}
