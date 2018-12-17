$( function(){
	var str = location.href;
	var strurl = str.split("?")[1];
	if( strurl ){
		var pid = str.split("?")[1].split("=")[0];
		if( pid == "pid" ){
			var sid = str.split("?")[1].split("=")[1]
			$.ajax({
				type:"get",
				url:"../json/datalist.json",
				async:true,
				success:function(msg){
					var str = "";
					for( var i = 0 ; i < msg.length ; i++ ){
						var item = msg[i];
						if( item["id"] == sid ){
							str = `
									<button data-pid='${ item["id"] }' data-src='${item["src"]}' data-txt='${item["txt"]}' data-price='${item["price"]}' data-oprice='${item["oprice"]}'>加入购物车</button>
								`;
						}
					}
					$(".shopcarbtn").html( str );
				}
			})
		}
	}
})
