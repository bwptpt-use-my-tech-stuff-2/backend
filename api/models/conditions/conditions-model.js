const db = require('../../../data/dbConfig.js');

module.exports = {
  createCondition,
  readConditions,
  readConditionById,
  readConditionByName,
  updateCondition,
  deleteCondition,
};

function createCondition(condition) {
  if (condition) {
    return db("Conditions")
      .insert(condition)
      .then(u => this.readConditionById(u[0]));
  } else {
    return null;
  };
};

function readConditions() {
  return db("Conditions");
};
function readConditionById(id) {
  if (id) {
    return db("Conditions")
      .where("id", id)
      .first();
  } else {
    return null;
  };
};
function readConditionByName(conditionName) {
  if (conditionName) {
    return db("Conditions")
      .where("Condition", conditionName)
      .first();
  } else {
    return null;
  };
};

function updateCondition(id, conditionUpdate) {
  if (id && conditionUpdate) {
    return db("Conditions")
      .where("id", id)
      .update(conditionUpdate)
      .then(count => (count > 0 ? this.readConditionById(id) : null));
  } else {
    return null;
  };
};

function deleteCondition(id) {
  if (id) {
    return db("Conditions")
      .where("id", id)
      .del()
      .then(count => (count > 0 ? id : null));
  } else {
    return null;
  };
};