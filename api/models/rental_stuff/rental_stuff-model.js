const db = require('../../../data/dbConfig.js');

module.exports = {
  createRentalStuff,
  readRentalStuffById,
  updateRentalStuff,
  deleteRentalStuff,
};

async function createRentalStuff(RentalStuff) {
  if (RentalStuff) {
    return await db("Rental_Stuff")
      .insert(RentalStuff)
      .then(u => this.readRentalStuffById(u[0]));
  } else {
    return null;
  };
};

async function readRentalStuffById(rentalId) {
  if (rentalId) {
    return await db("Rental_Stuff")
      .where("rental_id", rentalId)
      .select("stuff_id")
      // .first();
  } else {
    return null;
  };
};

async function updateRentalStuff(id, RentalStuffUpdate) {
  if (id && RentalStuffUpdate) {
    return await db("Rental_Stuff")
      .where("id", id)
      .update(RentalStuffUpdate)
      .then(count => (count > 0 ? this.readRentalStuffById(id) : null));
  } else {
    return null;
  };
};

async function deleteRentalStuff(id) {
  if (id) {
    return await db("Rental_Stuff")
      .where("id", id)
      .del()
      .then(count => (count > 0 ? id : null));
  } else {
    return null;
  };
};