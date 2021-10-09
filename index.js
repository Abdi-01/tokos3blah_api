const express = require('express')
const cors = require('cors')
// const mysql = require('mysql')
const dotenv = require('dotenv')
dotenv.config()

const PORT = process.env.PORT
const app = express()

// const db = mysql.createConnection({
//   host: "103.166.156.201",
//   user: "dev",
//   password: "password",
//   database: "db_tokos3blah",
//   port: 3306,
//   multipleStatements: true,
// });

// db.connect((err) => {
//   if (err) {
//     return console.error(`error : ${err.message}`);
//   }
//   console.log("connected to MySQL Server");
// });

// module.exports = { db };


app.use(cors())
app.use(express.json())

app.get('/', (req, res) => {
    res.status(200).send('<h4>Welcome to your-api</h4>')
})


app.listen(PORT, () => console.log('Api Running :', PORT));