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
        res.status(500).json({ message: `Failed to create new review` });
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
          res.status(200).json({ reviewData: review });
        } else {
          res.status(404).json({ message: `Could not get review with given id` });
        };
      })
      .catch(err => {
        res.status(500).json({ message: `Failed to get review` });
      });
  };
});

router.get('/byRental/:rentalId', authenticate, (req, res) => {
  const { reviewRef: rentalId } = req.params;
  console.log(`TCL: get(/:reviewRef) =`, rentalId);
  rId = parseInt(rentalId, 10);
  if (rId > 0) {
    if (!process.env.NO_LOGGER) console.log(`TCL: readReviewById(${rId})`);
    Reviews.readReviewById(rId)
      .then(review => {
        if (review) {
          if (!process.env.NO_LOGGER) console.log(`TCL: found:\n`, review);
          res.status(200).json({ reviewData: review });
        } else {
          res.status(404).json({ message: `Could not get review with given id` });
        };
      })
      .catch(err => {
        res.status(500).json({ message: `Failed to get review` });
      });
  } else {
    reviewName = rentalId;
    if (!process.env.NO_LOGGER) console.log(`TCL: readReviewByRentalId(${reviewName})`);
    Reviews.readReviewByRentalId(reviewName)
      .then(review => {
        if (review) {
          if (!process.env.NO_LOGGER) console.log(`TCL: found:\n`, review);
          res.status(200).json({ reviewData: review });
        } else {
          res.status(404).json({ message: `Could not get review with given name` });
        };
      })
      .catch(err => {
        res.status(500).json({ message: `Failed to get review` });
      });
  };
});

router.put('/:reviewId', authenticate, (req, res) => {
  const { reviewId } = req.params;
  const uId = parseInt(reviewId, 10);
  const reviewData = req.body;

  if (!process.env.NO_LOGGER) console.log(`TCL: updateReview(${uId})`);

  if (!uID > 0 || !reviewData.Review) {
    res.status(400).json({ message: `Required data missing` });
  } else {
    Reviews.updateReview(uId, reviewData)
      .then(updatedReview => {
        if (updatedReview) {
          res.status(200).json({ updatedReview: uId });
        } else {
          res.status(404).json({ message: `Could not get review with given id` });
        };
      })
      .catch(err => {
        res.status(500).json({ message: `Failed to update review` });
      });
  };
});

router.delete('/:reviewId', authenticate, (req, res) => {
  const { reviewId } = req.params;
  const uId = parseInt(reviewId, 10);
  if (!process.env.NO_LOGGER) console.log(`TCL: deleteReview(${uId})`);
  if (uId > 0) {
    Reviews.deleteReview(uId)
      .then(removedReview => {
        if (removedReview) {
          res.status(200).json({ removedReview: uId });
        } else {
          res.status(404).json({ message: `Could not get review with given id` });
        };
      })
      .catch(err => {
        res.status(500).json({ message: `Failed to delete review` });
      });
  };
});

module.exports = router;