export interface Course {
    _id: string;
    name: string;
    tags: string[];
    author: string;
    isPublished: boolean;
    date: Date;
}
