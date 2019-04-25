import { Schema, Model, model } from 'mongoose';
import config from 'config';
import { IUserModel } from '../interfaces/user.interface';
import { sign } from 'jsonwebtoken';

const userSchema = new Schema({
    name: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 255,
        // match: /pattern/
    },
    email: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 255,
        unique: true
    },
    password: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 1024
    },
    isAdmin: Boolean,
});

userSchema.methods.generateAuthToken = function() {
    return sign({_id: this._id, isAdmin: this.isAdmin}, config.get('jwtPrivateKey'));
};

export const UserModel: Model<IUserModel> = model<IUserModel>('User', userSchema);

