const target = 'categories';
const targetTable = 'Categories';
const targetDataUnit = 'Category';
const Categories = require(`../../models/${target}/${target}-model.js`);
const db = require('../../../data/dbConfig.js');

const apiBase = '/api/'+target;
const supertest = require('supertest');
const server = require('../../server.js');

const json = 'application/json';
const moment = require('moment');
const d = moment().format("X");
const t = `AutoTest_${targetDataUnit}_${d}`;

function random(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}


//TODO: Figure out how to mock/bypass auth


describe.skip(target+'-router', () => {

  beforeAll(async (done) => {
    categoryCount = await (await db('Categories')).length;
    conditionCount = await (await db('Conditions')).length;

    done();
  });

  describe('POST '+apiBase, () => {

    it('(missing required data)', async (done) => {
      const reqBody = null;
      const expStatus = 400;
      const resBody = { message: "Required data missing" };
      const res = await supertest(server)
        .post(apiBase)
        .send(reqBody)
        .set('Accept', json)
        ;
      expect(res.status).toBe(expStatus);
      expect(res.type).toBe(json);
      expect(res.body).toEqual(resBody);
      expect(res.body.user).toBeUndefined();

      done();
    });

    it('(valid)', async (done) => {
      const reqBody = {
        Category: t,
      };
      const expStatus = 201;
      const resBody = {
        Category: t,
      };
      const res = await supertest(server)
        .post(apiBase)
        .send(reqBody)
        .set('Accept', json)
        ;
      expect(res.status).toBe(expStatus);
      expect(res.type).toBe('application/json');
      expect(res.body).toMatchObject(resBody);
      expect(res.body.id).toBeGreaterThanOrEqual(1);

      done();
    });

  });


  describe.skip('GET '+apiBase, () => {

    it('should return all records', async (done) => {

      done();
    });

    it('should return specific records by provided id', async (done) => {

      done();
    });

  });


  afterAll(async (done) => {
    const data = await db(targetTable);
    const len = data.length;

    if (len>0) {
      data.forEach(r => {
        if (r.Category.includes('AutoTest_')) {
          Categories.deleteCategory(r.id);
        };
      })
    };

    done();
  });

});
