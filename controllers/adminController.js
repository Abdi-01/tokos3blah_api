const {db} = require('../database')

module.exports = {
  getData:(req,res)=>{
    let scriptQuery = 'Select * from db_user'
    if(req.query.role){
        scriptQuery = `select * from db_user where role = ${db.escape(req.query.role)};`
        }
        db.query(scriptQuery,(err,results)=>{
        if(err) res.status(401).send(err)
        res.status(200).send(results)
        })
    }
}