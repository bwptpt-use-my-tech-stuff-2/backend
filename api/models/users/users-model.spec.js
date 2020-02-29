const model = 'users-model';
const targetTable = 'Users';
const targetDataUnit = 'User';
const Users = require(`./${model}.js`);
const db = require('../../../data/dbConfig.js');

const moment = require('moment');
const d = moment().format("X");
const fA = ['Fred','Barney','Wilma','Betty','Pebbles','BamBam'];
const lA = ['Flintstone','Rubble'];
const tT = `AutoTest_${targetDataUnit}`;
let f, l, t;

const p = "T3$tP4$$w0rd!";

function random(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}


describe(model, () => {

  beforeEach(() => {
    f = fA[random(0,fA.length-1)];
    l = lA[random(0,lA.length-1)];
    t = `${tT}-${f}.${l}_${d}`;
  });


  describe('create', () => {

    it('should insert and return provided record', async () => {
      const data1 = await db(targetTable);
      const len = data1.length;

      const t0 = `${t}_I@example.com`;

      const r0 = await Users.createUser({ Email: t0, Password: p, FirstName: f, LastName: l, Location: `Location ${d}`, Phone: d });
      expect(r0.Email).toBe(t0);
      expect(r0.Password).toBe(p);
      expect(r0.FirstName).toBe(f);
      expect(r0.LastName).toBe(l);
      expect(r0.Location).toBe('Location '+d);
      expect(r0.Phone).toBe(d);

      const data2 = await db(targetTable);
      expect(data2).toHaveLength(len+1);
    });

  });


  describe('read', () => {

    it('should return all records', async () => {
      const data1 = await db(targetTable);
      const len = data1.length;

      if (len>0) {
        const data2 = await Users.readUsers();

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

        const data2 = await Users.readUserById(data[r].id);

        expect(data2.id).toEqual(data1.id);
        expect(data2.Email).toEqual(data1.Email);
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

        const data2 = await Users.readUserByName(data[r].Email);

        expect(data2.id).toEqual(data1.id);
        expect(data2.Email).toEqual(data1.Email);
      } else {
        expect(len).toBeGreaterThan(0);
      };
    });

  });


  describe('update', () => {

    it('change inserted test record', async () => {
      const t0 = `${t}_U@example.com`;

      await Users.createUser({ Email: t0, Password: p, FirstName: f, LastName: l, Location: `Location ${d}`, Phone: d })
        .then(async (data1) => {
          const d1 = data1.id
          await Users.updateUser(data1.id, { Location: 'Updated Location '+d })
          .then(async data2 => {
            const d2 = data2.id
            await expect(d2).toEqual(d1);
            await expect(data2.Location).toEqual('Updated Location '+d);
          });
        });
    });

  });


  describe('delete', () => {

    it('delete inserted test record', async () => {
      const t0 = `${t}_D@example.com`;

      await Users.createUser({ Email: t0, Password: p, FirstName: f, LastName: l, Location: `Location ${d}`, Phone: d })
        .then(async (data1) => {
          const d1 = data1.id
          await Users.deleteUser(data1.id)
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
        if (r.Email.includes('AutoTest')) {
          Users.deleteUser(r.id);
        };
      })
    };
  });

});
