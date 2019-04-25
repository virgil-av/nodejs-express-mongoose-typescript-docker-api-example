import { Document } from 'mongoose';
import { AuthorDTO } from './author.interface';

export interface ICourse {
    name: string;
    author: string;
    category: string;
    tags: string[];
    isPublished: boolean;
    price?: number;
}

export interface ICourseModel extends ICourse, Document {
    date: Date;
    collaborators?: AuthorDTO[];
}

export interface CourseDTO extends ICourse {
    _id: string;
}
