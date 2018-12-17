$( function(){
	
	//获取localStorage中存储的数据
	var prostr = localStorage.getItem("prolist");
	console.log(prostr);
	if( prostr && prostr !="[]"){
		$(".prolist").show();
		$(".nopro").hide();
		var arr = JSON.parse( prostr );
		var str = "";
		for( var i = 0 ; i < arr.length ; i++ ){
			var item = arr[i];
			str +=`
					<tr class="pro">
							<td><input type="checkbox" class="single"/></td>
							<td>
								<img src="../img/${item['src']}"/>
								<div class="pro-txt">${item['txt']}</div>
							</td>
							<td class="tr-center pro-price">
								￥${item['price']}.00
							</td>
							<td class="tr-center data-infomation" data-pid='${item["id"]}' data-txt='${item["txt"]}' data-src='${item["src"]}' data-price='${item["price"]}' data-count='${item["count"]}'>
								<input type="button" value="-" class="updateCount"  data-number="-1"/>
								<input type="button" value="${item['count']}" id="num" class="txt"/>
								<input type="button" value="+" class="updateCount" id="add"  data-number="1"/>
							</td>
							<td  class="tr-center pro-price-tol">
								￥${item['price']*item['count']}.00
							</td>
							<td  class="tr-center">
								<i class="fl delBtn">删除</i>
							</td>
						</tr>
					`;
		}
		$(".table-list").append(str);
		
		//全选
		$(".selectAll").on("click",function(){
			$(".single").prop("checked",$(this).prop("checked"));
			calculate();
		})
		
		//每一个single
		$(".single").on("click",function(){
			var count = 0;
			$(".single").each(function( index , ele ){
				if( $(ele).prop("checked") ){
					count++;
				}
			})
			if(count<$(".single").length){
				$(".selectAll").prop("checked",false);
			}else if( count=$(".single").length ){
				$(".selectAll").prop("checked",true);
			}
			calculate();
		})
		
		//加减功能
		$(".updateCount").on("click",function(){
			var sign = $(this).data("number");
			var pid =  $(this).parent().data("pid");
			var count = parseInt( $(this).parent().children("#num").val() );
			if(count==1&&sign==-1){
				return;
			}
			count += sign;
			for( var i = 0 ; i < arr.length ; i++ ){
				if( arr[i].id == pid ){
					arr[i].count = count;
					$(this).parent().children("#num").val(count);
					$(this).parent().parent().children(".pro-price-tol").html("￥"+(arr[i].count*arr[i].price)+".00");
					console.log(arr)
					localStorage.setItem("prolist",JSON.stringify(arr));
					calculate();
					break;
				}
			}
			return false;
		})
		
		//删除
		$(".delBtn").on( "click" , function(){
			var pid = $(this).parent().parent().children(".data-infomation").data("pid");
			if( confirm("确认删除吗？")){
				for( var i = 0 ; i < arr.length ; i++ ){
					if( arr[i].id == pid ){
						arr.splice(i,1);
						localStorage.setItem("prolist",JSON.stringify(arr));
						$(this).parent().parent().remove();
						calculate();
						if( arr.length == 0 ){
							$(".prolist").hide();
							$(".nopro").show();
						}
						break;
					}
				}
			}
		})
		
		//计算金额
		function calculate(){
			var count = 0;
			var money = 0;
			$(".single:checked").each( function( index ,ele ){
				var that = $(ele).parent().parent().find(".data-infomation");
				count += parseInt( that.children(".txt").val());
				money += parseInt( that.children(".txt").val()* that.data("price"));
			})
			$(".count2").html(count);
			$(".money2").html("￥"+money+".00");
		}
		//清空购物车
		$(".clearshopcar").click(function(){
			if(confirm("确认清空购物车吗？")){
				localStorage.setItem("prolist","");
				$(".table-list").find(".pro").remove();
				$(".prolist").hide();
				$(".nopro").show();
			}
		})
	}else{
		$(".prolist").hide();
		$(".nopro").show();
	}
})
