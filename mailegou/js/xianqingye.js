$( function(){
	$(".open-menu-btn").mouseenter( function(){
		$(".menubox").show();
	})
	$(".open-menu-btn").mouseleave( function(){
		$(".menubox").hide();
	})
	
	
	//放大镜
	$(".middle").mouseenter(function(){
		$(".mask").show();
		$(".big").show();
	}).mouseleave( function(){
		$(".mask").hide();
		$(".big").hide();
	})
	$(".middle").mousemove( function( e ){
		var e = e || event;
		var x = e.pageX - $(".box").offset().left- $(".mask").outerWidth()/2;
		var y = e.pageY - $(".box").offset().top - $(".mask").outerHeight()/2;
		
		var maxL = $(".box").width() - $(".mask").width(),
			maxT = $(".middle").height() - $(".mask").height();
		//边界处理
		x = Math.min( maxL , Math.max( 0 , x ) );
		y = Math.min( maxT , Math.max( 0 , y) );
		$(".mask").css({
			"left":x,
			"top":y
		});
		
			var bigx = x*($(".bigimg").outerWidth() - $(".big").outerWidth() )/maxL,
				bigy = y*($(".bigimg").outerHeight() - $(".big").outerHeight() )/maxT;
			$(".bigimg").css({
				"left":-bigx,
				"top":-bigy
			})
	})
	
	$(".smallimg").mouseenter( function(){
		$(this).css("border","2px solid red").siblings().css("border","");
		$(".middleimg").eq($(this).index()).show().siblings().hide();
		$(".bigimg").eq($(this).index()).show().siblings().hide();
	})
	
	//点击自定义播放按钮video出现
	$(".video-btn").click( function(){
		$(".video-box").show();
	})
	$(".video-close").click( function(){
		$(".video-box").hide();
	})
	
	
	
	//吸顶效果
	$(document).scroll( function(){
		var stop = $("body,html").scrollTop();
		var hei = $(".content").offset().top;
		var tithei = $(".right-tit").outerHeight();
		var detcreatetop = $(".gp-ul-bottom").offset().top + $(".gp-ul-bottom").height()/2;
		
		//右侧的实现更改classname
		var grouprlist = $(".group-right-position ul li"),
		    gpdepicsT = $(".gp-detail-pics").offset().top,
		    gpdenumT = $(".gp-detail-num").offset().top,
		    gpdecreateT =  $(".gp-ul-bottom").offset().top;
		    
//		    console.log(grouprlist);
		    if( stop > gpdecreateT ){
		    	grouprlist.eq(2).addClass("rpoi-active").siblings().removeClass("rpoi-active");
		    }else if(stop > gpdenumT ){
		    	grouprlist.eq(1).addClass("rpoi-active").siblings().removeClass("rpoi-active");
		    }else if( stop > gpdepicsT ){
		    	grouprlist.eq(0).addClass("rpoi-active").siblings().removeClass("rpoi-active");
		    }
		
		if( stop >= hei){
			$(".right-tit").css({"position":"fixed","top":0});
		}else{
			$(".right-tit").css({"position":"relative"});
		}
		
		if(stop >= hei && stop <= detcreatetop ){
			$(".group-right-position ul").css({"position":"fixed","top":0 });
		}else if(stop >= detcreatetop){
			$(".group-right-position ul").css({"position":"absolute","bottom":0,"top":"auto"});
		}else{
			$(".group-right-position ul").css({"position":"absolute","top":0,"bottom":"auto"});
		}
	})
	
	
	
	var rtitlist = $(".right-tit ul li");
	var rconlist = $(".right-con-group");
	rtitlist.click( function(){
		$(this).addClass("tit-active").siblings().removeClass("tit-active");
		rconlist.eq($(this).index()).show().siblings().hide();
	})
	
	
})
