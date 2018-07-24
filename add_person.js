const settings = require("./settings"); // settings.json
const moment = require("moment");
const knex = require("knex")({
  client: 'pg',
  connection: {
    user: settings.user,
    password: settings.password,
    database: settings.database,
    host: settings.hostname,
    port: settings.port,
    ssl: settings.ssl
  }
});

const args = process.argv;

const newPersonEntry = {
  first_name: args[2],
  last_name: args[3],
  birthdate: args[4]
};

knex.insert(newPersonEntry).into('famous_people')
  .then(function () {
    console.log("Inserted successfully");
  })
  .finally(function () {
    knex.destroy();
  });
