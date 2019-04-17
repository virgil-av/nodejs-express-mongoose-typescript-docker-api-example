import {json} from "express";
import {authRouter} from "./controllers/auth.controller";
import {authorRouter} from "./controllers/authors.controller";
import {coursesRouter} from "./controllers/courses.controller";
import {indexRouter} from "./controllers/index.controller";
import {userRouter} from "./controllers/users.controller";
import {errorHandler} from "./middleware/error-handler";

export function initRoutes(app: any){
    app.use(json());
    app.use('/api/', indexRouter);
    app.use('/api/auth', authRouter);
    app.use('/api/authors', authorRouter);
    app.use('/api/courses', coursesRouter);
    app.use('/api/users', userRouter);
    app.use(errorHandler);
}

