const db = require('../../../data/dbConfig.js');

module.exports = {
  createCondition,
  readConditions,
  readConditionById,
  readConditionByName,
  updateCondition,
  deleteCondition,
};

async function createCondition(condition) {
  if (condition) {
    return await db("Conditions")
      .insert(condition)
      .then(u => this.readConditionById(u[0]));
  } else {
    return null;
  };
};

async function readConditions() {
  return await db("Conditions");
};
async function readConditionById(id) {
  if (id) {
    return await db("Conditions")
      .where("id", id)
      .first();
  } else {
    return null;
  };
};
async function readConditionByName(conditionName) {
  if (conditionName) {
    return await db("Conditions")
      .where("Condition", conditionName)
      .first();
  } else {
    return null;
  };
};

async function updateCondition(id, conditionUpdate) {
  if (id && conditionUpdate) {
    return await db("Conditions")
      .where("id", id)
      .update(conditionUpdate)
      .then(count => (count > 0 ? this.readConditionById(id) : null));
  } else {
    return null;
  };
};

async function deleteCondition(id) {
  if (id) {
    return await db("Conditions")
      .where("id", id)
      .del()
      .then(count => (count > 0 ? id : null));
  } else {
    return null;
  };
};