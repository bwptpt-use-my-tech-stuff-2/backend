const model = 'conditions-model';
const targetTable = 'Conditions';
const targetDataUnit = 'Condition';
const Conditions = require(`./${model}.js`);
const db = require('../../../data/dbConfig.js');

const moment = require('moment');
const d = moment().format("X");

function random(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

describe(model, () => {

  describe('create', () => {

    it('should insert and return provided record', async () => {
      const data1 = await db(targetTable);
      const len = data1.length;

      const c = `AutoTest_${targetDataUnit}_${d}_I`;

      const r0 = await Conditions.createCondition({ Condition: c });
      expect(r0.Condition).toBe(c);

      const data2 = await db(targetTable);
      expect(data2).toHaveLength(len+1);
    });

    it('should prevent duplicate records', async () => {
      const data1 = await db(targetTable);
      const len = data1.length;

      const c = `AutoTest_${targetDataUnit}_${d}_Dupe`;

      try {
        await Conditions.createCondition({ Condition: c });
        await Conditions.createCondition({ Condition: c });
      } catch (error) {
        if (error.code != 'SQLITE_CONSTRAINT') {
          if (!process.env.NO_LOGGER) console.log(error);
        };
      };

      const data2 = await db(targetTable);
      expect(data2).toHaveLength(len+1);
    });

  });


  describe('read', () => {

    it('should return all records', async () => {
      const data1 = await db(targetTable);
      const len = data1.length;

      if (len>0) {
        const data2 = await Conditions.readConditions();

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

        const data2 = await Conditions.readConditionById(data[r].id);

        expect(data2.id).toEqual(data1.id);
        expect(data2.Condition).toEqual(data1.Condition);
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

        const data2 = await Conditions.readConditionByName(data[r].Condition);

        expect(data2.id).toEqual(data1.id);
        expect(data2.Condition).toEqual(data1.Condition);
      } else {
        expect(len).toBeGreaterThan(0);
      };
    });

  });


  describe('update', () => {

    it('change inserted test record', async () => {
      const c = `AutoTest_${targetDataUnit}_${d}_U`;

      await Conditions.createCondition({ Condition: c })
        .then(async (data1) => {
          const d1 = data1.id
          await Conditions.updateCondition(data1.id, { Condition: 'Updated'+c })
          .then(async data2 => {
            const d2 = data2.id
            await expect(d2).toEqual(d1);
          });
        });
    });

  });


  describe('delete', () => {

    it('delete inserted test record', async () => {
      const c = `AutoTest_${targetDataUnit}_${d}_D`;

      await Conditions.createCondition({ Condition: c })
        .then(async (data1) => {
          const d1 = data1.id
          await Conditions.deleteCondition(data1.id)
          .then(async d2 => {
            await expect(d2).toEqual(d1);
          });
        });
    });

  });


  afterAll(async () => {
    const data = await db(targetTable);
    const len = data.length;

    if (len>0) {
      data.forEach(r => {
        if (r.Condition.includes('AutoTest')) {
          Conditions.deleteCondition(r.id);
        };
      })
    };
  });

});
