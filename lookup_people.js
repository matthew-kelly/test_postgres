const pg = require("pg");
const settings = require("./settings"); // settings.json

const client = new pg.Client({
  user: settings.user,
  password: settings.password,
  database: settings.database,
  host: settings.hostname,
  port: settings.port,
  ssl: settings.ssl
});

const arg = process.argv[2];
const values = [arg];

client.connect((err) => {
  if (err) {
    console.error("Connection Error", err);
    return false;
  }
  client.query("SELECT first_name, last_name, TO_CHAR(birthdate, 'yyyy-mm-dd') AS birthdate, ROW_NUMBER () OVER (ORDER BY id) FROM famous_people WHERE first_name LIKE $1::text", values, (err, result) => {
    if (err) {
      return console.error("error running query", err);
    }
    console.log("Searching ...")
    console.log(`Found ${result.rowCount} person(s) by the name '${values[0]}':`)
    result.rows.forEach((person) => {
      console.log(`- ${person.row_number}: ${person.first_name} ${person.last_name}, born ${person.birthdate}`)
    });
    client.end();
  });
});

function dbQuery() {};