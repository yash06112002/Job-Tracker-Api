const request = require('supertest');
const app = require('../app');
const User = require('../models/user');

describe('Auth Endpoint Tests', () => {
    beforeAll(async () => {
        await User.deleteMany({});
    });

    afterAll(async () => {
        await User.deleteMany({});
    });
    
    it('should register a new user', async () => {
        const res = await request(app)
            .post('/api/auth/register')
            .send({ email: 'test@example.com', password: 'password123', name: 'yash', });
            
        console.log(res.body);

        expect(res.statusCode).toEqual(201);
        expect(res.body).toHaveProperty('token');
    });

    it('should log in a user', async () => {
        const res = await request(app)
            .post('/api/auth/login')
            .send({ email: 'test@example.com', password: 'password123' });

        console.log(res.body);

        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('token');
    });

    it('should fail to log in with wrong credentials', async () => {
        const res = await request(app)
            .post('/api/auth/login')
            .send({ email: 'wrong@example.com', password: 'wrongpassword' });
        
        console.log(res.body);

        expect(res.statusCode).toEqual(400);
    });
});
