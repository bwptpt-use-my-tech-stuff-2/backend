const router = require('express').Router();
const UserStuff = require('../../models/user_stuff/user_stuff-model.js');
const authenticate = require('../../middleware/auth.js');

router.post('/', authenticate, (req, res) => {
  const userStuffData = req.body;
  console.log(`userStuffData`, userStuffData);

  if (!userStuffData.user_id || !userStuffData.stuff_id) {
    res.status(400).json({ message: `Required data missing` });
  } else {
    UserStuff.createUserStuff(userStuffData)
      .then(addedUserStuff => {
        console.log(`addedUserStuff`, addedUserStuff);
        res.status(201).json(addedUserStuff);
      })
      .catch(err => {
        res.status(500).json({ message: `Failed to create new user stuff`, error: err });
      });
  };
});

router.get('/', authenticate, (req, res) => {
  UserStuff.readUserStuff()
    .then(user_stuff => {
      res.status(200).json(user_stuff);
    })
    .catch(err => {
      res.status(500).json({ message: `Failed to get user_stuff` });
    });
});
router.get('/:userStuffRef', authenticate, (req, res) => {
  const { userStuffRef } = req.params;
  console.log(`TCL: get(/:userStuffRef) =`, userStuffRef);
  userStuffId = parseInt(userStuffRef, 10);
  if (userStuffId > 0) {
    if (!process.env.NO_LOGGER) console.log(`TCL: readUserStuffByIds(${userStuffId})`);
    UserStuff.readUserStuffByUserId(userStuffId)
      .then(userStuff => {
        if (userStuff) {
          if (!process.env.NO_LOGGER) console.log(`TCL: found:\n`, userStuff);
          res.status(200).json(userStuff);
        } else {
          res.status(404).json({ message: `Could not get user stuff with given id` });
        };
      })
      .catch(err => {
        res.status(500).json({ message: `Failed to get user stuff`, error: err });
      });
  };
});

router.delete('/:userId/:stuffId', authenticate, (req, res) => {
  const { userId, stuffId } = req.params;
  const uId = parseInt(userId, 10);
  const sId = parseInt(stuffId, 10);
  if (!process.env.NO_LOGGER) console.log(`TCL: deleteUserStuff(${uId}, ${sId})`);
  if (uId > 0 && sId > 0) {
    UserStuff.deleteUserStuff(uId, sId)
      .then(removedUserStuff => {
        if (removedUserStuff) {
          res.status(200).json({ removedUserStuff: sId });
        } else {
          res.status(404).json({ message: `Could not get user stuff with given ids` });
        };
      })
      .catch(err => {
        res.status(500).json({ message: `Failed to delete user stuff`, error: err });
      });
  };
});

module.exports = router;