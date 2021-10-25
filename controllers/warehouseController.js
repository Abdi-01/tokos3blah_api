const { db } = require("../database");

module.exports = {
	getWarehouse: (req, res) => {
		let scriptQuery = `Select * from db_warehouse;`;
		db.query(scriptQuery, (err, results) => {
			if (err) res.status(500).send(err);
			res.status(200).send(results);
		});
	},

	addWarehouse: (req, res) => {
		console.log(req.body);
		let { Kode_Gudang, Lokasi, Status } = req.body;
		let insertQuery = `insert into db_warehouse values(null, ${db.escape(
			Kode_Gudang
		)},${db.escape(Lokasi)},${db.escape(Status)})`;
		console.log(insertQuery);
		db.query(insertQuery, (err, results) => {
			if (err) res.status(500).send(err);
			res.status(200).send(results);
		});
	},

	editWarehouse: (req, res) => {
		let { Kode_Gudang, Lokasi, Status, id_warehouse } = req.body;
		let updateQuery = `update db_warehouse set Kode_gudang = ${db.escape(
			Kode_Gudang
		)}, lokasi = ${db.escape(Lokasi)}, status = ${db.escape(
			Status
		)} where id_warehouse = ${db.escape(id_warehouse)}`;
		console.log(updateQuery);
		db.query(updateQuery, (err, results) => {
			if (err) res.status(500).send(err);
			res.status(200).send(results);
		});

		// let wareHouseUpdate = [];
		// for (let prop in req.body) {
		// 	wareHouseUpdate.push(`${prop} = ${db.escape(req.body[prop])}`);
		// 	console.log(req.body);
		// }
		// let updateQuery = `UPDATE db_warehouse set ${wareHouseUpdate} where id_warehouse = ${req.params.id_warehouse}`;
		// console.log(updateQuery);
		// db.query(updateQuery, (err, results) => {
		// 	if (err) res.status(500).send(err);
		// 	res.status(200).send(results);
		// });
	},

	delWarehouse: (req, res) => {
		let { id_warehouse } = req.body;
		let deleteQuery = `delete from db_warehouse where id_warehouse = ${db.escape(
			id_warehouse
		)}`;
		db.query(deleteQuery, (err, results) => {
			if (err) res.status(500).send(err);
			res.status(200).send(results);
		});
	},
};
