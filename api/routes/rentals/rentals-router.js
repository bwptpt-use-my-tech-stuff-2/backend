const router = require('express').Router();
const Rentals = require('../../models/rentals/rentals-model.js');
const RentalStuff = require('../../models/rental_stuff/rental_stuff-model.js');
const authenticate = require('../../middleware/auth.js');

router.post('/', authenticate, (req, res) => {
  const rentalData = req.body;

  if (!rentalData.Title || !rentalData.owner_id) {
    res.status(400).json({ message: `Required data missing` });
  } else {
    if (!rentalData.Paid) rentalData.Paid = false;
    if (!rentalData.Returned) rentalData.Returned = false;

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
    if (!process.env.NO_LOGGER) console.log(`TCL: readRentalByRentalId(${rentalId})`);
    Rentals.readRentalByRentalId(rentalId)
      .then(rental => {
        if (rental) {
          let r = rental;
          RentalStuff.readRentalStuffByIds(r.id)
            .then(rentalStuff => {
              if (rentalStuff) {
                newRentalWithStuff = { ...r, rentalStuff };
                r = newRentalWithStuff;
              }
              if (!process.env.NO_LOGGER) console.log(`TCL: found:\n`, r);
              res.status(200).json(r);
            });
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
          let r = rental;
          RentalStuff.readRentalStuffByIds(r.id)
            .then(rentalStuff => {
              if (rentalStuff) {
                newRentalWithStuff = { ...r, rentalStuff };
                r = newRentalWithStuff;
              }
              if (!process.env.NO_LOGGER) console.log(`TCL: found:\n`, r);
              res.status(200).json(r);
            });
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

  if (!rentalData.Title && !rentalData.Description && !rentalData.PickupLocation && !rentalData.ReturnLocation && !rentalData.ReturnDateTime && !rentalData.Duration && !rentalData.Term && !rentalData.Paid && !rentalData.Returned && !rentalData.RentalTotalCost) {
    res.status(400).json({ message: `Required data missing` });
  } else {
    if (id > 0) {
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