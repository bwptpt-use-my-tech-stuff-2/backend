const router = require('express').Router();
const authenticate = require('../middleware/auth.js');

const authRouter = require('./auth/auth-router.js');
const usersRouter = require('./users/users-router.js');
const categoriesRouter = require('./categories/categories-router.js');
const conditionsRouter = require('./conditions/conditions-router.js');
const stuffRouter = require('./stuff/stuff-router.js');
const rentalsRouter = require('./rentals/rentals-router.js');
const reviewsRouter = require('./reviews/reviews-router.js');

const moment = require('moment');

router.use('/auth', authRouter);
router.use('/users', authenticate, usersRouter);
// router.use('/categories', authenticate, categoriesRouter);
// router.use('/conditions', authenticate, conditionsRouter);
// router.use('/stuff', authenticate, stuffRouter);
// router.use('/rentals', authenticate, rentalsRouter);
// router.use('/reviews', authenticate, reviewsRouter);

router.get('/', (req, res) => {
  res.sendStatus(204);  //No Content
});

module.exports = router;