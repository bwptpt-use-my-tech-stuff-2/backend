exports.seed = function(knex) {
  return knex('User_Stuff').insert([
    {
      //id: 1,
      user_id: 1,
      stuff_id: 1
    },
    {
      //id: 2,
      user_id: 1,
      stuff_id: 2
    },
    {
      //id: 3,
      user_id: 2,
      stuff_id: 3
    },
  ]);
};
