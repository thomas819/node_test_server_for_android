const passport = require('passport');
const BasicStrategy = require('passport-http').BasicStrategy;
const crypto = require('crypto');

const mysql = require('mysql');
const dbconfig = require('../config/database')
const  connection =mysql.createConnection(dbconfig)


passport.use(new BasicStrategy(
    function (id, password, callback) {
        const hash = crypto.createHash('sha256')
        hash.update(password)
        let hash_password = hash.digest('hex')

/*        User.findOne({userName:id,password:hash_password},{password:0},(err, doc) =>{

            if(doc){
                //조건이 맞으면 doc 데이터가 넘어오며 조건이 없을경우 if(doc)이 false 된다
                callback(null, doc);
            }else {
                callback(null, false); //401 에러
            }

        })*/


        let table ='member';
        let columns = ['id','password'];
        let where ='id';
        let userId ='zzzzz';

        let where2 = 'password';
        let userPw = '68a55e5b1e43c67f4ef34065a86c4c583f532ae8e3cda7e36cc79b611802ac07';

        let quary = connection.query('select ?? from ?? where ??=? and ??=?',[columns,table,where,userId,where2,userPw],function (err, rows) {
            if(err) throw err;
            if(rows){
                callback(null,rows)
                console.log(rows)
            }else{
                callback(null,false)//401에러발생
            }

        });



        // // 디비에 접근을 해서 아이디랑 비밀번호를 가져와서 확인을 하는 부분
        // if (id === "study" && password === "1234") {
        //     callback(null, id);
        // } else {
        //     callback(null, false)
        // }

    }
));

exports.isBasicAuthenticated = passport.authenticate('basic', {session: false})

