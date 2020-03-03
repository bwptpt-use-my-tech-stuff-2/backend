const db = require('../../../data/dbConfig.js');

module.exports = {
  createStuff,
  readStuff,
  readStuffById,
  readStuffByTitle,
  updateStuff,
  deleteStuff,
};

async function createStuff(stuff) {
  if (stuff) {
    return await db("Stuff")
      .insert(stuff)
      .then(u => this.readStuffById(u[0]));
  } else {
    return null;
  };
};

async function readStuff() {
  return await db("Stuff");
};
async function readStuffById(id) {
  if (id) {
    return await db("Stuff")
      .where("id", id)
      .first();
  } else {
    return null;
  };
};
async function readStuffByTitle(stuffTitle) {
  if (stuffTitle) {
    return await db("Stuff")
      .where("Title", stuffTitle)
      .first();
  } else {
    return null;
  };
};

async function updateStuff(id, stuffUpdate) {
  if (id && stuffUpdate) {
    return await db("Stuff")
      .where("id", id)
      .update(stuffUpdate)
      .then(count => (count > 0 ? this.readStuffById(id) : null));
  } else {
    return null;
  };
};

async function deleteStuff(id) {
  if (id) {
    return await db("Stuff")
      .where("id", id)
      .del()
      .then(count => (count > 0 ? id : null));
  } else {
    return null;
  };
};