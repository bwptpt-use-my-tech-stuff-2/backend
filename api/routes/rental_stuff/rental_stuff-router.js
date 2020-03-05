const router = require('express').Router();
const RentalStuff = require('../../models/rental_stuff/rental_stuff-model.js');
const authenticate = require('../../middleware/auth.js');

router.post('/', authenticate, (req, res) => {
  const rentalStuffData = req.body;

  if (!rentalStuffData.rental_id || !rentalStuffData.stuff_id || !rentalStuffData.PricePerHour || !rentalStuffData.PricePerDay) {
    res.status(400).json({ message: `Required data missing` });
  } else {
    RentalStuff.createRentalStuff(rentalStuffData)
      .then(addedRentalStuff => {
        console.log(`addedRentalStuff`, addedRentalStuff);
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
router.get('/:rentalRef', authenticate, (req, res) => {
  const { rentalRef } = req.params;
  console.log(`TCL: get(/:rentalRef) =`, rentalRef);
  rentalId = parseInt(rentalRef, 10);
  if (rentalId > 0) {
    if (!process.env.NO_LOGGER) console.log(`TCL: readRentalStuffByIds(${rentalId})`);
    RentalStuff.readRentalStuffByRentalId(rentalId)
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

router.put('/:rentalId/:stuffId', authenticate, (req, res) => {
  const { rentalId, stuffId } = req.params;
  const rId = parseInt(rentalId, 10);
  const sId = parseInt(stuffId, 10);
  const rentalData = req.body;

  if (!process.env.NO_LOGGER) console.log(`TCL: updateRentalStuff(${rId}, ${sId})`);

  if (!rentalData.PricePerHour && !rentalData.PricePerDay && !rentalData.PickupCondition && !rentalData.ReturnCondition) {
    res.status(400).json({ message: `Required data missing` });
  } else {
    if (rId > 0 && sId > 0) {
      RentalStuff.updateRentalStuff(rId, sId, rentalData)
        .then(updatedRentalStuff => {
          if (updatedRentalStuff) {
            res.status(200).json({ updatedRentalStuff: sId });
          } else {
            res.status(404).json({ message: `Could not get rental stuff with given ids` });
          };
        })
        .catch(err => {
          res.status(500).json({ message: `Failed to update rental stuff`, error: err });
        });
    };
  };
});

router.delete('/:rentalId/:stuffId', authenticate, (req, res) => {
  const { rentalId, stuffId } = req.params;
  const rId = parseInt(rentalId, 10);
  const sId = parseInt(stuffId, 10);
  if (!process.env.NO_LOGGER) console.log(`TCL: deleteRentalStuff(${rId}, ${sId})`);
  if (rId > 0 && sId > 0) {
    RentalStuff.deleteRentalStuff(rId, sId)
      .then(removedRentalStuff => {
        if (removedRentalStuff) {
          res.status(200).json({ removedRentalStuff: sId });
        } else {
          res.status(404).json({ message: `Could not get rental stuff with given ids` });
        };
      })
      .catch(err => {
        res.status(500).json({ message: `Failed to delete rental stuff`, error: err });
      });
  };
});

module.exports = router;