import { Document } from 'mongoose';

export interface IUser {
    email: string;
    password: string;
    name?: string;
}

export interface IUserModel extends IUser, Document {
    generateAuthToken(): string;
}
