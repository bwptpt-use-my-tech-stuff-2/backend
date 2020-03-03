const db = require('../../../data/dbConfig.js');

module.exports = {
  createUserFavoriteStuff,
  readUserFavoriteStuff,
  readUserFavoriteStuffById,
  deleteUserFavoriteStuff,
};

async function createUserFavoriteStuff(UserFavoriteStuff) {
  if (UserFavoriteStuff) {
    return await db("User_FavoriteStuff")
      .insert(UserFavoriteStuff)
      .then(u => this.readUserFavoriteStuffById(u[0]));
  } else {
    return null;
  };
};

async function readUserFavoriteStuff() {
  return await db("User_FavoriteStuff")
};
async function readUserFavoriteStuffById(userId) {
  if (userId) {
    return await db("User_FavoriteStuff")
      .where("user_id", userId)
      .select("stuff_id")
      // .first();
  } else {
    return null;
  };
};

async function deleteUserFavoriteStuff(userId, stuffId) {
  if (userId) {
    return await db("User_FavoriteStuff")
      .where("user_id", userId)
      .andWhere("stuff_id", stuffId)
      .del()
      .then(count => (count > 0 ? userId : null));
  } else {
    return null;
  };
};