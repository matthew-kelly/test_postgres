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

// command line arguments
const arg = process.argv[2];

// connect to database
client.connect((err) => {
  if (err) {
    console.error("Connection Error", err);
    return false;
  }
});

// database access function
function runQuery(query, values, cb) {
  client.query(query, values, (err, res) => {
    if (err) {
      console.error(err.stack);
      return false;
    }
    // run callback on res.rows
    cb(res.rows);
    client.end();
  });
}

// search database by first_name
function queryByFirstName(name) {
  const query = "SELECT first_name, last_name, TO_CHAR(birthdate, 'yyyy-mm-dd') AS birthdate, ROW_NUMBER () OVER (ORDER BY id) FROM famous_people WHERE first_name LIKE $1::text";
  const values = [name];

  runQuery(query, values, (data) => {
    console.log("Searching ...");
    console.log(`Found ${data.length} person(s) by the name '${values[0]}':`);
    data.forEach((person) => {
      console.log(`- ${person.row_number}: ${person.first_name} ${person.last_name}, born ${person.birthdate}`);
    });
  })
};

// call first_name function
queryByFirstName(arg);