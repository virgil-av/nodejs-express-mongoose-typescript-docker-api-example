import {Author} from "./author.interface";

export interface Course {
    _id: string;
    name: string;
    tags: string[];
    author: Author;
    isPublished: boolean;
    category: string;
    date: Date;
    __v: number;
}
