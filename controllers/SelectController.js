const { db } = require("../database");

module.exports = {
  getData: (req, res) => {
    let query = "Select * from db_product";

    db.query(query, (err, results) => {
      if (err) res.status(500).send(err);
      res.status(200).send(results);
    });
  },
};
