const request = require('supertest');
const express = require('express');
const dashboardRouter = require('../server/routes/dashboard');


jest.mock('../server/middleware/checkAuth', () => ({
  isLoggedIn: (req, res, next) => next(),
}));




jest.mock('../server/controllers/dashboardController', () => ({
  dashboardControllerGet: (req, res) => res.status(200).send('dashboardControllerGet called'),
  dashboardViewNote: (req, res) => res.status(200).send(`dashboardViewNote called with id ${req.params.id}`),
  dashboardUpdateNote: (req, res) => res.status(200).send(`dashboardUpdateNote called with id ${req.params.id}`),
  dashboardDeleteNote: (req, res) => res.status(200).send(`dashboardDeleteNote called with id ${req.params.id}`),
  dashboardAddNotes: (req, res) => res.status(200).send('dashboardAddNotes called'),
  dashboardAddNotesSubmit: (req, res) => res.status(200).send('dashboardAddNotesSubmit called'),
  dashboardSearch: (req, res) => res.status(200).send('dashboardSearch called'),
  dashboardSearchSubmit: (req, res) => res.status(200).send('dashboardSearchSubmit called'),
}));

describe('Dashboard Routes', () => {
  let app;

  beforeAll(() => {
    app = express();
    app.use(express.json());
    app.use('/dashboard', dashboardRouter);
  });

  test('GET /dashboard calls dashboardControllerGet', async () => {
    const res = await request(app).get('/dashboard');
    expect(res.statusCode).toBe(200);
    expect(res.text).toBe('dashboardControllerGet called');
  });

  test('GET /dashboard/item/:id calls dashboardViewNote', async () => {
    const res = await request(app).get('/dashboard/item/123');
    expect(res.statusCode).toBe(200);
    expect(res.text).toBe('dashboardViewNote called with id 123');
  });

  test('PUT /dashboard/item/:id calls dashboardUpdateNote', async () => {
    const res = await request(app).put('/dashboard/item/123').send({ title: 'test', body: 'body' });
    expect(res.statusCode).toBe(200);
    expect(res.text).toBe('dashboardUpdateNote called with id 123');
  });

  test('DELETE /dashboard/item/:id calls dashboardDeleteNote', async () => {
    const res = await request(app).delete('/dashboard/item/123');
    expect(res.statusCode).toBe(200);
    expect(res.text).toBe('dashboardDeleteNote called with id 123');
  });

  test('GET /dashboard/add calls dashboardAddNotes', async () => {
    const res = await request(app).get('/dashboard/add');
    expect(res.statusCode).toBe(200);
    expect(res.text).toBe('dashboardAddNotes called');
  });

  test('POST /dashboard/add calls dashboardAddNotesSubmit', async () => {
    const res = await request(app).post('/dashboard/add').send({ title: 'test', body: 'body' });
    expect(res.statusCode).toBe(200);
    expect(res.text).toBe('dashboardAddNotesSubmit called');
  });

  test('GET /dashboard/add/search calls dashboardSearch', async () => {
    const res = await request(app).get('/dashboard/add/search');
    expect(res.statusCode).toBe(200);
    expect(res.text).toBe('dashboardSearch called');
  });

  
  test('POST /dashboard/add/search calls dashboardSearchSubmit', async () => {
    const res = await request(app).post('/dashboard/add/search').send({ searchTerm: 'test' });
    expect(res.statusCode).toBe(200);
    expect(res.text).toBe('dashboardSearchSubmit called');
  });
});
