import { Request, Response } from "express";


/**
 * GET /
 * Home page.
 */
export let indexController = (req: Request, res: Response) => {
    res.render('index', {
        title: 'index',
        message: 'hello'
    })
};
