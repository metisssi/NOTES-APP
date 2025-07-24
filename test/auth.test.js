const { mockGooglePassport } = require('./setupPassword');

mockGooglePassport();  // моким сразу

const app = require('../app');  // потом импортируем сервер
const request = require('supertest');

describe('Auth Routes', () => {
  test('should redirect to /dashboard on successful auth', async () => {
    const res = await request(app).get('/google/callback?success=true');
    expect(res.status).toBe(302);
    expect(res.headers.location).toBe('/dashboard');
  });

  test('should redirect to /login-failure on failed auth', async () => {
    const res = await request(app).get('/google/callback?success=false');
    expect(res.status).toBe(302);
    expect(res.headers.location).toBe('/login-failure');
  });
});


describe('GET /login-failure', () => {
  it('should return 200 and an error message', async () => {
    const res = await request(app).get('/login-failure');
    expect(res.statusCode).toBe(200);
    expect(res.text).toBe('Something went wrong...');
  });
});

describe('GET /logout', () => {
  test('should destroy session and redirect to /', async () => {
    // Мокаем req.session.destroy через middleware
    const appWithMockSession = require('express')();
    const session = require('express-session');
    const authRouter = require('../server/routes/auth');

    // Создаём моковую destroy-функцию
    const mockDestroy = jest.fn((cb) => cb(null));

    // Мидлвар, который добавляет session с моком destroy
    appWithMockSession.use((req, res, next) => {
      req.session = {
        destroy: mockDestroy,
      };
      next();
    });

    appWithMockSession.use(authRouter);

    const res = await request(appWithMockSession).get('/logout');

    expect(mockDestroy).toHaveBeenCalled();
    expect(res.status).toBe(302);
    expect(res.header.location).toBe('/');
  });

  test('should handle error if session destroy fails', async () => {
    const appWithBrokenSession = require('express')();
    const authRouter = require('../server/routes/auth');

    const mockDestroy = jest.fn((cb) => cb(new Error('fail')));

    appWithBrokenSession.use((req, res, next) => {
      req.session = {
        destroy: mockDestroy,
      };
      next();
    });

    appWithBrokenSession.use(authRouter);

    const res = await request(appWithBrokenSession).get('/logout');

    expect(mockDestroy).toHaveBeenCalled();
    expect(res.status).toBe(200);
    expect(res.text).toBe('Error loggin out');
  });
});
