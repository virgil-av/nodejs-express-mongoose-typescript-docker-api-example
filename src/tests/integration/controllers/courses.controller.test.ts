import request from "supertest";
import app from "../../../server";
import {CourseModel} from "../../../app/models/courses.model";
import {CourseDTO, ICourse} from "../../../app/interfaces/course.interface";
import {UserModel} from "../../../app/models/user.model";


describe('/api/courses', () => {
    let token: string;
    let course: ICourse;

    const execRequest = async () => {
        return await request(app).post(`/api/courses`)
            .set('x-auth-token', token)
            .send(course);
    };

    const addTestCourses = async () => {
        await CourseModel.collection.insertMany([
            {
                "tags": ["test"],
                "name": "Test 1",
                "author": "5cb0b9fa67be6d7b9fca2dbb",
                "isPublished": true,
                "price": 100,
                "category": "backend",
                "collaborators": [],
            },
            {
                "tags": ["test"],
                "name": "Test 2",
                "author": "5cb0b9fa67be6d7b9fca2dbb",
                "isPublished": false,
                "category": "backend",
                "collaborators": [],
            }
        ]);
    };



    beforeEach(async () => {
        token = new UserModel().generateAuthToken();
        course = {
            "tags": ["test"],
            "name": "Test 1",
            "author": "5cb0b9fa67be6d7b9fca2dbb",
            "isPublished": true,
            "price": 100,
            "category": "backend"
        };
    });

    afterEach(async () => {
        await CourseModel.remove({});
    });

    describe('GET /', () => {

        it('should return all courses', async () => {

            await addTestCourses();
            const res = await request(app).get("/api/courses");

            expect(res.status).toEqual(200);
            expect(res.body.length).toBe(2);
            expect(res.body.some((course: CourseDTO) => course.name === 'Test 1')).toBeTruthy();
            expect(res.body.some((course: CourseDTO) => course.name === 'Test 2')).toBeTruthy();
        });


    });

    describe('GET /:id', () => {

        it('should return the a course by given id', async () => {
            await addTestCourses();
            const allCourses: any = await request(app).get("/api/courses");

            const res = await request(app).get(`/api/courses/${allCourses.body[0]._id}`);

            expect(res.status).toEqual(200);
            expect(res.body).toHaveProperty('_id', allCourses.body[0]._id)
        });

        it('should return error 404 for non existing id', async () => {
            const nonExistingId = "1234";
            const res = await request(app).get(`/api/courses/${nonExistingId}`);

            expect(res.status).toEqual(404);
        });

    });

    describe('POST /', () => {

        it('should return a 401 if client is not logged in', async () => {
            token = '';
            const res = await execRequest();

            expect(res.status).toEqual(401);
        });

        it('should return 400 if course is invalid (no price when is published)', async () => {

            course.price = null;
            const res = await execRequest();

            expect(res.status).toEqual(400);
        });

        it('should return 400 if course has invalid author id', async () => {

            course.author = null;
            const res = await execRequest();

            expect(res.status).toEqual(400);
        });

        it('should return 200 and save course to db', async () => {
            const res = await execRequest();

            expect(res.status).toEqual(200);
            expect(res.body).toHaveProperty('name', 'Test 1');
        });

    });

});
