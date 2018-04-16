const mysql = require('mysql');
const dbconfig = require('../config/database')
const  connection =mysql.createConnection(dbconfig)


exports.readData = function (req, res) {
/*    let table ='data';
    let columns = ['title','image'];
    let where ='id';
    let userId =id;

    let where2 = 'password';
    let userPw = hash_password;*/
    let table ='columns';
    let limit=req.query.num;
    //들어온값들
    //ex) local:3000/data?num=1
    console.log("받는값 : "+req.query.num)

    let quary = connection.query('select * from ?? limit 0,'+limit,[table], (err, rows) => {
        if (err) throw err;

        res.send(rows);

    });
}
