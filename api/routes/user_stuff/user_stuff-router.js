const router = require('express').Router();
const UserStuff = require('../../models/user_stuff/user_stuff-model.js');
const authenticate = require('../../middleware/auth.js');

router.post('/', authenticate, (req, res) => {
  const userStuffData = req.body;

  if (!userStuffData.user_id || !userStuffData.stuff_id) {
    res.status(400).json({ message: `Required data missing` });
  } else {
    if (!userStuffData.Paid) userStuffData.Paid = false;
    if (!userStuffData.Returned) userStuffData.Returned = false;

    UserStuff.createUserStuff(userStuffData)
      .then(addedUserStuff => {
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
    if (!process.env.NO_LOGGER) console.log(`TCL: readUserStuffById(${userStuffId})`);
    UserStuff.readUserStuffById(userStuffId)
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

// router.put('/:userStuffId', authenticate, (req, res) => {
//   const { userStuffId } = req.params;
//   const id = parseInt(userStuffId, 10);
//   const userStuffData = req.body;

//   if (!process.env.NO_LOGGER) console.log(`TCL: updateUserStuff(${id})`);

//   if (!userStuffData.user_id && !userStuffData.stuff_id) {
//     res.status(400).json({ message: `Required data missing` });
//   } else {
//     if (id > 0) {
//       UserStuff.updateUserStuff(id, userStuffData)
//         .then(updatedUserStuff => {
//           if (updatedUserStuff) {
//             res.status(200).json({ updatedUserStuff: id });
//           } else {
//             res.status(404).json({ message: `Could not get user stuff with given id` });
//           };
//         })
//         .catch(err => {
//           res.status(500).json({ message: `Failed to update user stuff`, error: err });
//         });
//     };
//   };
// });

router.delete('/:userStuffId', authenticate, (req, res) => {
  const { userStuffId } = req.params;
  const uId = parseInt(userStuffId, 10);
  if (!process.env.NO_LOGGER) console.log(`TCL: deleteUserStuff(${uId})`);
  if (uId > 0) {
    UserStuff.deleteUserStuff(uId)
      .then(removedUserStuff => {
        if (removedUserStuff) {
          res.status(200).json({ removedUserStuff: uId });
        } else {
          res.status(404).json({ message: `Could not get user stuff with given id` });
        };
      })
      .catch(err => {
        res.status(500).json({ message: `Failed to delete user stuff`, error: err });
      });
  };
});

module.exports = router;