import express from "express";
import * as coursesController from "../controllers/courses.controller";
import {auth} from "../middleware/authenticate";

const coursesRouter = express.Router();

coursesRouter.get('/', coursesController.getCourses);
coursesRouter.post('/', auth, coursesController.postCourse);
coursesRouter.get('/:id', coursesController.getCourse);
coursesRouter.put('/:id', coursesController.putCourse);
coursesRouter.delete('/:id', coursesController.deleteCourse);
coursesRouter.post('/:id/collaborators', coursesController.addCollaborators);


export default coursesRouter;
