import mongoose from 'mongoose';
import request from 'supertest';
import app from '../app';
import MOCK_USER from './mock/mockData';
import user from '../models/user';

let MOCK_USER_TOKEN: string = '';
let NEW_USER_ID: string = '';
let API_TOKEN: any = {};

const DB_PORT = Number(process.env.DB_PORT) || 27017;
const DB_NAME = 'SpendTune-test';

beforeAll(async () => {
  await mongoose.connect(`mongodb://localhost:${DB_PORT}/${DB_NAME}`);
  const res = await request(app).post('/register').send({
    email: MOCK_USER.email,
    password: '123',
    firstName: MOCK_USER.firstName,
    lastName: MOCK_USER.lastName,
  });
  NEW_USER_ID = await res.body.user._id;
  MOCK_USER_TOKEN = await res.body.token;
  await user.findOneAndUpdate({ _id: NEW_USER_ID }, MOCK_USER);
});

afterAll(async () => {
  await user.deleteOne({ _id: NEW_USER_ID });
  MOCK_USER_TOKEN = '';
  await mongoose.connection.close();
});

describe('\nCREATE LINK TOKEN', () => {
  it('Should successfully create link token --> GET /api/create-link-token', async () => {
    const res = await request(app)
      .get('/api/create-link-token')
      .set('Authorization', `Bearer ${MOCK_USER_TOKEN}`)
      .send();
    expect(res.statusCode).toBe(200);
    API_TOKEN = res.body;
    console.log('API_TOKEN: ', API_TOKEN);
  });
});

describe('\nADD CATEGORY', () => {
  it('Should successfully add new category --> POST /category/add', async () => {
    const res = await request(app)
      .post('/category/add')
      .set('Authorization', `Bearer ${MOCK_USER_TOKEN}`)
      .send({
        category: 'taxi',
      });
    expect(res.statusCode).toBe(200);
  });

  it('Should throw 401 if user not found --> POST /category/add', async () => {
    const res = await request(app)
      .post('/category/add')
      .set('Authorization', `Bearer ${'NOT_VALID_TOKEN'}`)
      .send({
        category: 'taxi',
      });
    expect(res.statusCode).toBe(401);
  });
});

describe('\nASSIGN CATEGORY', () => {
  it('Should successfully add new category --> POST /category/assign', async () => {
    const res = await request(app)
      .post('/category/assign')
      .set('Authorization', `Bearer ${MOCK_USER_TOKEN}`)
      .send({
        category: 'taxi',
        id: 'Xdayv4zzwgikvz1rXPxBiQmj56bzGgtb68J4l',
      });
    expect(res.statusCode).toBe(200);
    expect(res.body.transactionsCategorized.length).toBe(1);
  });
});