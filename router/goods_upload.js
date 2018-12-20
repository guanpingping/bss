module.exports = function( app , multer ,fs ){
	app.post("/goods_upload" ,function( req , res ){
		var upload = multer({"dest":"public/upload/a"}).single('img');
		upload( req , res , function( err ){
			fs.renameSync( req.file.path , req.file.destination+req.file.originalname );
			res.send('{"errno":0,"data":["'+(req.file.destination+req.file.originalname).replace('public','')+'"]}');
		})
	})
}
