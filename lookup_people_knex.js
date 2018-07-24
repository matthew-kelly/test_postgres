const knexConfig = require("./knexfile.js");
const moment = require("moment");
const knex = require("knex")(knexConfig.development);


// command line arguments
const arg = process.argv[2];

// search database by first_name
knex
  .select('first_name', 'last_name', 'birthdate')
  .from('famous_people')
  .where('first_name', 'like', arg)
  .asCallback(function (err, rows) {
    console.log("Searching ...");
    console.log(`Found ${rows.length} person(s) by the name '${arg}':`);
    rows.forEach((person, index) => {
      console.log(`- ${index + 1}: ${person.first_name} ${person.last_name}, born ${moment(person.birthdate).format('YYYY-MM-DD')}`);
    });
    knex.destroy();
  });