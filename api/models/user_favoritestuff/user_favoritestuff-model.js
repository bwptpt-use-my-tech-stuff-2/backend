const db = require('../../../data/dbConfig.js');

module.exports = {
  createUserFavoriteStuff,
  readUserFavoriteStuff,
  readUserFavoriteStuffByIds,
  readUserFavoriteStuffByUserId,
  deleteUserFavoriteStuff,
};

async function createUserFavoriteStuff(UserFavoriteStuff) {
  if (UserFavoriteStuff) {
    return await db("User_FavoriteStuff")
      .insert(UserFavoriteStuff)
      .then(u => this.readUserFavoriteStuffByIds(UserFavoriteStuff.user_id, UserFavoriteStuff.stuff_id));
  } else {
    return null;
  };
};

async function readUserFavoriteStuff() {
  return await db("User_FavoriteStuff");
};
async function readUserFavoriteStuffByIds(userId, stuffId) {
  if (userId && stuffId) {
    return await db("User_FavoriteStuff")
      .where("user_id", userId)
      .andWhere("stuff_id", stuffId)
      .first();
  } else {
    return null;
  };
};
async function readUserFavoriteStuffByUserId(userId) {
  if (userId) {
    return await db("User_FavoriteStuff")
      .where("user_id", userId)
      .select("stuff_id");
  } else {
    return null;
  };
};

async function deleteUserFavoriteStuff(userId, stuffId) {
  if (userId && stuffId) {
    return await db("User_FavoriteStuff")
      .where("user_id", userId)
      .andWhere("stuff_id", stuffId)
      .del()
      .then(count => (count > 0 ? stuffId : null));
  } else {
    return null;
  };
};