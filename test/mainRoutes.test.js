const supertest = require('supertest')

const app = require('../app')

const request = supertest(app)


describe('Main Routes', () => {
    test('GET / should return 200 and contain title', async () => {
        const res = await request.get('/')
        expect(res.statusCode).toBe(200)
        expect(res.text).toContain('<title>NodeJs Notes</title>');
    })


    test('GET /about should return 200 and contain about title', async () => {
    const res = await request.get('/about');
    expect(res.statusCode).toBe(200);
    expect(res.text).toContain('<title>About - Nodejs Notes</title>');
  });
})