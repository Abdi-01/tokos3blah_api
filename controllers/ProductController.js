const { db } = require("../database");
const { uploader } = require("../helper/uploader");
const fs = require("fs");
const path = require("path");

module.exports = {
  getData: (req, res) => {
    console.log(req.params.id);
    let query = `SELECT P.productName, P.price, P.img_product, P.category, W.Kode_Gudang, I.Quantity
                  FROM db_product_warehouse I
                  LEFT JOIN db_product P
                  ON I.id_product = P.id_product
                  LEFT JOIN db_warehouse W
                  ON I.id_warehouse = W.id_warehouse    
                  WHERE I.id_warehouse IN (SELECT U.id_warehouse FROM db_user U WHERE iduser=${db.escape(
                    req.params.id
                  )})`;

    db.query(query, (err, result) => {
      if (err) {
        console.log(err);
        res.status(500).send(err);
      }
      res.status(200).send(result);
    });
  },

  addProduct: (req, res) => {
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
        data.image_product = filepath;

        let { productName, price, category } = data;
        let query = `INSERT INTO  db_product VALUES (null, ${db.escape(
          productName
        )}, ${db.escape(price)}, ${db.escape(category)}, ${db.escape(
          filepath
        )}, null)`;
        db.query(query, data, (err, result) => {
          if (err) {
            console.log(err);
            fs.unlinkSync("./public" + filepath);
            res.status(500).send(err);
          }

          res.status(200).send({ id: result.insertId });
        });
      });
    } catch (error) {
      console.log(error);
      res.status(500).send(error);
    }
  },

  addProductWarehouse: (req, res) => {
    const idproduct = req.body.id_product;
    const idwarehouse = req.body.id_warehouse;
    const qty = req.body.Quantity;

    let query = `INSERT INTO  db_product_warehouse VALUES (null, ${db.escape(
      idproduct
    )}, ${db.escape(idwarehouse)}, ${db.escape(qty)})`;
    db.query(query, (err, result) => {
      if (err) {
        console.log(err);
        res.status(500).send(err);
      }

      res.status(200).send(result);
    });
  },

  editProduct: (req, res) => {
    let query1 = `UPDATE db_product_warehouse SET ${db.escape(
      req.body.Quantity
    )} WHERE id_product_warehouse = ${db.escape(req.params.id)}`;
    db.query(query1, (err, result) => {
      if (err) {
        console.log(err);
        res.status(500).send(err);
      }
      res.status(200).send(result);
    });
  },

  deleteProduct: (req, res) => {
    let query = `DELETE FROM db_product WHERE id_product = ${db.escape(
      req.params.id
    )}`;
    db.query(query, (err, result) => {
      if (err) {
        console.log(err);
        res.status(500).send(err);
      }

      res.status(200).send(result);
    });
  },
};
