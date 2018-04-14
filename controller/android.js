const crypto = require('crypto');
const jwt = require('jsonwebtoken')
let jwtKey = "20170503"

const mysql = require('mysql');
const dbconfig = require('../config/database')
const  connection =mysql.createConnection(dbconfig)

exports.createData = function (req, res) {

/*    let userName = req.body.userName;
    let password = req.body.password;

*/

    let password = req.body.password;

    const hash = crypto.createHash('sha256')
    hash.update(password)
    let hash_password = hash.digest('hex');


    let data ={'name':req.body.name,
        'id':req.body.id,
        'password':hash_password}

    let quary = connection.query('insert into member set ?',data,function (err, rows) {
        if(err) throw err;

        if(rows){
            console.log("가입성공")
        }

        res.send('success')

    });

}

exports.readData = function (req, res) {

    console.log("controller user read:",req.user)

    let token = jwt.sign(req.user,jwtKey);
    res.send(token)

/*    connection.query('SELECT * from member',function (err, rows) {
        if(err) throw err;
        res.send(rows)
    });*/


}

exports.updateData = function (req, res) {
    //수정되는 코드
    res.send("유저가 수정되었습니다.")
}

exports.deleteData = function (req, res) {
    //삭제 코드
    res.send("유저가 삭제되었습니다.")
}