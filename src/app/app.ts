import express from "express";
import config from "config";

// middleware
import {authenticate} from "./middleware/authenticate";
import helmet from "helmet";
import morgan from "morgan";

//controllers
import * as homeController from './controllers/index';
import * as coursesController from './controllers/courses';


/**
 * Create Express server
 */
const app = express();

console.log('env: ' + config.get('name'));

/**
 * Middleware
 */
app.use(express.json()); // req.body
app.use(authenticate);
app.use(helmet());
app.use(morgan('tiny'));


/**
 * Primary app routes.
 */
app.get('/', homeController.index);

// course controllers
app.get('/api/courses', coursesController.getCourses);
app.post('/api/courses', coursesController.postCourse);
app.get('/api/courses/:id', coursesController.getCourse);
app.put('/api/courses/:id', coursesController.putCourse);
app.delete('/api/courses/:id', coursesController.deleteCourse);


export default app;
