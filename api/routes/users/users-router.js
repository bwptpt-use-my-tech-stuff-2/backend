const router = require('express').Router();
const Users = require('../../models/users/users-model.js');
const authenticate = require('../../middleware/auth.js');

router.post('/', authenticate, (req, res) => {
  const userData = req.body;

  if (!userData.username || !userData.password) {
    res.status(400).json({ message: `Required data missing` });
  } else {
    Users.createUser(userData)
      .then(addedUser => {
        res.status(201).json(addedUser);
      })
      .catch(err => {
        res.status(500).json({ message: `Failed to create new user` });
      });
  };
});

router.get('/', authenticate, (req, res) => {
  Users.readUsers()
    .then(users => {
      res.status(200).json(users);
    })
    .catch(err => {
      res.status(500).json({ message: `Failed to get users` });
    });
});
router.get('/:userRef', authenticate, (req, res) => {
  const { userRef } = req.params;
  console.log(`TCL: get(/:userRef) =`, userRef);
  userId = parseInt(userRef, 10);
  if (userId > 0) {
    if (!process.env.NO_LOGGER) console.log(`TCL: readUserById(${userId})`);
    Users.readUserById(userId)
      .then(user => {
        if (user) {
          if (!process.env.NO_LOGGER) console.log(`TCL: found:\n`, user);
          res.status(200).json({ userData: user });
        } else {
          res.status(404).json({ message: `Could not get user with given id` });
        };
      })
      .catch(err => {
        res.status(500).json({ message: `Failed to get user` });
      });
  } else {
    username = userRef;
    if (!process.env.NO_LOGGER) console.log(`TCL: readUserByName(${username})`);
    Users.readUserByName(username)
      .then(user => {
        if (user) {
          if (!process.env.NO_LOGGER) console.log(`TCL: found:\n`, user);
          res.status(200).json({ userData: user });
        } else {
          res.status(404).json({ message: `Could not get user with given name` });
        };
      })
      .catch(err => {
        res.status(500).json({ message: `Failed to get user` });
      });
  };
});

router.delete('/:userId', authenticate, (req, res) => {
  const { userId } = req.params;
  const uId = parseInt(userId, 10);
  if (!process.env.NO_LOGGER) console.log(`TCL: deleteUser(${uId})`);
  if (uId > 0) {
    Users.deleteUser(uId)
      .then(removedUser => {
        if (removedUser) {
          res.status(200).json({ removedUser: uId });
        } else {
          res.status(404).json({ message: `Could not get user with given id` });
        };
      })
      .catch(err => {
        res.status(500).json({ message: `Failed to delete user` });
      });
  };
});

module.exports = router;