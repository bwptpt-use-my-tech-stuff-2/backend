const db = require('../../../data/dbConfig.js');

module.exports = {
  createUser,
  readUsers,
  readUserById,
  readUserByEmail,
  updateUser,
  deleteUser,
};

async function createUser(user) {
  if (user) {
    return await db("users")
      .insert(user)
      .then(u => this.readUserById(u[0]));
  } else {
    return null;
  };
};

async function readUsers() {
  return await db("users");
};
async function readUserById(id) {
  if (id) {
    return await db("users")
      .where("id", id)
      .first();
  } else {
    return null;
  };
};
async function readUserByEmail(emailAddress) {
  if (emailAddress) {
    return await db("users")
      .where("Email", emailAddress)
      .first();
  } else {
    return null;
  };
};

async function updateUser(id, userUpdate) {
  if (id && userUpdate) {
    return await db("users")
      .where("id", id)
      .update(userUpdate)
      .then(count => (count > 0 ? this.readUserById(id) : null));
  } else {
    return null;
  };
};

async function deleteUser(id) {
  if (id) {
    return await db("users")
      .where("id", id)
      .del()
      .then(count => (count > 0 ? id : null));
  } else {
    return null;
  };
};