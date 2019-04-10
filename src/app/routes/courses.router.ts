import express from "express";
import * as coursesController from "../controllers/courses.controller";

const coursesRouter = express.Router();

coursesRouter.get('/', coursesController.getCourses);
coursesRouter.post('/', coursesController.postCourse);
coursesRouter.get('/:id', coursesController.getCourse);
coursesRouter.put('/:id', coursesController.putCourse);
coursesRouter.delete('/:id', coursesController.deleteCourse);


export default coursesRouter;
