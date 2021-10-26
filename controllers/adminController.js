const { db } = require("../database");
const { uploader } = require("../helper/uploader");
const fs = require("fs");

module.exports = {
  getData: (req, res) => {
    let scriptQuery = "Select * from db_user";
    if (req.query.role) {
      scriptQuery = `select * from db_user where role = ${db.escape(
        req.query.role
      )};`;
    }
    db.query(scriptQuery, (err, results) => {
      if (err) res.status(500).send(err);
      res.status(200).send(results);
    });
  },
  getDataById: (req, res) => {
    let scriptQuery = `SELECT * FROM db_user where iduser = ${req.params.id}`;
    db.query(scriptQuery, (err, results) => {
      if (err) res.status(500).send(err);
      res.status(200).send(results);
    });
  },

  editProfile: (req, res) => {
    try {
      let path = "/image";
      const upload = uploader(path, "IMG").fields([{ name: "file" }]);

      upload(req, res, (error) => {
        if (error) {
          console.log(error);
          res.status(500).send(error);
        }

        const { file } = req.files;

        const filepath = file ? path + "/" + file[0].filename : null;

        let data = JSON.parse(req.body.data);
        if (file) {
          data.img_product = filepath;
        }

        //kondisi
        let dataUpdate = [];
        for (let prop in data) {
          dataUpdate.push(`${prop} = ${db.escape(data[prop])}`);
        }

        let query1 = `UPDATE db_user SET ${dataUpdate} WHERE iduser = ${req.params.iduser}`;
        db.query(query1, (err, result) => {
          if (err) {
            console.log(err);
            res.status(500).send(err);
          }
          res.status(200).send(result);
        });
      });
    } catch (error) {
      console.log(error);
      res.status(500).send(error);
    }
  },
};
