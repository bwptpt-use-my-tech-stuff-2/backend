const router = require('express').Router();
const RentalStuff = require('../../models/rental_stuff/rental_stuff-model.js');
const authenticate = require('../../middleware/auth.js');

router.post('/', authenticate, (req, res) => {
  const rentalStuffData = req.body;

  if (!rentalStuffData.rental_id || !rentalStuffData.stuff_id) {
    res.status(400).json({ message: `Required data missing` });
  } else {
    if (!rentalStuffData.Paid) rentalStuffData.Paid = false;
    if (!rentalStuffData.Returned) rentalStuffData.Returned = false;

    RentalStuff.createRentalStuff(rentalStuffData)
      .then(addedRentalStuff => {
        res.status(201).json(addedRentalStuff);
      })
      .catch(err => {
        res.status(500).json({ message: `Failed to create new rental stuff`, error: err });
      });
  };
});

router.get('/', authenticate, (req, res) => {
  RentalStuff.readRentalStuff()
    .then(rental_stuff => {
      res.status(200).json(rental_stuff);
    })
    .catch(err => {
      res.status(500).json({ message: `Failed to get rental_stuff` });
    });
});
router.get('/:rentalStuffRef', authenticate, (req, res) => {
  const { rentalStuffRef } = req.params;
  console.log(`TCL: get(/:rentalStuffRef) =`, rentalStuffRef);
  rentalStuffId = parseInt(rentalStuffRef, 10);
  if (rentalStuffId > 0) {
    if (!process.env.NO_LOGGER) console.log(`TCL: readRentalStuffById(${rentalStuffId})`);
    RentalStuff.readRentalStuffById(rentalStuffId)
      .then(rentalStuff => {
        if (rentalStuff) {
          if (!process.env.NO_LOGGER) console.log(`TCL: found:\n`, rentalStuff);
          res.status(200).json(rentalStuff);
        } else {
          res.status(404).json({ message: `Could not get rental stuff with given id` });
        };
      })
      .catch(err => {
        res.status(500).json({ message: `Failed to get rental stuff`, error: err });
      });
  };
});

router.put('/:rentalStuffId', authenticate, (req, res) => {
  const { rentalStuffId } = req.params;
  const id = parseInt(rentalStuffId, 10);
  const rentalStuffData = req.body;

  if (!process.env.NO_LOGGER) console.log(`TCL: updateRentalStuff(${id})`);

  if (!rentalStuffData.PricePerHour && !rentalStuffData.PricePerDay && !rentalStuffData.PickupCondition && !rentalStuffData.ReturnCondition) {
    res.status(400).json({ message: `Required data missing` });
  } else {
    if (id > 0) {
      RentalStuff.updateRentalStuff(id, rentalStuffData)
        .then(updatedRentalStuff => {
          if (updatedRentalStuff) {
            res.status(200).json({ updatedRentalStuff: id });
          } else {
            res.status(404).json({ message: `Could not get rental stuff with given id` });
          };
        })
        .catch(err => {
          res.status(500).json({ message: `Failed to update rental stuff`, error: err });
        });
    };
  };
});

router.delete('/:rentalStuffId', authenticate, (req, res) => {
  const { rentalStuffId } = req.params;
  const uId = parseInt(rentalStuffId, 10);
  if (!process.env.NO_LOGGER) console.log(`TCL: deleteRentalStuff(${uId})`);
  if (uId > 0) {
    RentalStuff.deleteRentalStuff(uId)
      .then(removedRentalStuff => {
        if (removedRentalStuff) {
          res.status(200).json({ removedRentalStuff: uId });
        } else {
          res.status(404).json({ message: `Could not get rental stuff with given id` });
        };
      })
      .catch(err => {
        res.status(500).json({ message: `Failed to delete rental stuff`, error: err });
      });
  };
});

module.exports = router;