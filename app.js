const express = require("express");
const app = express();
app.use( express.static("public") );
app.use( express.static("mailegou") );
//app.use('/html',express.static("html") );
const bodyparser = require("body-parser");
app.use( bodyparser.urlencoded());

//multer
var multer = require("multer");
//fs 
var fs = require("fs");

//数据库
const mongodb = require("mongodb");
const ObjectId = mongodb.ObjectID;//唯一标识符
const MongoClient = mongodb.MongoClient;//客户端连接到服务器
const url = "mongodb://localhost:27017/";//连接地址数据库

app.get("/",( req , res )=>{
	res.sendFile(__dirname+"/mailegou/html/index.html");
})

//登录
require("./router/user_login.js")( app , MongoClient , url );
//管理员登录
require("./router/admin_login.js")( app , MongoClient , url );
//注册
require("./router/user_reg.js")( app , MongoClient , url );
//显示用户名页
require("./router/user_list.js")( app , MongoClient , url );
//删除用户信息
require("./router/user_del.js")( app , MongoClient , url , ObjectId );
//修改页面的信息显示
require("./router/user_info.js")( app , MongoClient , url , ObjectId );
//修改页面
require("./router/user_update.js")( app , MongoClient , url , ObjectId );

//富文本编辑器的上传功能
require("./router/goods_upload.js")( app , multer ,fs );
//添加商品信息
require("./router/goods_add.js")( app , multer , fs , MongoClient , url );
//商品信息显示页面
require("./router/goods_list.js")( app , MongoClient , url );
app.listen(8080);
