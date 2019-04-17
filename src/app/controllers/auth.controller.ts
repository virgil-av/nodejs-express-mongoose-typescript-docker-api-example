import {Request, Response, Router} from "express";
import {UserModel} from "../models/user.model";
import {compare} from 'bcrypt';
import {authValidators} from "../validation/auth.validators";


export const authRouter = Router();


/**
 * POST /api/users
 *
 */
authRouter.post('/', async (req: Request, res: Response) => {
    const {error} = authValidators(req.body); // returnedObject.error

    if (error) {
        res.status(400).send(error);
        return;
    }

    let user: any = await UserModel.findOne({email: req.body.email});

    if(!user){
        res.status(400).send('Invalid email or password');
        return;
    }

    const validPassword = await compare(req.body.password, user.password);

    if(!validPassword){
        res.status(400).send('Invalid email or password');
        return;
    }

    const token = user.generateAuthToken();

    res.send(token);
});


