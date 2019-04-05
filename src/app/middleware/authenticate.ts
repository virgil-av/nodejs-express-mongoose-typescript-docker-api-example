import {Request, Response, NextFunction} from "express";

export function authenticate(req: Request, res: Response, next: NextFunction){
    console.log('Authenticating...');
    next();
}
