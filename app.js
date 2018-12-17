const express = require("express");
const app = express();
app.use( express.static("mailegou") );

//app.use('/html',express.static("html") );
const bodyparser = require("body-parser");
app.use( bodyparser.urlencoded());

//数据库
const mongodb = require("mongodb");
const ObjectId = mongodb.ObjectID;//唯一标识符
const MongoClient = mongodb.MongoClient;//客户端连接到服务器
const url = "mongodb://localhost:27017/";//连接地址数据库

app.get("/",( req , res )=>{
	res.sendFile(__dirname+"/mailegou/html/index.html");
})

//登录
require("./router/user_login.js")(app , MongoClient , url);
//注册
require("./router/user_reg.js")(app , MongoClient , url);

app.listen(8080);
