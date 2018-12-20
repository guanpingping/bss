module.exports = function( app , MongoClient , url , ObjectId ){
	app.get("/user_update",( req , res )=>{
		console.log(req.query.id );
		var str = req.query.str;
		var id = ObjectId( req.query.id);
		MongoClient.connect( url , ( err , database )=>{
			var db = database.db("db1819");
			var where = {"_id":id};
			var update = {$set:{"uname":str}};
			db.collection("user").updateOne(where,update,(err,result)=>{
//				console.log(result);
				res.send( "修改成功" );
			})
		})
		
	})
}
