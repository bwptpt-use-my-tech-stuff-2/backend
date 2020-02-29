const model = 'categories-model';
const targetTable = 'Categories';
const targetDataUnit = 'Category';
const Categories = require(`./${model}.js`);
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

    it('should insert and return provided record', async (done) => {
      const data1 = await db(targetTable);
      const len = data1.length;

      const c = `AutoTest_${targetDataUnit}_${d}_I`;

      const r0 = await Categories.createCategory({ Category: c });
      expect(r0.Category).toBe(c);

      const data2 = await db(targetTable);
      expect(data2).toHaveLength(len+1);

      done();
    });

    it('should prevent duplicate records', async (done) => {
      const data1 = await db(targetTable);
      const len = data1.length;

      const c = `AutoTest_${targetDataUnit}_${d}_Dupe`;

      try {
        await Categories.createCategory({ Category: c });
        await Categories.createCategory({ Category: c });
      } catch (error) {
        if (error.code != 'SQLITE_CONSTRAINT') {
          if (!process.env.NO_LOGGER) console.log(error);
        };
      };

      const data2 = await db(targetTable);
      expect(data2).toHaveLength(len+1);

      done();
    });

  });


  describe('read', () => {

    it('should return all records', async (done) => {
      const data1 = await db(targetTable);
      const len = data1.length;

      if (len>0) {
        const data2 = await Categories.readCategories();

        expect(data2).toHaveLength(len);
        expect(data1[len-1].id).toEqual(data2[len-1].id);
      } else {
        expect(len).toBeGreaterThan(0);
      };

      done();
    });

    it('should return specific records by provided id', async (done) => {
      const data = await db(targetTable);
      const len = data.length;

      if (len>0) {
        const r = random(0, len-1);
        const data1 = data[r];

        const data2 = await Categories.readCategoryById(data[r].id);

        expect(data2.id).toEqual(data1.id);
        expect(data2.Category).toEqual(data1.Category);
      } else {
        expect(len).toBeGreaterThan(0);
      };

      done();
    });

    it('should return specific records by provided text', async (done) => {
      const data = await db(targetTable);
      const len = data.length;

      if (len>0) {
        const r = random(0, len-1);
        const data1 = data[r];

        const data2 = await Categories.readCategoryByName(data[r].Category);

        expect(data2.id).toEqual(data1.id);
        expect(data2.Category).toEqual(data1.Category);
      } else {
        expect(len).toBeGreaterThan(0);
      };

      done();
    });

  });


  describe('update', () => {

    it('change inserted test record', async (done) => {
      const c = `AutoTest_${targetDataUnit}_${d}_U`;

      await Categories.createCategory({ Category: c })
        .then(async (data1) => {
          const d1 = data1.id
          await Categories.updateCategory(data1.id, { Category: 'Updated'+c })
          .then(async data2 => {
            const d2 = data2.id
            await expect(d2).toEqual(d1);
          });
        });

      done();
    });

  });


  describe('delete', () => {

    it('delete inserted test record', async (done) => {
      const c = `AutoTest_${targetDataUnit}_${d}_D`;

      await Categories.createCategory({ Category: c })
        .then(async (data1) => {
          const d1 = data1.id
          await Categories.deleteCategory(data1.id)
          .then(async d2 => {
            await expect(d2).toEqual(d1);
          });
        });

      done();
    });

  });


  afterAll(async (done) => {
    const data = await db(targetTable);
    const len = data.length;

    if (len>0) {
      data.forEach(r => {
        if (r.Category.includes('AutoTest')) {
          Categories.deleteCategory(r.id);
        };
      })
    };

    done();
  });

});
