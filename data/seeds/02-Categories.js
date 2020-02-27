exports.seed = function(knex) {
  return knex('Categories').insert([
    {
      //id: 1,
      Category: 'Camera'
    },
    {
      //id: 2,
      Category: 'Projector'
    },
    {
      //id: 3,
      Category: 'TV'
    },
    {
      //id: 4,
      Category: 'Instrument'
    },
    {
      //id: 5,
      Category: 'Party'
    },
    {
      //id: 6,
      Category: 'Other'
    },
  ]);
};
