$( function(){
	$.ajax({
		type:"get",
		url:"../json/datalist.json",
		async:true,
		success:function( msg ){
			var str = "";
			for( var i = 0 ; i < msg.length ; i++ ){
				var item = msg[i];
				str +=`
						<li>
							<a href="xianqingye.html?pid=${item.id}">
								<img src="../img/${item["src"]}" />
								<p class="proinfo-txt">${item["txt"]}</p>
								<p class="proinfo-price">￥${item["price"]}<del>￥${item["oprice"]}</del></p>
							</a>
							<button data-pid='${ item["id"] }' data-src='${item["src"]}' data-txt='${item["txt"]}' data-price='${item["price"]}' data-oprice='${item["oprice"]}'>加入购物车</button>
						</li>
						`;
			}
			$(".shoplist").append(str);
		}
	});
	
	
	$(".open-menu-btn").mouseenter( function(){
		$(".menubox").show();
	})
	$(".open-menu-btn").mouseleave( function(){
		$(".menubox").hide();
	})
	
})
