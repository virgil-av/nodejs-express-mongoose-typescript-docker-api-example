import { Request, Response } from "express";
import {Course} from "../interfaces/course.interface";
import {Courses} from "../localDB/db";
import {validateCourse} from "../validation/validate-course";

/**
 * Temporary local db, TODO remove when implementing mongodb
 */
const courses: Course[] = Courses;

/**
 * GET /api/courses
 *
 */
export let getCourses = (req: Request, res: Response) => {
    res.send(courses);
};

/**
 * POST /api/courses
 *
 */
export let postCourse = (req: Request, res: Response) => {
    const {error} = validateCourse(req.body); // returnedObject.error

    if (error) {
        res.status(400).send(error.details[0].message);
        return;
    }

    const course = {
        id: courses.length + 1,
        name: req.body.name
    };
    courses.push(course);

    res.send(course);
};

/**
 * GET /api/courses/:id
 *
 */
export let getCourse = (req: Request, res: Response) => {
    const course = courses.find((course) => {
        return course.id === parseInt(req.params.id, 10);
    });

    if (!course) {
        return res.status(404).send('The course with the given id was not found');
    }

    res.send(course);
};

/**
 * PUT /api/courses/:id
 *
 */
export let putCourse = (req: Request, res: Response) => {
    const course = courses.find((course) => {
        return course.id === parseInt(req.params.id, 10);
    });

    if (!course) {
        return res.status(404).send('The course with the given id was not found');
    }

    const {error} = validateCourse(req.body); // returnedObject.error

    if (error) {
        return res.status(400).send(error.details[0].message);
    }

    course.name = req.body.name;
    res.send(course);

};

/**
 * DELETE /api/courses/:id
 *
 */
export let deleteCourse = (req: Request, res: Response) => {
    const course = courses.find((course) => {
        return course.id === parseInt(req.params.id, 10);
    });

    if (!course) {
        return res.status(404).send('The course with the given id was not found');
    }

    const index = courses.indexOf(course);

    courses.splice(index, 1);

    res.send(course);
};

