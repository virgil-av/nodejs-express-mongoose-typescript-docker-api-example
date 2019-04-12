import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';
import config from "config";

const userSchema = new mongoose.Schema({
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
    }
});

userSchema.methods.generateAuthToken = function(){
    return jwt.sign({_id: this._id}, config.get('jwtPrivateKey'));
};

const UserModel = mongoose.model('User', userSchema);

export default UserModel;

