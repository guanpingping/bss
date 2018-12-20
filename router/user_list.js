module.exports = function( app , MongoClient , url ){
	app.get("/userlist",function( req , res ){
		var page = req.query.page*1;
			pagenum = req.query.pagenum*1;
			wd = req.query.wd;
		MongoClient.connect( url , ( err , database )=>{
			//使用或创建数据库
			var db = database.db("db1819");
			
			//数据库的查询
			var where = {};
			if( wd ){
				where = {"uname":new RegExp(wd,"i")};
			}
			//求总页数
			db.collection("user").find(where).count().then(result=>{
				var count = result;
				var maxpage = Math.ceil(count/pagenum);
				db.collection("user").find(where).sort({time:-1}).skip((page-1)*pagenum).limit(pagenum).toArray(( err , data)=>{
					var json = {
						"maxpage":maxpage,
						"data":data
					}
					res.send( JSON.stringify(json) );
				})
			})
		})
	})
}
