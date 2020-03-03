const db = require('../../../data/dbConfig.js');

module.exports = {
  createReview,
  readReviews,
  readReviewById,
  readReviewByRentalId,
  updateReview,
  deleteReview,
};

async function createReview(review) {
  if (review) {
    return await db("Reviews")
      .insert(review)
      .then(u => this.readReviewById(u[0]));
  } else {
    return null;
  };
};

async function readReviews() {
  return await db("Reviews");
};
async function readReviewById(id) {
  if (id) {
    return await db("Reviews")
      .where("id", id)
      .first();
  } else {
    return null;
  };
};
async function readReviewByRentalId(rental_id) {
  if (rental_id) {
    return await db("Reviews")
      .where("rental_id", rental_id)
      .first();
  } else {
    return null;
  };
};

async function updateReview(id, reviewUpdate) {
  if (id && reviewUpdate) {
    return await db("Reviews")
      .where("id", id)
      .update(reviewUpdate)
      .then(count => (count > 0 ? this.readReviewById(id) : null));
  } else {
    return null;
  };
};

async function deleteReview(id) {
  if (id) {
    return await db("Reviews")
      .where("id", id)
      .del()
      .then(count => (count > 0 ? id : null));
  } else {
    return null;
  };
};