const router = require('express').Router();
const Conditions = require('../../models/conditions/conditions-model.js');
const authenticate = require('../../middleware/auth.js');

router.post('/', authenticate, (req, res) => {
  const conditionData = req.body;

  if (!conditionData.Condition) {
    res.status(400).json({ message: `Required data missing` });
  } else {
    Conditions.createCondition(conditionData)
      .then(addedCondition => {
        res.status(201).json(addedCondition);
      })
      .catch(err => {
        res.status(500).json({ message: `Failed to create new condition`, error: err });
      });
  };
});

router.get('/', authenticate, (req, res) => {
  Conditions.readConditions()
    .then(conditions => {
      res.status(200).json(conditions);
    })
    .catch(err => {
      res.status(500).json({ message: `Failed to get conditions`, error: err });
    });
});
router.get('/:conditionRef', authenticate, (req, res) => {
  const { conditionRef } = req.params;
  console.log(`TCL: get(/:conditionRef) =`, conditionRef);
  conditionId = parseInt(conditionRef, 10);
  if (conditionId > 0) {
    if (!process.env.NO_LOGGER) console.log(`TCL: readConditionById(${conditionId})`);
    Conditions.readConditionById(conditionId)
      .then(condition => {
        if (condition) {
          if (!process.env.NO_LOGGER) console.log(`TCL: found:\n`, condition);
          res.status(200).json(condition);
        } else {
          res.status(404).json({ message: `Could not get condition with given id` });
        };
      })
      .catch(err => {
        res.status(500).json({ message: `Failed to get condition`, error: err });
      });
  } else {
    conditionName = conditionRef;
    if (!process.env.NO_LOGGER) console.log(`TCL: readConditionByName(${conditionName})`);
    Conditions.readConditionByName(conditionName)
      .then(condition => {
        if (condition) {
          if (!process.env.NO_LOGGER) console.log(`TCL: found:\n`, condition);
          res.status(200).json(condition);
        } else {
          res.status(404).json({ message: `Could not get condition with given name` });
        };
      })
      .catch(err => {
        res.status(500).json({ message: `Failed to get condition`, error: err });
      });
  };
});

router.put('/:conditionId', authenticate, (req, res) => {
  const { conditionId } = req.params;
  const id = parseInt(conditionId, 10);
  const conditionData = req.body;

  if (!process.env.NO_LOGGER) console.log(`TCL: updateCondition(${id})`);

  if (!id > 0 || !conditionData.Condition) {
    res.status(400).json({ message: `Required data missing` });
  } else {
    Conditions.updateCondition(id, conditionData)
      .then(updatedCondition => {
        if (updatedCondition) {
          res.status(200).json({ updatedCondition: id });
        } else {
          res.status(404).json({ message: `Could not get condition with given id` });
        };
      })
      .catch(err => {
        res.status(500).json({ message: `Failed to update condition`, error: err });
      });
  };
});

router.delete('/:conditionId', authenticate, (req, res) => {
  const { conditionId } = req.params;
  const id = parseInt(conditionId, 10);
  if (!process.env.NO_LOGGER) console.log(`TCL: deleteCondition(${id})`);
  if (id > 0) {
    Conditions.deleteCondition(id)
      .then(removedCondition => {
        if (removedCondition) {
          res.status(200).json({ removedCondition: id });
        } else {
          res.status(404).json({ message: `Could not get condition with given id` });
        };
      })
      .catch(err => {
        res.status(500).json({ message: `Failed to delete condition`, error: err });
      });
  };
});

module.exports = router;