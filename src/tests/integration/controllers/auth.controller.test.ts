import request from 'supertest';
import app, { server } from '../../../server';
import { UserModel } from '../../../app/models/user.model';


describe('/api/auth', () => {
    let user: any;

    beforeEach(async () => {

        user = await request(app).post(`/api/users`)
            .send({
                'name': 'Test Account',
                'email': 'unique.email@test.com',
                'password': 'Password1!'
            });
    });

    afterEach(async () => {
        await UserModel.remove({});
        await server.close();
    });


    describe('POST /', () => {

        it('should create and authenticate user and return token', async () => {

            const userAuth = {
                'email': 'unique.email@test.com',
                'password': 'Password1!'
            };

            const res = await request(app).post(`/api/auth`)
                .send(userAuth);

            expect(res.status).toEqual(200);
            expect(res.body).toHaveProperty('auth_token');
        });

        it('should return 400 if invalid password)', async () => {
            const userAuth = {
                'email': 'unique.email@test.com',
                'password': '1234'
            };

            const res = await request(app).post(`/api/auth`)
                .send(userAuth);

            expect(res.status).toEqual(400);
        });

        it('should return 400 if invalid email)', async () => {
            const userAuth = {
                'email': 'abcd',
                'password': 'Password1!'
            };

            const res = await request(app).post(`/api/auth`)
                .send(userAuth);

            expect(res.status).toEqual(400);
        });

        it('should return 400 if wrong password)', async () => {
            const userAuth = {
                'email': 'unique.email@test.com',
                'password': 'Password1£$%'
            };

            const res = await request(app).post(`/api/auth`)
                .send(userAuth);

            expect(res.status).toEqual(400);
        });

        it('should return 400 if wrong email)', async () => {
            const userAuth = {
                'email': 'wrong@test.com',
                'password': 'Password1!'
            };

            const res = await request(app).post(`/api/auth`)
                .send(userAuth);

            expect(res.status).toEqual(400);
        });

    });

});
