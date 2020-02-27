const router = require('express').Router();
const Stuff = require('../../models/stuff/stuff-model.js');
const authenticate = require('../../middleware/auth.js');

router.post('/', authenticate, (req, res) => {
  const stuffData = req.body;

  if (!stuffData.Stuff) {
    res.status(400).json({ message: `Required data missing` });
  } else {
    Stuff.createStuff(stuffData)
      .then(addedStuff => {
        res.status(201).json(addedStuff);
      })
      .catch(err => {
        res.status(500).json({ message: `Failed to create new stuff` });
      });
  };
});

router.get('/', authenticate, (req, res) => {
  Stuff.readStuff()
    .then(stuff => {
      res.status(200).json(stuff);
    })
    .catch(err => {
      res.status(500).json({ message: `Failed to get stuff` });
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
          res.status(200).json({ stuffData: stuff });
        } else {
          res.status(404).json({ message: `Could not get stuff with given id` });
        };
      })
      .catch(err => {
        res.status(500).json({ message: `Failed to get stuff` });
      });
  } else {
    stuffTitle = stuffRef;
    if (!process.env.NO_LOGGER) console.log(`TCL: readStuffByTitle(${stuffTitle})`);
    Stuff.readStuffByTitle(stuffTitle)
      .then(stuff => {
        if (stuff) {
          if (!process.env.NO_LOGGER) console.log(`TCL: found:\n`, stuff);
          res.status(200).json({ stuffData: stuff });
        } else {
          res.status(404).json({ message: `Could not get stuff with given name` });
        };
      })
      .catch(err => {
        res.status(500).json({ message: `Failed to get stuff` });
      });
  };
});

router.put('/:stuffId', authenticate, (req, res) => {
  const { stuffId } = req.params;
  const uId = parseInt(stuffId, 10);
  const stuffData = req.body;

  if (!process.env.NO_LOGGER) console.log(`TCL: updateStuff(${uId})`);

  if (!uID > 0 || !stuffData.Stuff) {
    res.status(400).json({ message: `Required data missing` });
  } else {
    Stuff.updateStuff(uId, stuffData)
      .then(updatedStuff => {
        if (updatedStuff) {
          res.status(200).json({ updatedStuff: uId });
        } else {
          res.status(404).json({ message: `Could not get stuff with given id` });
        };
      })
      .catch(err => {
        res.status(500).json({ message: `Failed to update stuff` });
      });
  };
});

router.delete('/:stuffId', authenticate, (req, res) => {
  const { stuffId } = req.params;
  const uId = parseInt(stuffId, 10);
  if (!process.env.NO_LOGGER) console.log(`TCL: deleteStuff(${uId})`);
  if (uId > 0) {
    Stuff.deleteStuff(uId)
      .then(removedStuff => {
        if (removedStuff) {
          res.status(200).json({ removedStuff: uId });
        } else {
          res.status(404).json({ message: `Could not get stuff with given id` });
        };
      })
      .catch(err => {
        res.status(500).json({ message: `Failed to delete stuff` });
      });
  };
});

module.exports = router;