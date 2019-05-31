exports.seed = function(knex, Promise) {
  return knex('projects').insert([
    {
      name: 'Start Node.js and Express Challenge',
      description:
        'You learned lots this week, now apply it!',
    },
    {
      name: 'add more seeds for the challenge',
      description:
        'so that you can have enough data to test the project!',
    },
    {
      name: 'Complete Node.js and Express Challenge',
      description:
        'Build and Awesome API Using Node.js and Express to Manage Projects and Actions GTD Style!',
    },
  ]);
};
