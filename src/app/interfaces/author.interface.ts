import {Document, Schema} from 'mongoose';

export interface IAuthor {
    name: string;
    bio: string;
    website: string;
}

export interface IAuthorModel extends IAuthor, Document {
}

export interface AuthorDTO extends IAuthorModel {
    _id: string;
}


