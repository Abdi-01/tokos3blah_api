const { db } = require("../database");
const { uploader } = require("../helper/uploader");
const fs = require("fs");
const path = require("path");

module.exports = {
  // getData: (req, res) => {
  //   let query = "SELECT * FROM db_product";
  //   db.query(query, (err, result) => {
  //     if (err) {
  //       res.status(500).send(err);
  //     }
  //     res.status(200).send(result);
  //   });
  // },

  getDataWarehouse: (req, res) => {
    let query = "SELECT * FROM db_warehouse";
    db.query(query, (err, result) => {
      if (err) {
        res.status(500).send(err);
      }
      res.status(200).send(result);
    });
  },

  // getProductWarehouse: (req, res) => {
  //   let query =
  //     "SELECT * FROM db_product_warehouse A LEFT JOIN db_warehouse C ON C.id_warehouse = A.id_warehouse";
  //   db.query(query, (err, result) => {
  //     if (err) {
  //       res.status(500).send(err);
  //     }
  //     res.status(200).send(result);
  //   });
  // },

  // getNew: (req, res) => {
  //   let getProducts = [];

  //   getData.forEach((value) => {
  //     let stock = [];
  //     getProductWarehouse.forEach((val) => {
  //       if (value.id_product == val.id_product) {
  //         stock.push(val);
  //       }
  //     });
  //     getProducts.push({ ...value, stock });
  //   });
  //   db.query(query, (err, result) => {
  //     if (err) {
  //       res.status(500).send(err);
  //     }
  //     res.status(200).send(result);
  //   });
  // },

  // getData: (req, res) => {
  //   let query =
  //     "SELECT A.id_product, A.productName, A.category, A.price, A.img_product, A.id_warehouse as id, B.Quantity, C.Kode_Gudang, C.id_warehouse FROM db_product A LEFT JOIN db_product_warehouse B ON A.id_product = B.id_product LEFT JOIN db_warehouse C ON C.id_warehouse = A.id_warehouse";
  //   db.query(query, (err, result) => {
  //     if (err) {
  //       console.log(err);
  //       res.status(500).send(err);
  //     }
  //     res.status(200).send(result);
  //   });
  // },

  getData: (req, res) => {
    let query = `SELECT P.productName, P.price, P.img_product, P.category, W.Kode_Gudang, I.Quantity
    FROM db_product_warehouse I
    LEFT JOIN db_product P
    ON I.id_product = P.id_product
    LEFT JOIN db_warehouse W
    ON I.id_warehouse = W.id_warehouse
    WHERE I.id_warehouse = 2`;
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

        let { productName, price, category, id_warehouse } = data;
        let query = `INSERT INTO  db_product VALUES (null, ${db.escape(
          productName
        )}, ${db.escape(price)}, ${db.escape(category)}, ${db.escape(
          filepath
        )}, ${db.escape(id_warehouse)})`;
        db.query(query, data, (err, result) => {
          if (err) {
            console.log(err);
            fs.unlinkSync("./public" + filepath);
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

  addProductNew: (req, res) => {
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
        )})`;
        db.query(query, data, (err, result) => {
          if (err) {
            console.log(err);
            fs.unlinkSync("./public" + filepath);
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

  editProduct: (req, res) => {
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
          let currentImage = path.resolve(
            __dirname,
            `/public/image/${data.img_product}`
          );
          if (fs.existsSync(currentImage)) {
            fs.unlinkSync(currentImage);
          }
          data.img_product = filepath;
        }

        //kondisi
        let dataUpdate = [];
        for (let prop in data) {
          dataUpdate.push(`${prop} = ${db.escape(data[prop])}`);
        }

        let query1 = `UPDATE db_product SET ${dataUpdate} WHERE id_product = ${req.params.id}`;
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
