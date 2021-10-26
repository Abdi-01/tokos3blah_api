const { db } = require("../database");

module.exports = {
	getAddress: (req, res) => {
		let scriptQuery = `Select * from db_address;`;
		db.query(scriptQuery, (err, results) => {
			if (err) res.status(500).send(err);
			res.status(200).send(results);
		});
	},

	addAddress: (req, res) => {
		console.log(req.body);
		let { address, iduser } = req.body;
		let insertQuery = `insert into db_address values(null, ${db.escape(
			address
		)},${db.escape(iduser)}`;
		console.log(insertQuery);
		db.query(insertQuery, (err, results) => {
			if (err) res.status(500).send(err);
			res.status(200).send(results);
		});
	},

	editAddress: (req, res) => {
		let { address } = req.body;
		let updateQuery = `update db_address set address = ${db.escape(
			address
		)} where id_address = ${db.escape(id_address)}`;
		console.log(updateQuery);
		db.query(updateQuery, (err, results) => {
			if (err) res.status(500).send(err);
			res.status(200).send(results);
		});
	},
	delAddress: (req, res) => {
		let { id_address } = req.body;
		let deleteQuery = `delete from db_address where id_address = ${db.escape(
			id_address
		)}`;
		db.query(deleteQuery, (err, results) => {
			if (err) res.status(500).send(err);
			res.status(200).send(results);
		});
	},
};
