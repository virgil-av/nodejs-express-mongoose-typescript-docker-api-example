import request from "supertest";
import app, {server} from "../../../server";
import {AuthorModel} from "../../../app/models/author.model";
import {AuthorDTO, IAuthor} from "../../../app/interfaces/author.interface";
import {Types} from "mongoose";
import {UserModel} from "../../../app/models/user.model";


describe('/api/authors', () => {

    let defaultAuthor: IAuthor;

    const execRequest = async () => {
        return await request(app).post(`/api/authors`)
            .send(defaultAuthor);
    };

    const addTestAuthors = async () => {
        await AuthorModel.collection.insertMany([
            {
                "name": "Test Author",
                "bio": "test bio",
                "website": "www"
            },
            {
                "name": "Test Author 2",
                "bio": "test bio 2",
                "website": "www2"
            }
        ]);
    };


    beforeEach(async () => {

        defaultAuthor = {
            "name": "Test Author",
            "bio": "test bio",
            "website": "www"
        }

    });

    afterEach(async () => {
        await AuthorModel.remove({});
        await server.close();
    });

    describe('GET /', () => {

        it('should return all authors', async () => {

            await addTestAuthors();
            const res = await request(app).get("/api/authors");

            expect(res.status).toEqual(200);
            expect(res.body.length).toBe(2);
            expect(res.body.some((author: AuthorDTO) => author.name === 'Test Author')).toBeTruthy();
            expect(res.body.some((author: AuthorDTO) => author.name === 'Test Author 2')).toBeTruthy();
        });

    });

    describe('GET /:id', () => {

        it('should return an author by given id', async () => {
            await addTestAuthors();
            const allAuthors: any = await request(app).get("/api/authors");

            const res = await request(app).get(`/api/authors/${allAuthors.body[0]._id}`);

            expect(res.status).toEqual(200);
            expect(res.body).toHaveProperty('_id', allAuthors.body[0]._id)
        });

        it('should return error 400 for non existing author id', async () => {
            const badId = "1234";
            const res = await request(app).get(`/api/authors/${badId}`);

            expect(res.status).toEqual(400);
        });

        it('should return error 404 if no author with given id', async () => {
            const nonExistingId = Types.ObjectId().toHexString();
            const res = await request(app).get(`/api/authors/${nonExistingId}`);

            expect(res.status).toEqual(404);
        });

    });

    describe('POST /', () => {

        it('should return a 401 if client is not logged in', async () => {
            const res = await execRequest();

            expect(res.status).toEqual(200);
            expect(res.body).toHaveProperty('_id')
        });

        it('should return 400 if invalid author name', async () => {
            defaultAuthor.name = "";

            const res = await execRequest();

            expect(res.status).toEqual(400);
        });

        it('should return 400 if invalid author bio', async () => {
            defaultAuthor.bio = "";

            const res = await execRequest();

            expect(res.status).toEqual(400);
        });

    });


    describe('PUT /:id', () => {

        it('should return a 200 if author name was updated', async () => {

            defaultAuthor.name = "Test Author changed";
            const author = await execRequest();

            const res = await request(app).put(`/api/authors/${author.body._id}`)
                .send(defaultAuthor);

            expect(res.status).toEqual(200);
            expect(res.body).toHaveProperty('name', 'Test Author changed');
        });

        it('should return a 400 if author name is invalid', async () => {

            defaultAuthor.name = "";
            const author = await execRequest();

            const res = await request(app).put(`/api/authors/${author.body._id}`)
                .send(defaultAuthor);

            expect(res.status).toEqual(400);
        });

        it('should return a 400 if author bio is invalid', async () => {
            defaultAuthor.bio = "";
            const author = await execRequest();

            const res = await request(app).put(`/api/authors/${author.body._id}`)
                .send(defaultAuthor);

            expect(res.status).toEqual(400);
        });

        it('should return a 404 if author id was not found', async () => {
            const badId = Types.ObjectId().toHexString();

            const res = await request(app).put(`/api/authors/${badId}`)
                .send(defaultAuthor);

            expect(res.status).toEqual(404);
        });


    });

    describe('DELETE /:id', () => {

        it('should return a 200 if course was deleted', async () => {
            const author = await execRequest();
            const res = await request(app).delete(`/api/authors/${author.body._id}`);


            expect(res.status).toEqual(200);
            expect(res.body).toHaveProperty('name', 'Test Author');
        });

    });


});
