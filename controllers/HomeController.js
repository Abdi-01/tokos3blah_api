const { db } = require("../database");

module.exports = {
  getData: (req, res) => {
    let query = "SELECT * FROM db_product";
    db.query(query, (err, result) => {
      if (err) {
        res.status(500).send(err);
      }
      res.status(200).send(result);
    });
  },

  

  getDataById: (req, res) => {
    let query = `SELECT * FROM db_product WHERE id_product = ${req.params.productId}`;
    db.query(query, (err, result) => {
      if (err) {
        res.status(500).send(err);
      }
      res.status(200).send(result);
    });
  },
};
