const model = 'reviews-model';
const targetTable = 'Reviews';
const targetDataUnit = 'Review';
const Reviews = require(`./${model}.js`);
const db = require('../../../data/dbConfig.js');

function random(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

describe(model, () => {

  let rentalCount = 0;

  beforeAll(async () => {
    rentalCount = await (await db('Rentals')).length;
  });

  describe('create', () => {

    it('should insert and return provided record', async () => {
      if (rentalCount>0) {
        const data1 = await db(targetTable);
        const len = data1.length;

        const r0 = await Reviews.createReview({ rental_id: random(1,rentalCount-1), OwnerRatingOfRenter: random(1,5), RenterRatingOfOwner: random(1,5), OwnerFeedback: 'AutoTest Owner '+targetDataUnit, RenterFeedback: 'AutoTest Renter '+targetDataUnit });
        expect(r0.OwnerRatingOfRenter).toBeGreaterThanOrEqual(1);
        expect(r0.OwnerRatingOfRenter).toBeLessThanOrEqual(5);
        expect(r0.RenterRatingOfOwner).toBeGreaterThanOrEqual(1);
        expect(r0.RenterRatingOfOwner).toBeLessThanOrEqual(5);
        expect(r0.OwnerFeedback).toEqual('AutoTest Owner Review');
        expect(r0.RenterFeedback).toEqual('AutoTest Renter Review');

        const data2 = await db(targetTable);
        expect(data2).toHaveLength(len+1);
      } else {
        expect(rentalCount).toBeGreaterThan(0);
      };
    });

  });


  describe('read', () => {

    it('should return all records', async () => {
      const data1 = await db(targetTable);
      const len = data1.length;

      if (len>0) {
        const data2 = await Reviews.readReviews();

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

        const data2 = await Reviews.readReviewById(data[r].id);

        expect(data2.id).toEqual(data1.id);
        expect(data2.Title).toEqual(data1.Title);
      } else {
        expect(len).toBeGreaterThan(0);
      };
    });

  });


  describe('update', () => {

    it('change inserted test record', async () => {
      if (rentalCount>0) {
        await Reviews.createReview({ rental_id: random(1,rentalCount-1) })
          .then(async (data1) => {
            const d1 = data1.id
            await Reviews.updateReview(data1.id, { OwnerRatingOfRenter: random(1,5), RenterRatingOfOwner: random(1,5), OwnerFeedback: 'AutoTest Owner '+targetDataUnit, RenterFeedback: 'AutoTest Renter '+targetDataUnit })
            .then(async data2 => {
              const d2 = data2.id
              await expect(d2).toEqual(d1);
              expect(data2.OwnerRatingOfRenter).toBeGreaterThanOrEqual(1);
              expect(data2.OwnerRatingOfRenter).toBeLessThanOrEqual(5);
              expect(data2.RenterRatingOfOwner).toBeGreaterThanOrEqual(1);
              expect(data2.RenterRatingOfOwner).toBeLessThanOrEqual(5);
              expect(data2.OwnerFeedback).toEqual('AutoTest Owner Review');
              expect(data2.RenterFeedback).toEqual('AutoTest Renter Review');
            });
          });
      } else {
        expect(rentalCount).toBeGreaterThan(0);
      };
    });

  });


  describe('delete', () => {

    it('delete inserted test record', async () => {
      if (rentalCount>0) {
        await Reviews.createReview({ rental_id: random(1,rentalCount-1), OwnerRatingOfRenter: random(1,5), RenterRatingOfOwner: random(1,5), OwnerFeedback: 'AutoTest Owner '+targetDataUnit, RenterFeedback: 'AutoTest Renter '+targetDataUnit })
          .then(async (data1) => {
            const d1 = data1.id
            await Reviews.deleteReview(data1.id)
            .then(async d2 => {
              await expect(d2).toEqual(d1);
            });
          });
      } else {
        expect(rentalCount).toBeGreaterThan(0);
      };
    });

  });


  afterAll(async () => {
    const data = await db(targetTable);
    const len = data.length;

    if (len>0) {
      data.forEach(r => {
        if (r.OwnerFeedback.includes('AutoTest') || r.RenterFeedback.includes('AutoTest')) {
          Reviews.deleteReview(r.id);
        };
      })
    };
  });

});
