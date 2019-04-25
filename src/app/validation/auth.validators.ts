import Joi from 'joi';
import PasswordComplexity from 'joi-password-complexity';
import { Auth } from '../interfaces/auth.interface';

export function authValidators(auth: Auth) {

    const complexityOptions = {
        min: 5,
        max: 250,
        lowerCase: 1,
        upperCase: 1,
        numeric: 1,
        symbol: 1,
        requirementCount: 2,
    };

    const schema = {
        email: Joi.string().min(5).max(255).required().email(),
        password: new PasswordComplexity(complexityOptions).required()
    };

    return Joi.validate(auth, schema);
}
