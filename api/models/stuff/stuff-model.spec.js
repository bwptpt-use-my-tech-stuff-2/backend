const model = 'stuff-model';
const targetTable = 'Stuff';
const targetDataUnit = 'Stuff';
const Stuff = require(`./${model}.js`);
const db = require('../../../data/dbConfig.js');

const moment = require('moment');
const d = moment().format("X");
const t = `AutoTest_${targetDataUnit}_${d}`;
const pph = random(10,150);

function random(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

describe(model, () => {

  let categoryCount = 0;
  let conditionCount = 0;

  beforeAll(async () => {
    categoryCount = await (await db('Categories')).length;
    conditionCount = await (await db('Conditions')).length;
  });

  describe('create', () => {

    it('should insert and return provided record', async () => {
      if (categoryCount>0 && conditionCount>0) {
        const data1 = await db(targetTable);
        const len = data1.length;

        const t0 = `${t}_I`;

        const r0 = await Stuff.createStuff({
          category_id: random(1,categoryCount-1),
          Title: t0,
          condition_id: random(1,conditionCount-1),
          AddDate: d,
          PricePerHour: pph,
          PricePerDay: pph*6,
          Available: random(0,1),
        });
        expect(r0.category_id).toBeGreaterThanOrEqual(1);
        expect(r0.category_id).toBeLessThanOrEqual(categoryCount);
        expect(r0.Title).toEqual(t0);
        expect(r0.condition_id).toBeGreaterThanOrEqual(1);
        expect(r0.condition_id).toBeLessThanOrEqual(categoryCount);
        expect(r0.AddDate).toEqual(parseInt(d));
        expect(r0.PricePerHour).toEqual(pph);
        expect(r0.PricePerDay).toEqual(pph*6);
        expect(r0.Available).toBeGreaterThanOrEqual(0);
        expect(r0.Available).toBeLessThanOrEqual(1);

        const data2 = await db(targetTable);
        expect(data2).toHaveLength(len+1);
      } else {
        expect(categoryCount).toBeGreaterThan(0);
        expect(conditionCount).toBeGreaterThan(0);
      };
    });

  });


  describe('read', () => {

    it('should return all records', async () => {
      const data1 = await db(targetTable);
      const len = data1.length;

      if (len>0) {
        const data2 = await Stuff.readStuff();

        expect(data2).toHaveLength(len);
        expect(data1[len-1].id).toEqual(data2[len-1].id);
      } else {
        expect(len).toBeGreaterThan(0);
      };
    });

    it('should return specific records by provided id', async () => {
      const data = await db(targetTable);
      const len = data.length;

      if (len>0) {
        const r = random(0, len-1);
        const data1 = data[r];

        const data2 = await Stuff.readStuffById(data[r].id);

        expect(data2.id).toEqual(data1.id);
        expect(data2.Title).toEqual(data1.Title);
      } else {
        expect(len).toBeGreaterThan(0);
      };
    });

    it('should return specific records by provided text', async () => {
      const data = await db(targetTable);
      const len = data.length;

      if (len>0) {
        const r = random(0, len-1);
        const data1 = data[r];

        const data2 = await Stuff.readStuffByTitle(data[r].Title);

        expect(data2.id).toEqual(data1.id);
        expect(data2.Title).toEqual(data1.Title);
      } else {
        expect(len).toBeGreaterThan(0);
      };
    });

  });


  describe('update', () => {

    it('change inserted test record', async () => {
      if (categoryCount>0 && conditionCount>0) {
        const t0 = `${t}_U`;

        await Stuff.createStuff({
          category_id: random(1,categoryCount-1),
          Title: t0,
          condition_id: random(1,conditionCount-1),
          AddDate: d,
          PricePerHour: pph,
          PricePerDay: pph*6,
          Available: random(0,1),
        })
          .then(async (data1) => {
            const d1 = data1.id
            await Stuff.updateStuff(data1.id, { Description: 'AutoTest '+targetDataUnit+' Description' })
            .then(async data2 => {
              const d2 = data2.id
              await expect(d2).toEqual(d1);
              expect(data2.category_id).toBeGreaterThanOrEqual(1);
              expect(data2.category_id).toBeLessThanOrEqual(categoryCount);
              expect(data2.Title).toEqual(t0);
              expect(data2.Description).toEqual('AutoTest '+targetDataUnit+' Description');
              expect(data2.condition_id).toBeGreaterThanOrEqual(1);
              expect(data2.condition_id).toBeLessThanOrEqual(categoryCount);
              expect(data2.AddDate).toEqual(parseInt(d));
              expect(data2.PricePerHour).toEqual(pph);
              expect(data2.PricePerDay).toEqual(pph*6);
              expect(data2.Available).toBeGreaterThanOrEqual(0);
              expect(data2.Available).toBeLessThanOrEqual(1);
            });
          });
      } else {
        expect(categoryCount).toBeGreaterThan(0);
        expect(conditionCount).toBeGreaterThan(0);
      };
    });

  });


  describe('delete', () => {

    it('delete inserted test record', async () => {
      if (categoryCount>0 && conditionCount>0) {
        const t0 = `${t}_D`;

        await Stuff.createStuff({
          category_id: random(1,categoryCount-1),
          Title: t0,
          condition_id: random(1,conditionCount-1),
          AddDate: d,
          PricePerHour: pph,
          PricePerDay: pph*6,
          Available: random(0,1),
        })
          .then(async (data1) => {
            const d1 = data1.id
            await Stuff.deleteStuff(data1.id)
            .then(async d2 => {
              await expect(d2).toEqual(d1);
            });
          });
      } else {
        expect(categoryCount).toBeGreaterThan(0);
        expect(conditionCount).toBeGreaterThan(0);
      };
    });

  });


  afterAll(async () => {
    const data = await db(targetTable);
    const len = data.length;

    if (len>0) {
      data.forEach(r => {
        if (r.Title.includes('AutoTest')) {
          Stuff.deleteStuff(r.id);
        };
      })
    };
  });

});
