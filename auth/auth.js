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


        let table ='member';
        let columns = ['id','password'];
        let where ='id';
        let userId =id;

        let where2 = 'password';
        let userPw = hash_password;

        //들어온값들
        console.log("auth/id:"+id+"pw:"+password)

        let quary = connection.query('select ?? from ?? where ??=? and ??=?',[columns,table,where,userId,where2,userPw], (err, rows) => {
            if (err) throw err;

            if(rows){
                callback(null,rows[0])
                /*
                단일 로 체크할때 쓰자
                rows[0].id;
                rows[0].password;
                rows[0].name;
                */
            }else{
                callback(null,false)//401에러발생
            }

        });

    }
));

exports.isBasicAuthenticated = passport.authenticate('basic', {session: false})

