import {Request, Response, NextFunction} from "express";
import jwt from 'jsonwebtoken';
import config from "config";

export function auth(req: Request, res: Response, next: NextFunction){
    const token = req.header('x-auth-token');

    if(!token){
        return res.status(401).send('Access denied. No token provided.')
    }

    try{
        req.user = jwt.verify(token,config.get('jwtPrivateKey'));
        next();
    }
    catch(error){
        res.status(400).send('Invalid token');
    }
}
