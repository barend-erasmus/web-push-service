import { app } from './server';
import * as request from 'supertest';

request(app)
  .post('/client')
  .send({
    endpoint: 'https://example.com',
  })
  .expect(200)
  .end((error: Error, response: any) => {
    if (error) {
      throw error;
    }
  });
