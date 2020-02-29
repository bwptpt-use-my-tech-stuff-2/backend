const router = require('express').Router();
const Reviews = require('../../models/reviews/reviews-model.js');
const authenticate = require('../../middleware/auth.js');

router.post('/', authenticate, (req, res) => {
  const reviewData = req.body;

  if (!reviewData.Review) {
    res.status(400).json({ message: `Required data missing` });
  } else {
    Reviews.createReview(reviewData)
      .then(addedReview => {
        res.status(201).json(addedReview);
      })
      .catch(err => {
        res.status(500).json({ message: `Failed to create new review`, error: err });
      });
  };
});

router.get('/', authenticate, (req, res) => {
  Reviews.readReviews()
    .then(reviews => {
      res.status(200).json(reviews);
    })
    .catch(err => {
      res.status(500).json({ message: `Failed to get reviews` });
    });
});
router.get('/:reviewRef', authenticate, (req, res) => {
  const { reviewRef } = req.params;
  console.log(`TCL: get(/:reviewRef) =`, reviewRef);
  reviewId = parseInt(reviewRef, 10);
  if (reviewId > 0) {
    if (!process.env.NO_LOGGER) console.log(`TCL: readReviewById(${reviewId})`);
    Reviews.readReviewById(reviewId)
      .then(review => {
        if (review) {
          if (!process.env.NO_LOGGER) console.log(`TCL: found:\n`, review);
          res.status(200).json(review);
        } else {
          res.status(404).json({ message: `Could not get review with given id` });
        };
      })
      .catch(err => {
        res.status(500).json({ message: `Failed to get review`, error: err });
      });
  };
});

router.get('/byRental/:rentalId', authenticate, (req, res) => {
  const { rentalId } = req.params;
  console.log(`TCL: get(/byRental/:rentalId) =`, rentalId);
  id = parseInt(rentalId, 10);
  if (id > 0) {
    if (!process.env.NO_LOGGER) console.log(`TCL: readReviewById(${id})`);
    Reviews.readReviewByRentalId(id)
      .then(review => {
        if (review) {
          if (!process.env.NO_LOGGER) console.log(`TCL: found:\n`, review);
          res.status(200).json(review);
        } else {
          res.status(404).json({ message: `Could not get review with given id` });
        };
      })
      .catch(err => {
        res.status(500).json({ message: `Failed to get review`, error: err });
      });
  };
});

router.put('/:reviewId', authenticate, (req, res) => {
  const { reviewId } = req.params;
  const id = parseInt(reviewId, 10);
  const reviewData = req.body;

  if (!process.env.NO_LOGGER) console.log(`TCL: updateReview(${id})`);

  if (!id > 0 || !reviewData.Review) {
    res.status(400).json({ message: `Required data missing` });
  } else {
    Reviews.updateReview(id, reviewData)
      .then(updatedReview => {
        if (updatedReview) {
          res.status(200).json({ updatedReview: id });
        } else {
          res.status(404).json({ message: `Could not get review with given id` });
        };
      })
      .catch(err => {
        res.status(500).json({ message: `Failed to update review`, error: err });
      });
  };
});

router.delete('/:reviewId', authenticate, (req, res) => {
  const { reviewId } = req.params;
  const id = parseInt(reviewId, 10);
  if (!process.env.NO_LOGGER) console.log(`TCL: deleteReview(${id})`);
  if (id > 0) {
    Reviews.deleteReview(id)
      .then(removedReview => {
        if (removedReview) {
          res.status(200).json({ removedReview: id });
        } else {
          res.status(404).json({ message: `Could not get review with given id` });
        };
      })
      .catch(err => {
        res.status(500).json({ message: `Failed to delete review`, error: err });
      });
  };
});

module.exports = router;