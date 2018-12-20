module.exports = function( app , multer , fs , MongoClient , url  ){
	app.post("/goods_add",( req , res )=>{
		var upload = multer({"dest":"public/upload/b"}).single("pic");
		upload( req , res , function( err ){
			var arrfilename = req.file.originalname.split('.');
			  suffix = arrfilename[arrfilename.length-1];
			 var filename =  req.file.destination +"/"+ req.file.filename +"."+suffix;
			fs.renameSync( req.file.path , filename );
//			console.log(req.file,req.file.destination +"/"+ req.file.filename +"."+suffix)
			var uname = req.body.uname,
				con = req.body.conntent,
				price = req.body.price;
			MongoClient.connect( url , ( err , database )=>{
				var db = database.db("db1819");
				//插入
				where = {
					"uname":uname,
					"pic":filename.replace("public",""),
					"price":price,
					"con":con,
					"ip":(req.ip).replace("::ffff:",""),
					"time":new Date()
				}
				db.collection("goods").insertOne( where , ( err , result )=>{
					res.send( result );
				})
			})
		})
	})
}
