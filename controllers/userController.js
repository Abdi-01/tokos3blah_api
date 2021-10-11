const { db } = require("../database");
const { createToken } = require("../helper/createToken");
const Crypto = require("crypto");
const transporter = require("../helper/nodemailer");

module.exports = {
  getData: (req, res) => {
    req.body.password = Crypto.createHmac("sha1", "hash123")
      .update(req.body.password)
      .digest("hex");
    let scriptQuery = `Select * from db_user where email=${db.escape(
      req.body.email
    )} and password=${db.escape(req.body.password)};`;
    console.log(req.body, scriptQuery);
    db.query(scriptQuery, (err, results) => {
      if (err) res.status(500).send(err);
      if (results[0]) {
        let { iduser, fullname, email, password, role, verified } = results[0];
        let token = createToken({
          iduser,
          fullname,
          email,
          password,
          role,
          verified,
        });
        console.log(token);
        if (verified != "true") {
          res.status(200).send({ message: "Your account not verified" });
        } else {
          res
            .status(200)
            .send({ dataLogin: results[0], token, message: "Login Success" });
        }
      }
    });
  },
  addData: (req, res) => {
    console.log(req.body);
    let { fullname, email, password, address, age, gender } = req.body;
    password = Crypto.createHmac("sha1", "hash123")
      .update(password)
      .digest("hex");
    console.log(password);
    let insertQuery = `Insert into db_user values (null,${db.escape(
      fullname
    )},${db.escape(email)},${db.escape(password)},${db.escape(
      address
    )},${db.escape(age)},${db.escape(gender)},null, 'user','false',null);`;
    console.log(insertQuery);
    db.query(insertQuery, (err, results) => {
      if (err) {
        console.log(err);
        res.status(500).send(err);
      }
      if (results.insertId) {
        let sqlGet = `Select * from db_user where iduser = ${results.insertId};`;
        db.query(sqlGet, (err2, results2) => {
          if (err2) {
            console.log(err2);
            res.status(500).send(err2);
          }

          // bahan data untuk membuat token
          let { iduser, fullname, email, password, role, verified } =
            results2[0];
          // membuat token
          let token = createToken({
            iduser,
            fullname,
            email,
            password,
            role,
            verified,
          });

          let mail = {
            from: `Admin <TokoS3blah@gmail.com>`,
            to: `${email}`,
            subject: "Account Verification",
            html: `<a href='http://localhost:3000/authentication/${token}'>Click here to verify your account</a>`,
          };

          transporter.sendMail(mail, (errMail, resMail) => {
            if (errMail) {
              console.log(errMail);
              res.status(500).send({
                message: "Registration Failed!",
                success: false,
                err: errMail,
              });
            }
            res.status(200).send({
              message: "Registration Success, Check Your Email!",
              success: true,
            });
          });
        });
      }
    });
  },
  keepLogin: (req, res) => {
 
    let scriptQuery = `Select * from users where email=${db.escape(
      req.body.email
    )} and password=${db.escape(req.body.password)};`;


    db.query(scriptQuery, (err, results) => {
      if (err) res.status(500).send({ errMessage: "Internal server error" });

      if (results[0]) {
        console.log(
          `Data from token matches the database, keep user '${results[0].username}' logged in`
        );

        res.status(200).send({
          dataLogin: results[0],
          token: req.token,
          message: "Keep login success",
        });
      } else {
        console.log("Data doesn't match the database");
        res.status(200).send({
          errMessage: "Data doesn't match the database",
        });
      }
    });
  },
  verification: (req, res) => {
    let updateQuery = `Update db_user set verified= 'true' where iduser = ${req.user.iduser}`;
    db.query(updateQuery, (err, results) => {
      if (err) {
        console.log(err);
        res.status(500).send(err);
      }
      res.status(200).send({ message: "Verified Account", success: true });
    });
  },
};
