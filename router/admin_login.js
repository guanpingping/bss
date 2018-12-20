module.exports = function( app , MongoClient , url  ){
	app.post("/admin_login",(req,res) =>{
		var adminname = req.body.adminname,
			adminpass = req.body.adminpass;
		MongoClient.connect( url , ( err , database )=>{
			var db = database.db("db1819");
			//存入管理员信息
			/*var obj = {"user":"admin","pwd":"123"};
			db.collection("admin").insertOne(obj,(err,result)=>{
				console.log( result );
			})*/
			//查找
			var obj = {"user":adminname,"pwd":adminpass};
			db.collection("admin").find( obj ).toArray(( err , result )=>{
				if( result.length === 0 ){
					res.send('{"state":"0","msg":"登录失败，账户名密码错误"}');
				}else{
					res.send('{"state":"1","msg":"登录成功"}');
				}
			})
		})
	})
}
