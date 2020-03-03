const router = require('express').Router({ mergeParams: true });
const authenticate = require('../middleware/auth.js');

const authRouter = require('./auth/auth-router.js');
const usersRouter = require('./users/users-router.js');
const categoriesRouter = require('./categories/categories-router.js');
const conditionsRouter = require('./conditions/conditions-router.js');
const stuffRouter = require('./stuff/stuff-router.js');
const userFavoriteStuffRouter = require('./user_favoritestuff/user_favoritestuff-router.js');
const userStuffRouter = require('./user_stuff/user_stuff-router.js');
const rentalsRouter = require('./rentals/rentals-router.js');
const rentalStuffRouter = require('./rental_stuff/rental_stuff-router.js');
const reviewsRouter = require('./reviews/reviews-router.js');

router.use('/auth', authRouter);
router.use('/users', authenticate, usersRouter);
router.use('/categories', authenticate, categoriesRouter);
router.use('/conditions', authenticate, conditionsRouter);
router.use('/stuff', authenticate, stuffRouter);
router.use('/users/:userId/favorites', authenticate, userFavoriteStuffRouter);
router.use('/users/:userId/stuff', authenticate, userStuffRouter);
router.use('/rentals', authenticate, rentalsRouter);
router.use('/rentals/:rentalId/stuff', authenticate, rentalStuffRouter);
router.use('/reviews', authenticate, reviewsRouter);

router.get('/', (req, res) => {
  //Direct to living API documentation
  res.status(200).json({documentation: 'https://documenter.getpostman.com/view/2001469/SzKYQxE1?version=latest'});
});

module.exports = router;