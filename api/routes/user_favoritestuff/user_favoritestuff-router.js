const router = require('express').Router();
const UserFavoriteStuff = require('../../models/user_favoritestuff/user_favoritestuff-model.js');
const authenticate = require('../../middleware/auth.js');

router.post('/', authenticate, (req, res) => {
  const userFavoriteStuffData = req.body;

  if (!userFavoriteStuffData.user_id || !userFavoriteStuffData.stuff_id) {
    res.status(400).json({ message: `Required data missing` });
  } else {
    if (!userFavoriteStuffData.Paid) userFavoriteStuffData.Paid = false;
    if (!userFavoriteStuffData.Returned) userFavoriteStuffData.Returned = false;

    UserFavoriteStuff.createUserFavoriteStuff(userFavoriteStuffData)
      .then(addedUserFavoriteStuff => {
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
    if (!process.env.NO_LOGGER) console.log(`TCL: readUserFavoriteStuffById(${userFavoriteStuffId})`);
    UserFavoriteStuff.readUserFavoriteStuffById(userFavoriteStuffId)
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

// router.put('/:userFavoriteStuffId', authenticate, (req, res) => {
//   const { userFavoriteStuffId } = req.params;
//   const id = parseInt(userFavoriteStuffId, 10);
//   const userFavoriteStuffData = req.body;

//   if (!process.env.NO_LOGGER) console.log(`TCL: updateUserFavoriteStuff(${id})`);

//   if (!userFavoriteStuffData.user_id && !userFavoriteStuffData.stuff_id) {
//     res.status(400).json({ message: `Required data missing` });
//   } else {
//     if (id > 0) {
//       UserFavoriteStuff.updateUserFavoriteStuff(id, userFavoriteStuffData)
//         .then(updatedUserFavoriteStuff => {
//           if (updatedUserFavoriteStuff) {
//             res.status(200).json({ updatedUserFavoriteStuff: id });
//           } else {
//             res.status(404).json({ message: `Could not get user favorite stuff with given id` });
//           };
//         })
//         .catch(err => {
//           res.status(500).json({ message: `Failed to update user favorite stuff`, error: err });
//         });
//     };
//   };
// });

router.delete('/:userFavoriteStuffId', authenticate, (req, res) => {
  const { userFavoriteStuffId } = req.params;
  const uId = parseInt(userFavoriteStuffId, 10);
  if (!process.env.NO_LOGGER) console.log(`TCL: deleteUserFavoriteStuff(${uId})`);
  if (uId > 0) {
    UserFavoriteStuff.deleteUserFavoriteStuff(uId)
      .then(removedUserFavoriteStuff => {
        if (removedUserFavoriteStuff) {
          res.status(200).json({ removedUserFavoriteStuff: uId });
        } else {
          res.status(404).json({ message: `Could not get user favorite stuff with given id` });
        };
      })
      .catch(err => {
        res.status(500).json({ message: `Failed to delete user favorite stuff`, error: err });
      });
  };
});

module.exports = router;