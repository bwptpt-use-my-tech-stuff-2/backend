exports.seed = function(knex) {
  return knex('Rental_Stuff').insert([
    {
      //id: 1,
      rental_id: 1,
      stuff_id: 3,
      PricePerHour: 10,
      PricePerDay: 50,
      PickupCondition: 4,
      ReturnCondition: 4
    },
    {
      //id: 2,
      rental_id: 2,
      stuff_id: 1,
      PricePerHour: 30,
      PricePerDay: 150,
      PickupCondition: 3
    },
    {
      //id: 3,
      rental_id: 2,
      stuff_id: 2,
      PricePerHour: 85,
      PricePerDay: 250,
      PickupCondition: 2
    },
  ]);
};
