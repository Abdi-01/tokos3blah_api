const mysql = require('mysql')

const db = mysql.createPool({
  host: "103.166.156.201",
  user: "dev",
  password: "password",
  database: "db_tokos3blah",
  port: 3306,
  multipleStatements: true,
  connectionLimit: 1000,
  connectTimeout: 60 * 60 * 1000,
  acquireTimeout: 60 * 60 * 1000,
  timeout: 60 * 60 * 1000,
});

db.getConnection((err) => {
  if (err) {
    return console.error(`error : ${err.message}`);
  }
  console.log("connected to MySQL Server");
});

module.exports = { db };