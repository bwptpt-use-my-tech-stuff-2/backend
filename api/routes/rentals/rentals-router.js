const router = require('express').Router();
const Rentals = require('../../models/rentals/rentals-model.js');
const authenticate = require('../../middleware/auth.js');

router.post('/', authenticate, (req, res) => {
  const rentalData = req.body;

  if (!rentalData.Rental) {
    res.status(400).json({ message: `Required data missing` });
  } else {
    Rentals.createRental(rentalData)
      .then(addedRental => {
        res.status(201).json(addedRental);
      })
      .catch(err => {
        res.status(500).json({ message: `Failed to create new rental`, error: err });
      });
  };
});

router.get('/', authenticate, (req, res) => {
  Rentals.readRentals()
    .then(rentals => {
      res.status(200).json(rentals);
    })
    .catch(err => {
      res.status(500).json({ message: `Failed to get rentals` });
    });
});
router.get('/:rentalRef', authenticate, (req, res) => {
  const { rentalRef } = req.params;
  console.log(`TCL: get(/:rentalRef) =`, rentalRef);
  rentalId = parseInt(rentalRef, 10);
  if (rentalId > 0) {
    if (!process.env.NO_LOGGER) console.log(`TCL: readRentalById(${rentalId})`);
    Rentals.readRentalById(rentalId)
      .then(rental => {
        if (rental) {
          if (!process.env.NO_LOGGER) console.log(`TCL: found:\n`, rental);
          res.status(200).json(rental);
        } else {
          res.status(404).json({ message: `Could not get rental with given id` });
        };
      })
      .catch(err => {
        res.status(500).json({ message: `Failed to get rental`, error: err });
      });
  } else {
    rentalTitle = rentalRef;
    if (!process.env.NO_LOGGER) console.log(`TCL: readRentalByTitle(${rentalTitle})`);
    Rentals.readRentalByTitle(rentalTitle)
      .then(rental => {
        if (rental) {
          if (!process.env.NO_LOGGER) console.log(`TCL: found:\n`, rental);
          res.status(200).json(rental);
        } else {
          res.status(404).json({ message: `Could not get rental with given name` });
        };
      })
      .catch(err => {
        res.status(500).json({ message: `Failed to get rental`, error: err });
      });
  };
});

router.put('/:rentalId', authenticate, (req, res) => {
  const { rentalId } = req.params;
  const id = parseInt(rentalId, 10);
  const rentalData = req.body;

  if (!process.env.NO_LOGGER) console.log(`TCL: updateRental(${id})`);

  if (!id > 0 || !rentalData.Rental) {
    res.status(400).json({ message: `Required data missing` });
  } else {
    Rentals.updateRental(id, rentalData)
      .then(updatedRental => {
        if (updatedRental) {
          res.status(200).json({ updatedRental: id });
        } else {
          res.status(404).json({ message: `Could not get rental with given id` });
        };
      })
      .catch(err => {
        res.status(500).json({ message: `Failed to update rental`, error: err });
      });
  };
});

router.delete('/:rentalId', authenticate, (req, res) => {
  const { rentalId } = req.params;
  const uId = parseInt(rentalId, 10);
  if (!process.env.NO_LOGGER) console.log(`TCL: deleteRental(${uId})`);
  if (uId > 0) {
    Rentals.deleteRental(uId)
      .then(removedRental => {
        if (removedRental) {
          res.status(200).json({ removedRental: uId });
        } else {
          res.status(404).json({ message: `Could not get rental with given id` });
        };
      })
      .catch(err => {
        res.status(500).json({ message: `Failed to delete rental`, error: err });
      });
  };
});

module.exports = router;