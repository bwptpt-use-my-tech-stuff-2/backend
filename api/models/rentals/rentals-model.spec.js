const model = 'rentals-model';
const targetTable = 'Rentals';
const targetDataUnit = 'Rental';
const Rentals = require(`./${model}.js`);
const db = require('../../../data/dbConfig.js');

const moment = require('moment');
const d = moment().format("X");
const t = `AutoTest_${targetDataUnit}_${d}`;

function random(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

describe(model, () => {

  let userCount = 0;

  beforeAll(async () => {
    userCount = await (await db('Users')).length;
  });

  describe('create', () => {

    it('should insert and return provided record', async () => {
      if (userCount>0) {
        const data1 = await db(targetTable);
        const len = data1.length;

        const t0 = `${t}_I`;

        const r0 = await Rentals.createRental({ Title: t0, owner_id: random(1,userCount-1), renter_id: random(1,userCount-1), Paid: random(0,1), Returned: random(0,1) });
        expect(r0.Title).toBe(t0);

        const data2 = await db(targetTable);
        expect(data2).toHaveLength(len+1);
      } else {
        expect(userCount).toBeGreaterThan(0);
      };
    });

  });


  describe('read', () => {

    it('should return all records', async () => {
      const data1 = await db(targetTable);
      const len = data1.length;

      if (len>0) {
        const data2 = await Rentals.readRentals();

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

        const data2 = await Rentals.readRentalById(data[r].id);

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

        const data2 = await Rentals.readRentalByTitle(data[r].Title);

        expect(data2.id).toEqual(data1.id);
        expect(data2.Title).toEqual(data1.Title);
      } else {
        expect(len).toBeGreaterThan(0);
      };
    });

  });


  describe('update', () => {

    it('change inserted test record', async () => {
      if (userCount>0) {
        const t0 = `${t}_U`;

        await Rentals.createRental({ Title: t0, owner_id: random(1,userCount-1), renter_id: random(1,userCount-1), Paid: random(0,1), Returned: random(0,1) })
          .then(async (data1) => {
            const d1 = data1.id
            await Rentals.updateRental(data1.id, { Title: 'Updated'+t0 })
            .then(async data2 => {
              const d2 = data2.id
              await expect(d2).toEqual(d1);
              await expect(data2.Title).toEqual('Updated'+t0);
            });
          });
      } else {
        expect(userCount).toBeGreaterThan(0);
      };
    });

  });


  describe('delete', () => {

    it('delete inserted test record', async () => {
      if (userCount>0) {
        const t0 = `${t}_D`;

        await Rentals.createRental({ Title: t0, owner_id: random(1,userCount-1), renter_id: random(1,userCount-1), Paid: random(0,1), Returned: random(0,1) })
          .then(async (data1) => {
            const d1 = data1.id
            await Rentals.deleteRental(data1.id)
            .then(async d2 => {
              await expect(d2).toEqual(d1);
            });
          });
      } else {
        expect(userCount).toBeGreaterThan(0);
      };
    });

  });


  afterAll(async () => {
    const data = await db(targetTable);
    const len = data.length;

    if (len>0) {
      data.forEach(r => {
        if (r.Title.includes('AutoTest')) {
          Rentals.deleteRental(r.id);
        };
      })
    };
  });

});
