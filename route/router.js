const express = require('express');
const route = express.Router();
const auth = require('../auth/auth')
const android = require('../controller/user')
const data = require('../controller/data')

route.route('/user')
    .post(android.createUser)
    .get(auth.isBasicAuthenticated,android.readUser)
    .put(auth.isBasicAuthenticated,android.updateUser)
    .delete(auth.isBasicAuthenticated,android.deleteUser)

route.route('/data')
    .get(data.readData)


module.exports = route;



/*

route.route('/test')
    .get((req, res) => {

        console.log(req.query)


    })
    .post((req, res) =>{

        console.log(req.body)
        res.send("POST방식")

    })


route.route('/test/:id')
    .get((req, res) => {
        //데이터를 업데이트, 삭제

        console.log(req)

        res.send("확인2")
    })
*/


//Create = Post = 회원가입
//Read = Get = 로그인
//Update = Put = 회원정보수정
//Delete = Delete = 탈퇴