const mysql = require('mysql')

const db = mysql.createConnection({
  host: "103.166.156.201",
  user: "dev",
  password: "password",
  database: "db_tokos3blah",
  port: 3306,
  multipleStatements: true,
});

db.connect((err) => {
  if (err) {
    return console.error(`error : ${err.message}`);
  }
  console.log("connected to MySQL Server");
});

module.exports = { db };