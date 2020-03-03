const db = require('../../../data/dbConfig.js');

module.exports = {
  createUserStuff,
  readUserStuffById,
  readUserStuff,
  deleteUserStuff,
};

async function createUserStuff(UserStuff) {
  if (UserStuff) {
    return await db("User_Stuff")
      .insert(UserStuff)
      .then(u => this.readUserStuffById(u[0]));
  } else {
    return null;
  };
};

async function readUserStuff() {
  return await db("User_Stuff")
};
async function readUserStuffById(userId) {
  if (userId) {
    return await db("User_Stuff")
      .where("user_id", userId)
      .select("stuff_id")
      // .first();
  } else {
    return null;
  };
};

async function deleteUserStuff(userId, stuffId) {
  if (userId) {
    return await db("User_Stuff")
    .where("user_id", userId)
    .andWhere("stuff_id", stuffId)
      .del()
      .then(count => (count > 0 ? userId : null));
  } else {
    return null;
  };
};