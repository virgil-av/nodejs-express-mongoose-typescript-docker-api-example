import {Request, Response, Router} from 'express';
import {UserModel} from '../models/user.model';
import {userValidators} from '../validation/user.validators';
import {pick} from 'lodash';
import {genSalt, hash} from 'bcrypt';
import {auth} from '../middleware/auth';


export const userRouter = Router();

/**
 * POST /api/users
 *
 */
userRouter.post('/', async (req: Request, res: Response) => {
    const {error} = userValidators(req.body); // returnedObject.error

    if (error) {
        res.status(400).send({error: error});
        return;
    }

    let user: any = await UserModel.findOne({email: req.body.email});

    if (user) {
        res.status(400).send({error: 'User already registered'});
        return;
    }

    user = new UserModel(pick(req.body, ['name', 'email', 'password']));

    const salt = await genSalt(10);
    user.password = await hash(user.password, salt);

    await user.save();

    const token = user.generateAuthToken();

    res.header('x-auth-token', token).send(pick(user, ['_id', 'name', 'email']));
});

/**
 * GET /api/users/me
 *
 */
userRouter.get('/me', auth, async (req: Request, res: Response) => {

    const user = await UserModel.findById(req.user._id).select('-password');
    res.send(user);

});

/**
 * PUT /api/users/:id
 *
 */
userRouter.put('/me', async (req: Request, res: Response) => {

    res.status(404).send('Not implemented');

});

/**
 * DELETE /api/users/:id
 *
 */
userRouter.delete('/me', async (req: Request, res: Response) => {

    res.status(404).send('Not implemented');

});
