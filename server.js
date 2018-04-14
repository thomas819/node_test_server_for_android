const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const router = require('./route/router');
const bodyParser = require('body-parser');
/*const mongoose = require('mongoose');

mongoose.Promise = global.Promise
mongoose.connect('mongodb://localhost/study')*/

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))//false면 String object로만//true 면 어떤 타입인지 다 받을수있음


app.use(router)

app.listen(port, err => {
    if(err) console.log(err)
    else console.log("서버가 가동되었습니다")
})