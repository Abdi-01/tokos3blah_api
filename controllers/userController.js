const { db } = require("../database");
const { createToken } = require("../helper/createToken");
const Crypto = require("crypto");
const transporter = require("../helper/nodemailer");
const { decriptToken } = require("../helper/createToken");

module.exports = {
	getData: (req, res) => {
		let password = Crypto.createHmac("sha1", "hash123")
			.update(req.body.password)
			.digest("hex");
		let scriptQuery = `Select * from db_user where email=${db.escape(
			req.body.email
		)} and password=${db.escape(password)};`;
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
			} else {
				res.status(404).send({ message: "not found" });
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
		)},${db.escape(email)},${db.escape(password)},${db.escape(age)},${db.escape(gender)},null, 'user','false',null,null);`;
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
	forgotPass: (req, res) => {
		let user;
		let scriptQuery = `Select * from db_user where email=${db.escape(
			req.body.email
		)}`;
		db.query(scriptQuery, (err, results) => {
			if (err) {
				console.log(err);
				res.status(500).send({ message: err });
			}

			if (results.length <= 0) {
				console.log(results);
				res.status(401).send({ message: "email yang anda masukan salah" });
			} else {
				user = results[0];
				let insertQuery = `update db_user set verified = "false" where iduser = ${results[0].iduser}`;
				db.query(insertQuery, (err, results) => {
					if (err) {
						res.status(500).send({ message: err });
					}
					let { iduser, fullname, email, password, role, verified } = user;
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
						html: `<a href='http://localhost:3000/change-password/${token}'>Click here to change your password</a>`,
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
					// res.status(200).send({ message: insertQuery });
				});
				//res.status(200).send({ message:results[0]});
			}
		});
	},
	changePass: (req, res) => {
		let token = req.body.token;
		let password = Crypto.createHmac("sha1", "hash123")
			.update(req.body.password)
			.digest("hex");
		let user = decriptToken(token);
		let scriptQuery = `update db_user set password = ${db.escape(
			password
		)} where iduser = ${user.iduser}`;
		db.query(scriptQuery, (err, result) => {
			if (err) {
				res.status(500).send({ message: err });
			}
			let insertQuery = `update db_user set verified = "true" where iduser = ${user.iduser}`;
			db.query(insertQuery, (err, results) => {
				if (err) {
					res.status(500).send({ message: err });
				}
				res.status(200).send({ message: "keganti woi" });
			});
		});
	},

	// Mengambil data user Superadmin & admin
	getAdmin: (req, res) => {
		let scripQuery = `select * from db_user JOIN db_warehouse on db_user.id_warehouse = db_warehouse.id_warehouse;`;
		db.query(scripQuery, (err, results) => {
			if (err) res.status(500).send(err);
			res.status(200).send(results);
		});
	},

	addAdmin: (req, res) => {
		let { fullname, email, password, age, gender, role, id_warehouse } =
			req.body;
		let insertQuery = `Insert into db_user values (null,${db.escape(
			fullname
		)},${db.escape(email)},${db.escape(password)},${db.escape(age)},${db.escape(
			gender
		)},null,${db.escape(role)},"true",null,${db.escape(id_warehouse)})`;
		console.log(insertQuery);
		db.query(insertQuery, (err, results) => {
			console.log(err);
			if (err) res.status(500).send(err);
			db.query(
				`select * from db_user where fullname =${db.escape(fullname)}`,
				(err2, results2) => {
					if (err2) res.status(501).send(err2);
					res
						.status(200)
						.send({ message: "penambahan admin berhasil", data: results2 });
				}
			);
		});
	},

	editAdmin: (req, res) => {
		let { fullname, email, password, age, gender, role, id_warehouse, iduser } =
			req.body;
		let updateQuery = `update db_user set fullname = ${db.escape(
			fullname
		)}, email = ${db.escape(email)}, age =  ${db.escape(
			age
		)} where iduser = ${db.escape(iduser)}`;
		//  let insertQuery = `Update db_user set
		//(null,${db.escape(
		// 	fullname
		// )},${db.escape(email)},${db.escape(password)},${db.escape(age)},${db.escape(
		// 	gender
		// )},null,${db.escape(role)},"true",null,${db.escape(id_warehouse)}) where iduser = ${db.escape(iduser)}`;
		console.log(updateQuery);
		db.query(updateQuery, (err, results) => {
			console.log(err);
			if (err) res.status(500).send(err);
			db.query(
				`select * from db_user where fullname =${db.escape(fullname)}`,
				(err2, results2) => {
					if (err2) res.status(501).send(err2);
					res
						.status(200)
						.send({ message: "penambahan admin berhasil", data: results2 });
				}
			);
		});
	},
	delAdmin: (req, res) => {
		let { iduser } = req.body;
		let deleteQuery = `delete from db_user where iduser = ${db.escape(iduser)}`;
		db.query(deleteQuery, (err, results) => {
			if (err) res.status(500).send(err);
			res.status(200).send(results);
		});
	},
};
