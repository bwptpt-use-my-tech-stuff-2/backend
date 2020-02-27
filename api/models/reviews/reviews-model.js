const db = require('../../../data/dbConfig.js');

module.exports = {
  createReview,
  readReviews,
  readReviewById,
  readReviewByRentalId,
  updateReview,
  deleteReview,
};

function createReview(review) {
  if (review) {
    return db("Reviews")
      .insert(review)
      .then(u => this.readReviewById(u[0]));
  } else {
    return null;
  };
};

function readReviews() {
  return db("Reviews");
};
function readReviewById(id) {
  if (id) {
    return db("Reviews")
      .where("id", id)
      .first();
  } else {
    return null;
  };
};
function readReviewByRentalId(rental_id) {
  if (rental_id) {
    return db("Reviews")
      .where("rental_id", rental_id)
      .first();
  } else {
    return null;
  };
};

function updateReview(id, reviewUpdate) {
  if (id && reviewUpdate) {
    return db("Reviews")
      .update(reviewUpdate)
      .then(count => (count > 0 ? this.readReviewById(id) : null));
  } else {
    return null;
  };
};

function deleteReview(id) {
  if (id) {
    return db("Reviews")
      .where("id", id)
      .del();
  } else {
    return null;
  };
};