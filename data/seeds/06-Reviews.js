exports.seed = function(knex) {
  return knex('Reviews').insert([
    {
      //id: 1,
      rental_id: 1,
      OwnerRatingOfRenter: 5,
      RenterRatingOfOwner: 4,
      OwnerFeedback: 'Smooth transaction, would rent to them again.',
      RenterFeedback: 'Equipment worked OK, but seemed to be in worse condition than listed.'
    },
  ]);
};
