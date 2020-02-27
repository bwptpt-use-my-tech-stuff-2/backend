const db = require('../../../data/dbConfig.js');

module.exports = {
  createRental,
  readRentals,
  readRentalById,
  readRentalByTitle,
  updateRental,
  deleteRental,
};

function createRental(rental) {
  if (rental) {
    return db("Rentals")
      .insert(rental)
      .then(u => this.readRentalById(u[0]));
  } else {
    return null;
  };
};

function readRentals() {
  return db("Rentals");
};
function readRentalById(id) {
  if (id) {
    return db("Rentals")
      .where("id", id)
      .first();
  } else {
    return null;
  };
};
function readRentalByTitle(rentalTitle) {
  if (rentalTitle) {
    return db("Rentals")
      .where("Title", rentalTitle)
      .first();
  } else {
    return null;
  };
};

function updateRental(id, rentalUpdate) {
  if (id && rentalUpdate) {
    return db("Rentals")
      .update(rentalUpdate)
      .then(count => (count > 0 ? this.readRentalById(id) : null));
  } else {
    return null;
  };
};

function deleteRental(id) {
  if (id) {
    return db("Rentals")
      .where("id", id)
      .del();
  } else {
    return null;
  };
};