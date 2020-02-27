const supertest = require('supertest');
const server = require('../server.js');

const apiBase = '/api';

describe('api-router', () => {

  describe(`GET ${apiBase}`, () => {

    // http status code
    it('should return 204 No Content', async (done) => {
      const res = await supertest(server).get(apiBase);
      expect(res.status).toBe(204);
      done();
    });
  
    // shape of the response
    it('body should be empty', async (done) => {
      const body = {};
      const res = await supertest(server).get(apiBase);
      expect(res.body).toEqual(body);
      done();
    });

  });

});
