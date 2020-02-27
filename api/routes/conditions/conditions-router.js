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
        res.status(500).json({ message: `Failed to create new condition` });
      });
  };
});

router.get('/', authenticate, (req, res) => {
  Conditions.readConditions()
    .then(conditions => {
      res.status(200).json(conditions);
    })
    .catch(err => {
      res.status(500).json({ message: `Failed to get conditions` });
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
          res.status(200).json({ conditionData: condition });
        } else {
          res.status(404).json({ message: `Could not get condition with given id` });
        };
      })
      .catch(err => {
        res.status(500).json({ message: `Failed to get condition` });
      });
  } else {
    conditionName = conditionRef;
    if (!process.env.NO_LOGGER) console.log(`TCL: readConditionByName(${conditionName})`);
    Conditions.readConditionByName(conditionName)
      .then(condition => {
        if (condition) {
          if (!process.env.NO_LOGGER) console.log(`TCL: found:\n`, condition);
          res.status(200).json({ conditionData: condition });
        } else {
          res.status(404).json({ message: `Could not get condition with given name` });
        };
      })
      .catch(err => {
        res.status(500).json({ message: `Failed to get condition` });
      });
  };
});

router.put('/:conditionId', authenticate, (req, res) => {
  const { conditionId } = req.params;
  const uId = parseInt(conditionId, 10);
  const conditionData = req.body;

  if (!process.env.NO_LOGGER) console.log(`TCL: updateCondition(${uId})`);

  if (!uID > 0 || !conditionData.Condition) {
    res.status(400).json({ message: `Required data missing` });
  } else {
    Conditions.updateCondition(uId, conditionData)
      .then(updatedCondition => {
        if (updatedCondition) {
          res.status(200).json({ updatedCondition: uId });
        } else {
          res.status(404).json({ message: `Could not get condition with given id` });
        };
      })
      .catch(err => {
        res.status(500).json({ message: `Failed to update condition` });
      });
  };
});

router.delete('/:conditionId', authenticate, (req, res) => {
  const { conditionId } = req.params;
  const uId = parseInt(conditionId, 10);
  if (!process.env.NO_LOGGER) console.log(`TCL: deleteCondition(${uId})`);
  if (uId > 0) {
    Conditions.deleteCondition(uId)
      .then(removedCondition => {
        if (removedCondition) {
          res.status(200).json({ removedCondition: uId });
        } else {
          res.status(404).json({ message: `Could not get condition with given id` });
        };
      })
      .catch(err => {
        res.status(500).json({ message: `Failed to delete condition` });
      });
  };
});

module.exports = router;