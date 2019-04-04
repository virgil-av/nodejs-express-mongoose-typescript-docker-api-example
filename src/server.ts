import express from "express";
import Joi from "joi"

/**
 * Create Express server
 */
const app = express();

/**
 * Parse the json from request
 */
app.use(express.json());

const courses = [
    {
        id: 1,
        name: "Test 1"
    },
    {
        id: 2,
        name: "Test 2"
    },
    {
        id: 3,
        name: "Test 3"
    }

];


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

    const schema = {
        name: Joi.string().min(3).required()
    };

    const validation = Joi.validate(req.body, schema);
    console.log(validation);


    if (validation.error) {
        res.status(400).send(validation.error.details[0].message);
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
    const course = courses.find((cours) => {
        return cours.id === parseInt(req.params.id, 10);
    });

    if (!course) {
        return res.status(404).send('The course with the given id was not found');
    }

    res.send(course);
});


/**
 * Server listen
 */
const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(
        `  App is running at http://localhost:${port} in %s mode`,
        app.get("env")
    );
    console.log("  Press CTRL-C to stop\n");
});
