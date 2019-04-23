import request from "supertest";
import app, {server} from "../../../server";
import {CourseModel} from "../../../app/models/courses.model";
import {UserModel} from "../../../app/models/user.model";


describe('testing auth middleware', () => {
    let token: string;

    const execRequest = async () => {
        return await request(app).post(`/api/courses`)
            .set('x-auth-token', token)
            .send({
                "tags": ["test"],
                "name": "Test 1",
                "author": "5cb0b9fa67be6d7b9fca2dbb",
                "isPublished": true,
                "price": 100,
                "category": "backend"
            });
    };

    beforeEach(async () => {
        token = new UserModel().generateAuthToken();
    });

    afterEach(async () => {
        await CourseModel.remove({});
        await server.close();
    });


    it('should return a 401 if no token is provided', async () => {
        token = '';
        const res = await execRequest();

        expect(res.status).toEqual(401);
    });

    it('should return a 400 if token is invalid', async () => {
        token = 'a';
        const res = await execRequest();

        expect(res.status).toEqual(400);
    });

    it('should return a 200 if token is valid', async () => {
        const res = await execRequest();

        expect(res.status).toEqual(200);
    });

});
