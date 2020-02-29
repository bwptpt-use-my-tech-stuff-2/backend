exports.up = function(knex) {
  return knex.schema
    .createTable('Users', tbl => {
      tbl.increments();
      tbl.text('Email')
        .unique()
        .notNullable();
      tbl.text('Password')
        .notNullable();
      tbl.text('FirstName')
        .notNullable();
      tbl.text('LastName')
        .notNullable();
      tbl.text('Location')
        .notNullable();
      tbl.text('ImagePath');
      tbl.text('Phone');
    })
    .createTable('Categories', tbl => {
      tbl.increments();
      tbl.text('Category')
        .unique()
        .notNullable();
    })
    .createTable('Conditions', tbl => {
      tbl.increments();
      tbl.text('Condition')
        .unique()
        .notNullable();
    })
    .createTable('Stuff', tbl => {
      tbl.increments();
      tbl.integer('category_id')
        .notNullable()
        .unsigned()
        .references('Categories.id');
      tbl.text('Title')
        .notNullable();
      tbl.text('Description');
      tbl.integer('condition_id')
        .notNullable()
        .unsigned()
        .references('Conditions.id');
      tbl.datetime('AddDate')
        .notNullable();
      tbl.decimal('PricePerHour')
        .notNullable();
      tbl.decimal('PricePerDay')
        .notNullable();
      tbl.boolean('Available')
        .notNullable()
        .defaultTo(1);
      tbl.text('ImagePath');
    })
    .createTable('Rentals', tbl => {
      tbl.increments();
      tbl.text('Title')
        .notNullable();
      tbl.text('Description');
      tbl.integer('owner_id')
        .notNullable()
        .unsigned()
        .references('Users.id')
        // .onUpdate('CASCADE')
        // .onDelete('CASCADE')
        ;
      tbl.integer('renter_id')
        // .notNullable()
        .unsigned()
        .references('Users.id')
        // .onUpdate('CASCADE')
        // .onDelete('CASCADE')
        ;
      tbl.text('PickupLocation');
      tbl.datetime('PickupDateTime');
      tbl.text('ReturnLocation');
      tbl.datetime('ReturnDateTime');
      tbl.integer('Duration')
        .unsigned();
      tbl.boolean('Term')
        .unsigned();
      tbl.boolean('Paid')
        .notNullable()
        .defaultTo(0);
      tbl.boolean('Returned')
        .notNullable()
        .defaultTo(0);
      tbl.decimal('RentalTotalCost');
    })
    .createTable('Reviews', tbl => {
      tbl.increments();
      tbl.integer('rental_id')
        .notNullable()
        .unsigned()
        .references('Rentals.id');
      tbl.integer('OwnerRatingOfRenter')
        .unsigned();
      tbl.integer('RenterRatingOfOwner')
        .unsigned();
      tbl.text('OwnerFeedback');
      tbl.text('RenterFeedback');
    })
    //Bridge Tables below
    .createTable('User_Stuff', tbl => {
      tbl.integer('user_id')
        .notNullable()
        .unsigned()
        .references('Users.id')
        .onUpdate('CASCADE')
        .onDelete('CASCADE');
      tbl.integer('stuff_id')
        .notNullable()
        .unsigned()
        .references('Stuff.id')
        .onUpdate('CASCADE')
        .onDelete('CASCADE');
      tbl.primary(['user_id', 'stuff_id']);
    })
    .createTable('User_FavoriteStuff', tbl => {
      tbl.integer('user_id')
        .notNullable()
        .unsigned()
        .references('Users.id')
        .onUpdate('CASCADE')
        .onDelete('CASCADE');
      tbl.integer('stuff_id')
        .notNullable()
        .unsigned()
        .references('Stuff.id')
        .onUpdate('CASCADE')
        .onDelete('CASCADE');
      tbl.primary(['user_id', 'stuff_id']);
    })
    .createTable('Rental_Stuff', tbl => {
      tbl.integer('rental_id')
        .notNullable()
        .unsigned()
        .references('Rentals.id')
        .onUpdate('CASCADE')
        .onDelete('CASCADE');
      tbl.integer('stuff_id')
        .notNullable()
        .unsigned()
        .references('Stuff.id')
        .onUpdate('CASCADE')
        .onDelete('CASCADE');
      tbl.decimal('PricePerHour')
        .notNullable();
      tbl.decimal('PricePerDay')
        .notNullable();
      tbl.integer('PickupCondition')
        .unsigned()
        .references('Conditions.id');
      tbl.integer('ReturnCondition')
        .unsigned()
        .references('Conditions.id');
      tbl.primary(['rental_id', 'stuff_id']);
    })
    ;
};

exports.down = function(knex) {
  return knex.schema
    .dropTableIfExists('Rental_Stuff')
    .dropTableIfExists('User_FavoriteStuff')
    .dropTableIfExists('User_Stuff')
    .dropTableIfExists('Reviews')
    .dropTableIfExists('Rentals')
    .dropTableIfExists('Conditions')
    .dropTableIfExists('Categories')
    .dropTableIfExists('Stuff')
    .dropTableIfExists('Users');
};
