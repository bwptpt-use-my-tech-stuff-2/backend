exports.seed = function(knex) {
  return knex('Conditions').insert([
    {
      //id: 1,
      Condition: 'Mint'
    },
    {
      //id: 2,
      Condition: 'New'
    },
    {
      //id: 3,
      Condition: 'Good'
    },
    {
      //id: 4,
      Condition: 'Fair'
    },
    {
      //id: 5,
      Condition: 'Damaged'
    },
    {
      //id: 6,
      Condition: 'Broken'
    },
  ]);
};
