import Joi from 'joi';
import { IAuthor } from '../interfaces/author.interface';

export function authorValidators(author: IAuthor) {

    const schema = {
        name: Joi.string().min(5).max(255).required(),
        bio: Joi.string().min(5).max(255).required(),
        website: Joi.string().max(100).optional().allow('')
    };

    return Joi.validate(author, schema);
}
