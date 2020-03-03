const db = require('../../../data/dbConfig.js');

module.exports = {
  createRental,
  readRentals,
  readRentalsByOwnerId,
  readRentalByRentalId,
  readRentalByTitle,
  updateRental,
  deleteRental,
};

async function createRental(rental) {
  if (rental) {
    return await db("Rentals")
      .insert(rental)
      .then(u => this.readRentalByRentalId(u[0]));
  } else {
    return null;
  };
};

async function readRentals() {
  return await db("Rentals");
};
async function readRentalsByOwnerId(ownerId) {
  if (ownerId) {
    return await db("Rentals")
      .where("owner_id", ownerId)
      // .first();
  } else {
    return null;
  };
};
async function readRentalByRentalId(rentalId) {
  if (rentalId) {
    return await db("Rentals")
      .where("id", rentalId)
      .first();
  } else {
    return null;
  };
};
async function readRentalByTitle(rentalTitle) {
  if (rentalTitle) {
    return await db("Rentals")
      .where("Title", rentalTitle)
      .first();
  } else {
    return null;
  };
};

async function updateRental(id, rentalUpdate) {
  if (id && rentalUpdate) {
    return await db("Rentals")
      .where("id", id)
      .update(rentalUpdate)
      .then(count => (count > 0 ? this.readRentalByRentalId(id) : null));
  } else {
    return null;
  };
};

async function deleteRental(id) {
  if (id) {
    return await db("Rentals")
      .where("id", id)
      .del()
      .then(count => (count > 0 ? id : null));
  } else {
    return null;
  };
};