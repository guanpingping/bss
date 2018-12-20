module.exports = function( app , MongoClient , url ){
	app.get("/goods_list",( req , res )=>{
		var page = req.query.page*1,
			pagenum = req.query.pagenum*1,
			wd = req.query.wd;
		MongoClient.connect( url , ( err , database )=>{
			var db = database.db("db1819");
			var where = {"uname":new RegExp(wd,"i")};
			db.collection("goods").find(where).count().then((result)=>{
				var count = result,
					maxpage = Math.ceil( count/pagenum );
					db.collection("goods").find(where).sort({time:-1}).skip((page-1)*pagenum).limit(pagenum).toArray((err,data)=>{
						var json = {
							"maxpage":maxpage,
							"data":data
						}
						res.send( json );
					})
			})
		})
	})
}
