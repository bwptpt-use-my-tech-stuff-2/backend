const router = require('express').Router();
const Users = require('../../models/users/users-model.js');
const authenticate = require('../../middleware/auth.js');

router.post('/', authenticate, (req, res) => {
  const userData = req.body;

  if (!userData.Email || !userData.Password) {
    res.status(400).json({ message: `Required data missing` });
  } else {
    Users.createUser(userData)
      .then(addedUser => {
        res.status(201).json(addedUser);
      })
      .catch(err => {
        res.status(500).json({ message: `Failed to create new user`, error: err });
      });
  };
});

router.get('/', authenticate, (req, res) => {
  Users.readUsers()
    .then(users => {
      res.status(200).json(users);
    })
    .catch(err => {
      res.status(500).json({ message: `Failed to get users`, error: err });
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
          //TODO: Merge additional data associated with user
          // Users.readUserBlahByUserId(user.id)
          //   .then(userBlah => {
          //     if (userBlah) {
          //       newUser = { roles: userBlah, ...user };
          //       user = newUser;
          //     }
          //   });
          res.status(200).json(user);
        } else {
          res.status(404).json({ message: `Could not get user with given id` });
        };
      })
      .catch(err => {
        res.status(500).json({ message: `Failed to get user`, error: err });
      });
  } else {
    email = userRef;
    if (!process.env.NO_LOGGER) console.log(`TCL: readUserByEmail(${email})`);
    Users.readUserByEmail(email)
      .then(user => {
        if (user) {
          if (!process.env.NO_LOGGER) console.log(`TCL: found:\n`, user);
          //TODO: Merge additional data associated with user
          // Users.readUserBlahByUserId(user.id)
          //   .then(userBlah => {
          //     if (userBlah) {
          //       newUser = { roles: userBlah, ...user };
          //       user = newUser;
          //     }
          //   });
          res.status(200).json(user);
        } else {
          res.status(404).json({ message: `Could not get user with given email` });
        };
      })
      .catch(err => {
        res.status(500).json({ message: `Failed to get user`, error: err });
      });
  };
});

router.put('/:userId', authenticate, (req, res) => {
  const { userId } = req.params;
  const id = parseInt(userId, 10);
  const userData = req.body;

  if (!process.env.NO_LOGGER) console.log(`TCL: updateUser(${id})`);

  if (!userData.Email && !userData.Password && !userData.FirstName && !userData.LastName && !userData.Location) {
    res.status(400).json({ message: `Required data missing` });
  } else {
    if (id > 0) {
      Users.updateUser(id, userData)
        .then(removedUser => {
          if (removedUser) {
            res.status(200).json({ updatedUser: id });
          } else {
            res.status(404).json({ message: `Could not get user with given id` });
          };
        })
        .catch(err => {
          res.status(500).json({ message: `Failed to update user`, error: err });
        });
    };
  };
});

router.delete('/:userId', authenticate, (req, res) => {
  const { userId } = req.params;
  const id = parseInt(userId, 10);
  if (!process.env.NO_LOGGER) console.log(`TCL: deleteUser(${id})`);
  if (id > 0) {
    Users.deleteUser(id)
      .then(removedUser => {
        if (removedUser) {
          res.status(200).json({ removedUser: id });
        } else {
          res.status(404).json({ message: `Could not get user with given id` });
        };
      })
      .catch(err => {
        res.status(500).json({ message: `Failed to delete user`, error: err });
      });
  };
});

module.exports = router;