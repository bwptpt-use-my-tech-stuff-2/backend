const supertest = require('supertest');
const server = require('../../server.js');

const apiBase = '/api/auth';
const json = 'application/json';

const moment = require('moment');
const d = moment().format("X");


describe('auth-router', () => {

  const apiEndpointRegister = apiBase+'/register';
  describe('POST '+apiEndpointRegister, () => {

    it('(missing required data)', async (done) => {
      const reqBody = null;
      const expStatus = 400;
      const resBody = { message: "Required data missing" };
      const res = await supertest(server).post(apiEndpointRegister);
      expect(res.status).toBe(expStatus);
      expect(res.type).toBe(json);
      expect(res.body).toEqual(resBody);
      expect(res.body.user).toBeUndefined();
      done();
    });

    it('(valid)', async (done) => {
      const password = "T3$tP4$$w0rd!";
      const reqBody = {
        Email: `TestUser_${d}`,
        Password: password,
        FirstName: 'Test',
        LastName: 'User',
        Location: '',
      };
      const expStatus = 201;
      const resBody = {
        Email: `TestUser_${d}`,
        FirstName: 'Test',
        LastName: 'User',
        Location: '',
      };

      const res = await supertest(server)
        .post(apiEndpointRegister)
        .send(reqBody)
        .set('Accept', json)
        ;

      expect(res.status).toBe(expStatus);
      expect(res.type).toBe('application/json');
      expect(res.body).toMatchObject(resBody);
      expect(res.body.id).toBeGreaterThanOrEqual(1);
      expect(res.body.Password).toMatch(/^\$2a\$\d{1,}\$.*/);
      done();
    });

  });


  const apiEndpointLogin = apiBase+'/login';
  describe('POST '+apiEndpointLogin, () => {

    it('(missing required data)', async (done) => {
      const reqBody = null;
      const expStatus = 400;
      const resBody = { message: "Required data missing" };
      const res = await supertest(server).post(apiEndpointLogin);
      expect(res.status).toBe(expStatus);
      expect(res.type).toBe(json);
      expect(res.body).toEqual(resBody);
      expect(res.body.user).toBeUndefined();
      done();
    });

    it('(valid)', async (done) => {
      const u = `TestUser_${d}`;
      const p = "T3$tP4$$w0rd!";
      const f = "Test";

      const reqBody = {
        Email: u,
        Password: p,
        FirstName: f,
        LastName: 'User',
        Location: '',
      };
      const expStatus = 200;
      const resBody = {
        message: `Welcome ${f}!`
      };

      const res = await supertest(server)
        .post(apiEndpointLogin)
        .send(reqBody)
        .set('Accept', json)
        ;

      expect(res.status).toBe(expStatus);
      expect(res.type).toBe('application/json');
      expect(res.body).toMatchObject(resBody);
      expect(res.body.token)
        .toMatch(/[\w|-]{1,}\.{1}[\w|-]{1,}\.{1}[\w|-]{1,}/);
      done();
    });

  });


  afterAll(async () => {
    const model = 'users-model';
    const targetTable = 'Users';
    const Users = require(`../../models/users/${model}.js`);
    const db = require('../../../data/dbConfig.js');

    const data = await db(targetTable);
    const len = data.length;

    if (len>0) {
      data.forEach(r => {
        if (r.Email.includes('TestUser_')) {
          Users.deleteUser(r.id);
        };
      })
    };
  });

});
