import {UserModel} from "../../../app/models/user.model";
import {verify} from 'jsonwebtoken';
import {get} from "config";
import {Types} from "mongoose"

describe('Test user generate token', () => {

    it('should generate a valid jwt token', () => {
        const payload = {
            _id: new Types.ObjectId().toHexString(),
            isAdmin: true
        };

        const user = new UserModel(payload);
        const token = user.generateAuthToken();
        const decoded = verify(token, get('jwtPrivateKey'));

        expect(decoded).toMatchObject(payload);
    });

});
