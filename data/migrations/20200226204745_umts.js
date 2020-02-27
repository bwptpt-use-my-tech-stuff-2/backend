exports.up = function(knex) {
  return knex.schema
    .createTable('Users', tbl => {})
    .createTable('Stuff', tbl => {})
    .createTable('Categories', tbl => {})
    .createTable('Conditions', tbl => {})
    .createTable('User_Stuff', tbl => {})
    .createTable('User_FavoriteStuff', tbl => {})
    .createTable('Rentals', tbl => {})
    .createTable('Rental_Stuff', tbl => {})
    .createTable('User_Rental_Owners', tbl => {})
    .createTable('User_Rental_Renters', tbl => {})
    .createTable('Reviews', tbl => {})
    ;
};

exports.down = function(knex) {
  return knex.schema
    .dropTableIfExists('Reviews')
    .dropTableIfExists('User_Rental_Renters')
    .dropTableIfExists('User_Rental_Owners')
    .dropTableIfExists('Rental_Stuff')
    .dropTableIfExists('Rentals')
    .dropTableIfExists('User_FavoriteStuff')
    .dropTableIfExists('User_Stuff')
    .dropTableIfExists('Conditions')
    .dropTableIfExists('Categories')
    .dropTableIfExists('Stuff')
    .dropTableIfExists('Users');
};
