import { initialize } from './server';
import * as request from 'supertest';

request(initialize(null, null))
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
