const knexConfig = require("./knexfile.js");
const moment = require("moment");
const knex = require("knex")(knexConfig.development);

const args = process.argv;

const newPersonEntry = {
  first_name: args[2],
  last_name: args[3],
  birthdate: args[4]
};

// callback
knex.insert(newPersonEntry).into('famous_people')
  .asCallback((err, rows) => {
    if (err) {
      console.log(err.stack);
      return false;
    }
    console.log("Inserted successfully");
    knex.destroy();
  });

// promises
// knex.insert(newPersonEntry).into('famous_people')
//   .then(function () {
//     console.log("Inserted successfully");
//   })
//   .finally(function () {
//     knex.destroy();
//   });