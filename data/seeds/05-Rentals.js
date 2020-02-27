exports.seed = function(knex) {
  return knex('Rentals').insert([
    {
      //id: 1,
      Title: 'DJ Equipment',
      Description: 'Turntable',
      owner_id: 2,
      renter_id: 1,
      PickupLocation: 'Los Angeles, CA',
      PickupDateTime: knex.fn.now(),
      ReturnLocation: 'Los Angeles, CA',
      ReturnDateTime: knex.fn.now(),
      Duration: 4,
      Term: 0,
      Paid: 1,
      Returned: 1,
      RentalTotalCost: 40
    },
    {
      //id: 2,
      Title: 'Video Equipment',
      Description: 'Camera & Projector',
      owner_id: 1,
      renter_id: 2,
      PickupLocation: 'Anaheim, California',
      PickupDateTime: knex.fn.now(),
      Duration: 1,
      Term: 1,
      Paid: 0,
      Returned: 0,
      RentalTotalCost: 400
    },
  ]);
};
