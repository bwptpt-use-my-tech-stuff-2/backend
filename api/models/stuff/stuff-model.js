const db = require('../../../data/dbConfig.js');

module.exports = {
  createStuff,
  readStuff,
  readStuffById,
  readStuffByTitle,
  updateStuff,
  deleteStuff,
};

function createStuff(stuff) {
  if (stuff) {
    return db("Stuff")
      .insert(stuff)
      .then(u => this.readStuffById(u[0]));
  } else {
    return null;
  };
};

function readStuff() {
  return db("Stuff");
};
function readStuffById(id) {
  if (id) {
    return db("Stuff")
      .where("id", id)
      .first();
  } else {
    return null;
  };
};
function readStuffByTitle(stuffTitle) {
  if (stuffTitle) {
    return db("Stuff")
      .where("Title", stuffTitle)
      .first();
  } else {
    return null;
  };
};

function updateStuff(id, stuffUpdate) {
  if (id && stuffUpdate) {
    return db("Stuff")
      .update(stuffUpdate)
      .then(count => (count > 0 ? this.readStuffById(id) : null));
  } else {
    return null;
  };
};

function deleteStuff(id) {
  if (id) {
    return db("Stuff")
      .where("id", id)
      .del();
  } else {
    return null;
  };
};