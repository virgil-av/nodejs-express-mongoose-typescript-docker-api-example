import {Course} from "../interfaces/course.interface";
import Joi from "joi";

export function validateCourse(course: Course){

    const schema = {
        name: Joi.string().min(3).required()
    };

    return Joi.validate(course, schema);
}
