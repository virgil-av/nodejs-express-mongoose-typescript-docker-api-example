import {UserModel} from "../../../app/models/user.model";
import {auth} from "../../../app/middleware/auth";
import {Types} from "mongoose";


describe('testing auth middleware', () => {

    it('should populate req.user with a valid JWT', async () => {
        const user = {_id: Types.ObjectId().toHexString(), isAdmin: true};

        const token = new UserModel(user).generateAuthToken();

        const req: any = {
            header: jest.fn().mockReturnValue(token)
        };
        const res: any = {};

        const next: any = jest.fn();

        auth(req, res, next);

        expect(req.user).toBeDefined();
    });


});
