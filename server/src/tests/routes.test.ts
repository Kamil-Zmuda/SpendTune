import request from 'supertest';
import app from '../app';

describe('TEST 404', () => {
  it('Should throw 404 --> GET /unknown-route', async () => {
    const res = await request(app).get('/unknown-route').send();
    expect(res.statusCode).toBe(404);
  });
});
