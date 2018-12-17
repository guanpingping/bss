$(function(){
	/*轮播图的函数*/
	function lbt(){
		var index = 0;
		var timer = setInterval( autoplay , 2000 );
		var ulist = $(".lbt_list li");
		var olist = $(".lbt_ol li");
		function autoplay(){
			index++;
			if( index > $(".lbt_list li").length ){
				index = 0;
			}
			$(".lbt_list li").eq(index).fadeIn(1500).siblings().fadeOut();
			$(".lbt_ol li").eq(index).css("top",-8).siblings().css("top",0);
		}
		olist.mouseenter(function(){
			clearInterval(timer);
			index = $(this).index()-1;
			autoplay();
		}).mouseleave(function(){
			timer = setInterval( autoplay , 2000 );
		})
	
	}
	//调用轮播图函数
	lbt();
	
	
	/*common标题的小运动*/
	function tiananimate( obj ){
		var oi = obj.children("i");
		var index = 0;
		var arr = [];
		for( var i = 0 ; i < oi.length ; i++ ){
			arr.push({"x":$(oi[i]).position().left,"y":$(oi[i]).position().top});
		}
		for( var i = 0 ; i < oi.length ; i++ ){
			$(oi[i]).css({"position":"absolute","left":arr[i].x,"top":arr[i].y});
		}
		var timer = setInterval(function(){
			index++;
			if(index>=oi.length){
				index=0;
			}
			oi.eq(index).css("top",-6).siblings().css("top",0);
		},500)
	}
	 var obj = $(".common-betcon-ani");
	 for( var j = 0 ; j < obj.length ; j ++){
	 	tiananimate(obj.eq(j));
	 }
	 
	 
	//楼梯效果点击bar中的li 到达到floor的每一层
	var barlist = $(".bar-ind-list li");
	var floorlist = $(".floor .floorcon");
	barlist.click( function(){
		var hei = floorlist.eq($(this).index()).offset().top - barlist.outerHeight() - 25;
		$("body,html").animate({"scrollTop":hei},1000);
	})
	 /*吸顶效果*/
	var bartop = $("#bar").offset().top;
	$(window).scroll( function(){
		var stop = $("body,html").scrollTop();
		//返回顶部图标的显示和隐藏
		if( stop > 300){
			$("#returntop").show();
		}else{
			$("#returntop").hide();
		}
		
		if( stop + window.innerHeight/2 >= bartop ){
			$("#bar").css({"position":"fixed","top":0,"left":0});
		}else{
			$("#bar").css({"position":"static"});
		}
		
		//楼梯效果
		floorlist.each(function( index ,ele ){
			if( stop + window.innerHeight - $(ele).offset().top > (window.innerHeight)/2){
				barlist.eq(index).css("color","red").siblings().css("color","#666");
			}
		})
		var btop = barlist.eq(0).offset().top;
		var showtop = $(".show").offset().top;
		//处理第一个和最后一个bar li 的恢复字体颜色
		if( stop + window.innerHeight/2 < btop  || stop - showtop + window.innerHeight > window.innerHeight/2){
			barlist.css("color","#666");
		}
	})
	
	/*楼层块下的小轮播*/
	function xlb(){
		var floorxbl = $(".floor-left-bottom-xlb");
		var timer = setInterval( function(){
			floorxbl.animate({"left":-180},500,function(){
				$(this).css("left",0).find("li").first().appendTo($(this) );
			})
		},3000)
	}
	xlb();
	
	/*返回顶部*/
	$("#returntop").click( function(){
		$("body,html").animate({"scrollTop":0},1000);
	})
	
})
