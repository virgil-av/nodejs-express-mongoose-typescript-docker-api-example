import express from "express";
import * as coursesController from "../controllers/courses.controller";
import {auth} from "../middleware/auth";
import {admin} from "../middleware/admin";

const coursesRouter = express.Router();

coursesRouter.get('/', coursesController.getCourses);
coursesRouter.post('/', auth, coursesController.postCourse);
coursesRouter.get('/:id', coursesController.getCourse);
coursesRouter.put('/:id', coursesController.putCourse);
coursesRouter.delete('/:id', [auth, admin],  coursesController.deleteCourse);
coursesRouter.post('/:id/collaborators', coursesController.addCollaborators);


export default coursesRouter;
