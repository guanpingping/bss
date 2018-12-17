module.exports = function( app , MongoClient , url ){
	app.post("/register",( req , res )=>{
		var uname = req.body.regname,//姓名
			upwd = req.body.regpwd;//密码
		MongoClient.connect( url , ( err , database )=>{//连接mongodb数据库
		
			//创建或使用数据库
			var db = database.db("db1819");
			//保证用户名唯一
			var obj = {"uname":uname,"upwd":upwd};
			db.collection("user").find({"uname":uname}).count().then( result=>{
				if( result == 0 ){
					//插入数据
					db.collection("user").insertOne( obj , ( err , result )=>{
						console.log(result);
						res.send("注册成功<script>setTimeout(function(){location.href='html/login-register.html?status=login'},1500)</script>")
					})
				}else{
					res.send("该用户名已占用<script>setTimeout(function(){location.href='html/login-register.html?status=register'},1500)</script>");
				}
			})
		
		})
	})
}
