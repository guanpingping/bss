module.exports = function( app , MongoClient , url , ObjectId ){
	app.get("/user_del", ( req , res )=>{
		var id = ObjectId(req.query.id);
		MongoClient.connect( url , ( err , database )=>{
			var db = database.db("db1819");
			var where ={"_id":id};
			db.collection("user").deleteOne(where,(err,result)=>{
				res.send(result);
			})
		})
	})
	
	app.post("/user_del",( req , res )=>{
		var ids = req.body.ids.split(",");//转成数组
		var brr = ids.map(function(item){
			return ObjectId(item);
		})
		MongoClient.connect( url , ( err , database )=>{
			var db = database.db("db1819");
			var where = {"_id":{$in:brr}};//$in是或者的意思
			db.collection("user").deleteMany( where , ( err , result )=>{
				res.send( result );
			})
		})
	})
}
