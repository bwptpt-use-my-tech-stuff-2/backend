const db = require('../../../data/dbConfig.js');

module.exports = {
  createUserStuff,
  readUserStuff,
  readUserStuffByIds,
  readUserStuffByUserId,
  deleteUserStuff,
};

async function createUserStuff(UserStuff) {
  if (UserStuff) {
    return await db("User_Stuff")
      .insert(UserStuff)
      .then(u => this.readUserStuffByIds(UserStuff.user_id, UserStuff.stuff_id));
  } else {
    return null;
  };
};

async function readUserStuff() {
  return await db("User_Stuff");
};
async function readUserStuffByIds(userId, stuffId) {
  if (userId && stuffId) {
    return await db("User_Stuff")
      .where("user_id", userId)
      .andWhere("stuff_id", stuffId)
      .first();
  } else {
    return null;
  };
};
async function readUserStuffByUserId(userId) {
  if (userId) {
    return await db("User_Stuff")
      .where("user_id", userId)
      .select("stuff_id");
  } else {
    return null;
  };
};

async function deleteUserStuff(userId, stuffId) {
  if (userId && stuffId) {
    return await db("User_Stuff")
      .where("user_id", userId)
      .andWhere("stuff_id", stuffId)
      .del()
      .then(count => (count > 0 ? userId : null));
  } else {
    return null;
  };
};