import express from "express";
import {Course} from "./interfaces/course.interface";
import {Courses} from "./localDB/db";
import {validateCourse} from "./validation/validator";

/**
 * Create Express server
 */
const app = express();

/**
 * Temporary local db, TODO remove when implementing mongodb
 */
const courses: Course[] = Courses;


/**
 * Parse the json from request
 */
app.use(express.json());

/**
 * Primary app routes.
 */
app.get('/', (req, res) => {
    res.send('Hello World');
});

app.get('/api/courses', (req, res) => {
    res.send(courses);
});

app.post('/api/courses', (req, res) => {

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
});

app.get('/api/courses/:id', (req, res) => {
    const course = courses.find((course) => {
        return course.id === parseInt(req.params.id, 10);
    });

    if (!course) {
        return res.status(404).send('The course with the given id was not found');
    }

    res.send(course);
});

app.put('/api/courses/:id', (req, res) => {
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

});


app.delete('/api/courses/:id', (req, res) => {
    const course = courses.find((course) => {
        return course.id === parseInt(req.params.id, 10);
    });

    if (!course) {
        return res.status(404).send('The course with the given id was not found');
    }

    const index = courses.indexOf(course);

    courses.splice(index, 1);

    res.send(course);
});


export default app;
