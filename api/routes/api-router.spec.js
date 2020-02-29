const supertest = require('supertest');
const server = require('../server.js');

const apiBase = '/api';

describe('api-router', () => {

  describe(`GET ${apiBase}`, () => {

    // http status code
    it('should return 200 OK', async (done) => {
      const res = await supertest(server).get(apiBase);
      expect(res.status).toBe(200);

      done();
    });

    // shape of the response
    it('body should include documentation', async (done) => {
      const res = await supertest(server).get(apiBase);
      expect(res.body.documentation).toMatch(/https:\/\/documenter\.getpostman\.com\/view\/.*/);

      done();
    });

  });

});
