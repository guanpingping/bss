module.exports = function( app , MongoClient , url ){
	app.post("/login",( req , res )=>{
		var uname = req.body.uname,//登录姓名
			upwd = req.body.upwd;//登录密码
//			console.log( uname , upwd );
		
		MongoClient.connect( url ,( err , database)=>{
			
			var db = database.db("db1819");
			var obj = {"uname":uname,"upwd":upwd};
			//查找数据
			db.collection("user").find(obj).toArray(( error , result )=>{
				if( result.length==0 ){
					res.send("登录失败<script>setTimeout(function(){location.href='html/login-register.html?status=login},1500)</script>")
				}else{
					res.send("登录成功<script>setTimeout(function(){location.href='/'},1500)</script>")
				}
			})
		})
	})
}