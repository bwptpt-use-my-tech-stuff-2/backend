const router = require('express').Router();
const UserFavoriteStuff = require('../../models/user_favoritestuff/user_favoritestuff-model.js');
const authenticate = require('../../middleware/auth.js');

router.post('/', authenticate, (req, res) => {
  const userFavoriteStuffData = req.body;
  console.log(`userFavoriteStuffData`, userFavoriteStuffData);

  if (!userFavoriteStuffData.user_id || !userFavoriteStuffData.stuff_id) {
    res.status(400).json({ message: `Required data missing` });
  } else {
    UserFavoriteStuff.createUserFavoriteStuff(userFavoriteStuffData)
      .then(addedUserFavoriteStuff => {
        console.log(`addedUserFavoriteStuff`, addedUserFavoriteStuff);
        res.status(201).json(addedUserFavoriteStuff);
      })
      .catch(err => {
        res.status(500).json({ message: `Failed to create new user favorite stuff`, error: err });
      });
  };
});

router.get('/', authenticate, (req, res) => {
  UserFavoriteStuff.readUserFavoriteStuff()
    .then(user_favoritestuff => {
      res.status(200).json(user_favoritestuff);
    })
    .catch(err => {
      res.status(500).json({ message: `Failed to get user_favoritestuff` });
    });
});
router.get('/:userFavoriteStuffRef', authenticate, (req, res) => {
  const { userFavoriteStuffRef } = req.params;
  console.log(`TCL: get(/:userFavoriteStuffRef) =`, userFavoriteStuffRef);
  userFavoriteStuffId = parseInt(userFavoriteStuffRef, 10);
  if (userFavoriteStuffId > 0) {
    if (!process.env.NO_LOGGER) console.log(`TCL: readUserFavoriteStuffByUserId(${userFavoriteStuffId})`);
    UserFavoriteStuff.readUserFavoriteStuffByUserId(userFavoriteStuffId)
      .then(userFavoriteStuff => {
        if (userFavoriteStuff) {
          if (!process.env.NO_LOGGER) console.log(`TCL: found:\n`, userFavoriteStuff);
          res.status(200).json(userFavoriteStuff);
        } else {
          res.status(404).json({ message: `Could not get user favorite stuff with given id` });
        };
      })
      .catch(err => {
        res.status(500).json({ message: `Failed to get user favorite stuff`, error: err });
      });
  };
});

router.delete('/:userId/:stuffId', authenticate, (req, res) => {
  const { userId, stuffId } = req.params;
  const uId = parseInt(userId, 10);
  const sId = parseInt(stuffId, 10);
  if (!process.env.NO_LOGGER) console.log(`TCL: deleteUserFavoriteStuff(${uId}, ${sId})`);
  if (uId > 0 && sId > 0) {
    UserFavoriteStuff.deleteUserFavoriteStuff(uId, sId)
      .then(removedUserFavoriteStuff => {
        if (removedUserFavoriteStuff) {
          res.status(200).json({ removedUserFavoriteStuff: sId });
        } else {
          res.status(404).json({ message: `Could not get user favorite stuff with given ids` });
        };
      })
      .catch(err => {
        res.status(500).json({ message: `Failed to delete user favorite stuff`, error: err });
      });
  };
});

module.exports = router;