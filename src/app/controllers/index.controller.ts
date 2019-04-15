import { Request, Response } from "express";
import express from "express";
const indexRouter = express.Router();


/**
 * GET /
 * Home page.
 */
indexRouter.get('/', (req: Request, res: Response) => {
    res.render('index', {
        title: 'index',
        message: 'hello'
    })
});

export default indexRouter;
