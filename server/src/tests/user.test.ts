import mongoose from 'mongoose';
import request from 'supertest';
import app from '../app';

const MOCK_LOGIN_USER = {
  password: '123',
  accessToken: 'access-sandbox-d6501956-3d9a-445a-a108-cd81753406b3',
  email: 'login-test-user@gmail.com',
  firstName: 'Jane',
  lastName: 'Dooey',
};

let MOCK_USER_TOKEN: string = '';

const DB_PORT = Number(process.env.DB_PORT) || 27017;
const DB_NAME = 'SpendTune-test';

beforeAll(async () => {
  await mongoose.connect(`mongodb://localhost:${DB_PORT}/${DB_NAME}`);
});

afterAll(async () => {
  await mongoose.connection.close();
});

describe('\nREGISTER USER', () => {
  it('Should successfully register user --> POST /register', async () => {
    const res = await request(app).post('/register').send({
      email: MOCK_LOGIN_USER.email,
      password: MOCK_LOGIN_USER.password,
      firstName: MOCK_LOGIN_USER.firstName,
      lastName: MOCK_LOGIN_USER.lastName,
    });
    expect(res.statusCode).toBe(201);
    expect(res.body.user.email).toBe(MOCK_LOGIN_USER.email);
    expect(res.body.token).toBeTruthy();
  });

  it('Should throw 409 when user exist --> POST /register', async () => {
    const res = await request(app).post('/register').send({
      email: MOCK_LOGIN_USER.email,
      password: MOCK_LOGIN_USER.password,
      firstName: MOCK_LOGIN_USER.firstName,
      lastName: MOCK_LOGIN_USER.lastName,
    });
    expect(res.statusCode).toBe(409);
  });

  it('Should throw 400 when no email --> POST /register', async () => {
    const res = await request(app).post('/register').send({
      email: '',
      password: MOCK_LOGIN_USER.password,
      firstName: MOCK_LOGIN_USER.firstName,
      lastName: MOCK_LOGIN_USER.lastName,
    });
    expect(res.statusCode).toBe(400);
  });

  it('Should throw 400 when no password --> POST /register', async () => {
    const res = await request(app).post('/register').send({
      email: MOCK_LOGIN_USER.email,
      password: '',
      firstName: MOCK_LOGIN_USER.firstName,
      lastName: MOCK_LOGIN_USER.lastName,
    });
    expect(res.statusCode).toBe(400);
  });

  it('Should throw 400 when no firstName --> POST /register', async () => {
    const res = await request(app).post('/register').send({
      email: MOCK_LOGIN_USER.email,
      password: MOCK_LOGIN_USER.password,
      firstName: '',
      lastName: MOCK_LOGIN_USER.lastName,
    });
    expect(res.statusCode).toBe(400);
  });

  it('Should throw 400 when no lastName --> POST /register', async () => {
    const res = await request(app).post('/register').send({
      email: MOCK_LOGIN_USER.email,
      password: MOCK_LOGIN_USER.password,
      firstName: MOCK_LOGIN_USER.firstName,
      lastName: '',
    });
    expect(res.statusCode).toBe(400);
  });
});

describe('\nLOGIN USER', () => {
  it('Should successfully login user --> POST /login', async () => {
    const res = await request(app).post('/login').send({
      email: MOCK_LOGIN_USER.email,
      password: MOCK_LOGIN_USER.password,
    });
    expect(res.statusCode).toBe(200);
    expect(res.body.user.email).toBe(MOCK_LOGIN_USER.email);
    MOCK_USER_TOKEN = res.body.token;
    expect(res.body.token).toBeTruthy();
  });

  it('Should throw 401 when wrong password --> POST /login', async () => {
    const res = await request(app).post('/login').send({
      email: MOCK_LOGIN_USER.email,
      password: 'WRONG_PASSWORD',
    });
    expect(res.statusCode).toBe(401);
  });

  it('Should throw 401 when no password --> POST /login', async () => {
    const res = await request(app).post('/login').send({
      email: MOCK_LOGIN_USER.email,
      password: '',
    });
    expect(res.statusCode).toBe(401);
  });

  it('Should throw 401 when wrong email --> POST /login', async () => {
    const res = await request(app).post('/login').send({
      email: 'WRONG_EMAIL',
      password: MOCK_LOGIN_USER.password,
    });
    expect(res.statusCode).toBe(401);
  });

  it('Should throw 401 when no email --> POST /login', async () => {
    const res = await request(app).post('/login').send({
      email: '',
      password: MOCK_LOGIN_USER.password,
    });
    expect(res.statusCode).toBe(401);
  });
});

describe('\nDELETE USER', () => {
  it('Should successfully delete user --> DELETE /user', async () => {
    const res = await request(app)
      .delete('/user')
      .set('Authorization', `Bearer ${MOCK_USER_TOKEN}`)
      .send({
        email: MOCK_LOGIN_USER.email,
      });
    expect(res.statusCode).toBe(200);
    MOCK_USER_TOKEN = '';
  });

  it('Should throw 401 when user not found --> DELETE /user', async () => {
    const res = await request(app)
      .delete('/user')
      .set('Authorization', `Bearer ${MOCK_USER_TOKEN}`)
      .send({
        email: MOCK_LOGIN_USER.email,
      });
    expect(res.statusCode).toBe(401);
  });
});
