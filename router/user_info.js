module.exports = function( app , MongoClient , url , ObjectId ){
	app.get("/user_info" , ( req , res )=>{
		var id = ObjectId( req.query.id );
		MongoClient.connect( url , ( err , database )=>{
			//创建或使用mongodb数据库
			var db = database.db("db1819");
			
			//根据_id查找
			var where = {"_id":id};
			db.collection("user").find(where).toArray((err,result)=>{
				res.send(result);
			})
		})
	})
}
