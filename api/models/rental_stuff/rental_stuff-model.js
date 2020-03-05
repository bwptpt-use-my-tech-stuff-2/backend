const db = require('../../../data/dbConfig.js');

module.exports = {
  createRentalStuff,
  readRentalStuff,
  readRentalStuffByIds,
  readRentalStuffByRentalId,
  updateRentalStuff,
  deleteRentalStuff,
};

async function createRentalStuff(RentalStuff) {
  if (RentalStuff) {
    return await db("Rental_Stuff")
      .insert(RentalStuff)
      .then(u => this.readRentalStuffByIds(RentalStuff.rental_id, RentalStuff.stuff_id));
  } else {
    return null;
  };
};

async function readRentalStuff() {
  return await db("Rental_Stuff");
};
async function readRentalStuffByIds(rentalId, stuffId) {
  if (rentalId && stuffId) {
    return await db("Rental_Stuff")
      .where("rental_id", rentalId)
      .andWhere("stuff_id", stuffId)
      .first();
  } else {
    return null;
  };
};
async function readRentalStuffByRentalId(rentalId) {
  if (rentalId) {
    return await db("Rental_Stuff")
      .where("rental_id", rentalId)
      .select("stuff_id", "PricePerHour", "PricePerDay", "PickupCondition", "ReturnCondition");
  } else {
    return null;
  };
};

async function updateRentalStuff(rentalId, stuffId, rentalUpdate) {
  if (rentalId && stuffId && rentalUpdate) {
    return await db("Rental_Stuff")
      .where("rental_id", rentalId)
      .andWhere("stuff_id", stuffId)
      .update(rentalUpdate)
      .then(count => (count > 0 ? this.readRentalStuffByRentalId(rentalId, stuffId) : null));
  } else {
    return null;
  };
};

async function deleteRentalStuff(rentalId, stuffId) {
  if (rentalId && stuffId) {
    return await db("Rental_Stuff")
    .where("rental_id", rentalId)
    .andWhere("stuff_id", stuffId)
      .del()
      .then(count => (count > 0 ? rentalId : null));
  } else {
    return null;
  };
};