const request = require('supertest');
const app = require('../app');
const Application = require('../models/application');
const User = require('../models/user');

describe('Application Endpoint Tests', () => {
    let token;
    let user;
    let jobId;

    beforeAll(async () => {
        await User.deleteMany({});
        
        const loginRes = await request(app)
            .post('/api/auth/register')
            .send({ email: 'test2@example.com', password: 'password123', name: 'test2' });

        token = loginRes.body.token;
        user = loginRes.body.email;
    });

    afterAll(async () => {
        await Application.deleteMany({});
        await User.deleteMany({});
    });
    
    it('should get all jobs', async () => {
        const res = await request(app)
            .get('/api/applications')
            .set('Authorization', `Bearer ${token}`);
        
        expect(res.statusCode).toEqual(200);
        expect(res.body).toBeInstanceOf(Array);
    });
    
    it('should create a new job', async () => {
        const res = await request(app)
        .post('/api/applications')
        .set('Authorization', `Bearer ${token}`)
        .send({ role: 'Backend Developer', company: 'TechCorp', status: 'Applied' });
        
        expect(res.statusCode).toEqual(201);
        expect(res.body).toHaveProperty('_id');
        
        jobId = res.body._id;
    });
    
    it('should get a job by id', async () => {
        const res = await request(app)
        .get(`/api/applications/${jobId}`)
        .set('Authorization', `Bearer ${token}`);
        
        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('_id');
    });
    
    it('should update a job status', async () => {
        const res = await request(app)
        .put(`/api/applications/${jobId}`)
        .set('Authorization', `Bearer ${token}`)
        .send({ status: 'Interviewing' });
        
        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('_id');
    });
});
