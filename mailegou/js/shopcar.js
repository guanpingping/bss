$( function(){
	$(".shopcarbtn").on("click","button",function(){
		fnShopCar($(this));
	})
	//添加购物车的功能，将当前购买的商品信息存入到
	$(".shoplist").on("click","button",function(){
		fnShopCar($(this));
	})
	function fnShopCar( that ){
		var  json = {};
		var arr = [];
		var flag = true;
		//fnInit方法的调用
		$.fnInit(that,$(".nav-cart")).fnImg(that.data("src"));
		json = {
			"id":that.data("pid"),
			"src":that.data("src"),
			"txt":that.data("txt"),
			"price":that.data("price"),
			"oprice":that.data("oprice"),
			"count":1
		}
		var brr = localStorage.getItem("prolist");
		if( brr ){
			arr =  JSON.parse( brr );
			for( var i = 0 ; i < arr.length ; i++ ){
				if( json.id == arr[i].id){
					arr[i].count++;
					flag = false;
					break;
				}
			}
		}
		if( flag ){
			arr.push( json );
		}
//		console.log(arr)
		localStorage.setItem("prolist",JSON.stringify(arr));
	}
	
	getCount();
//	购物车中的件数
	function getCount(){
		var count = 0;
		var brr = localStorage.getItem("prolist");
		if( brr ){
			var arr = JSON.parse( brr );
			for( var i = 0 ; i < arr.length ; i++ ){
				count += arr[i].count;
			}
		}
		$("#stopNum").html( count );
	}
	
	//插件实现抛物线功能
	$.extend({
		fnInit : function(startObj,endObj){
			//起始点
			this.startPoint = {
				x : startObj.offset().left + startObj.width()/2,
				y : startObj.offset().top
			}
			//结束点
			this.endPoint = {
				x : endObj.offset().left + endObj.width()/2,
				y : endObj.offset().top
			}
			//最高点
			this.topPoint = {
				x : this.endPoint.x - 100,
				y : this.endPoint.y- 80
			}
			//根据三点坐标确定抛物线方程系数a b c
			
			this.a = ((this.startPoint.y - this.endPoint.y) * (this.startPoint.x - this.topPoint.x) - (this.startPoint.y - this.topPoint.y) * (this.startPoint.x - this.endPoint.x)) / ((this.startPoint.x * this.startPoint.x - this.endPoint.x * this.endPoint.x) * (this.startPoint.x - this.topPoint.x)-(this.startPoint.x * this.startPoint.x - this.topPoint.x * this.topPoint.x) * (this.startPoint.x - this.endPoint.x));  
								
			this.b = ((this.endPoint.y - this.startPoint.y) - this.a * (this.endPoint.x * this.endPoint.x - this.startPoint.x * this.startPoint.x)) / (this.endPoint.x - this.startPoint.x);  
								
			this.c = this.startPoint.y - this.a * this.startPoint.x * this.startPoint.x - this.b * this.startPoint.x;
			//console.log( this.a,this.b,this.c );
			
			return this;
		},
		fnImg : function( imgSrc ){
			var img = $("<img>");
			$("body").append( img );
			img.attr( "src","../img/"+imgSrc);
			var x = this.startPoint.x;
			var y = this.startPoint.y;
		    img.css({
		    	"width":"20px",
		    	"height":"20px",
		    	"position":"absolute",
		    	"left":x,
		    	"top":y
		    })
		    
		    var timer = setInterval(function(){
		    	x = x + 10 ;
		    	y =  this.a*x*x + this.b*x + this.c;
		    	if( x < this.endPoint.x ){
		    		img.css({
		    			"left":x,
		    			"top":y
		    		})
		    	}else{
		    		clearInterval( timer );
		    		img.remove();
		    		getCount();
		    	}
		    }.bind(this),30)
		}
		});
})
