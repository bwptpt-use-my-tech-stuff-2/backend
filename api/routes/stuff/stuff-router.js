const router = require('express').Router();
const Stuff = require('../../models/stuff/stuff-model.js');
const authenticate = require('../../middleware/auth.js');

const moment = require('moment');

router.post('/', authenticate, (req, res) => {
  const stuffData = req.body;

  if (!stuffData.Title || !stuffData.category_id || !stuffData.condition_id || !stuffData.PricePerHour || !stuffData.PricePerDay) {
    res.status(400).json({ message: `Required data missing` });
  } else {

    if (!stuffData.AddDate) {
      const d = moment();
      stuffData.AddDate = d.format("YYYY-MM-DD HH:mm:ss");
    };
    if (!stuffData.Available) stuffData.Available = true;

    Stuff.createStuff(stuffData)
      .then(addedStuff => {
        res.status(201).json(addedStuff);
      })
      .catch(err => {
        res.status(500).json({ message: `Failed to create new stuff`, error: err });
      });
  };
});

router.get('/', authenticate, (req, res) => {
  Stuff.readStuff()
    .then(stuff => {
      res.status(200).json(stuff);
    })
    .catch(err => {
      res.status(500).json({ message: `Failed to get stuff`, error: err });
    });
});
router.get('/:stuffRef', authenticate, (req, res) => {
  const { stuffRef } = req.params;
  console.log(`TCL: get(/:stuffRef) =`, stuffRef);
  stuffId = parseInt(stuffRef, 10);
  if (stuffId > 0) {
    if (!process.env.NO_LOGGER) console.log(`TCL: readStuffById(${stuffId})`);
    Stuff.readStuffById(stuffId)
      .then(stuff => {
        if (stuff) {
          if (!process.env.NO_LOGGER) console.log(`TCL: found:\n`, stuff);
          res.status(200).json(stuff);
        } else {
          res.status(404).json({ message: `Could not get stuff with given id` });
        };
      })
      .catch(err => {
        res.status(500).json({ message: `Failed to get stuff`, error: err });
      });
  } else {
    stuffTitle = stuffRef;
    if (!process.env.NO_LOGGER) console.log(`TCL: readStuffByTitle(${stuffTitle})`);
    Stuff.readStuffByTitle(stuffTitle)
      .then(stuff => {
        if (stuff) {
          if (!process.env.NO_LOGGER) console.log(`TCL: found:\n`, stuff);
          res.status(200).json(stuff);
        } else {
          res.status(404).json({ message: `Could not get stuff with given name` });
        };
      })
      .catch(err => {
        res.status(500).json({ message: `Failed to get stuff`, error: err });
      });
  };
});

router.put('/:stuffId', authenticate, (req, res) => {
  const { stuffId } = req.params;
  const id = parseInt(stuffId, 10);
  const stuffData = req.body;

  if (!process.env.NO_LOGGER) console.log(`TCL: updateStuff(${id})`);

  if (!stuffData.Title && !stuffData.Description && !stuffData.category_id && !stuffData.condition_id && !stuffData.PricePerHour && !stuffData.PricePerDay && !stuffData.AddDate && !stuffData.Available && !stuffData.ImagePath) {
    res.status(400).json({ message: `Required data missing` });
  } else {
    if (id > 0) {
      Stuff.updateStuff(id, stuffData)
        .then(updatedStuff => {
          if (updatedStuff) {
            res.status(200).json({ updatedStuff: id });
          } else {
            res.status(404).json({ message: `Could not get stuff with given id` });
          };
        })
        .catch(err => {
          res.status(500).json({ message: `Failed to update stuff`, error: err });
        });
    };
  };
});

router.delete('/:stuffId', authenticate, (req, res) => {
  const { stuffId } = req.params;
  const id = parseInt(stuffId, 10);
  if (!process.env.NO_LOGGER) console.log(`TCL: deleteStuff(${id})`);
  if (id > 0) {
    Stuff.deleteStuff(id)
      .then(removedStuff => {
        if (removedStuff) {
          res.status(200).json({ removedStuff: id });
        } else {
          res.status(404).json({ message: `Could not get stuff with given id` });
        };
      })
      .catch(err => {
        res.status(500).json({ message: `Failed to delete stuff`, error: err });
      });
  };
});

module.exports = router;