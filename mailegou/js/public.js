//生成验证码函数
function yzm(){
	var str = "";
	for( var i = 0 ; i < 4 ; i++ ){
		var ch = rand( 48 , 122 );
		if( ch >= 58 && ch <= 64 || ch >= 91 && ch <= 96 ){
			i--;
		}else{
			str += `<span class='yzmcolor'>${String.fromCharCode( ch )}</span>`;
		}
	}
	return str;
}

//获取非行内元素样式值
function getStyle(obj,attr){
	if( window.getComputedStyle ){
		return window.getComputedStyle(obj,false)[attr];
	}else{
		return obj.currentStyle[attr];
	}
}
//碰撞检测
function pz(obj1,obj2){
	var L1 = obj1.offsetLeft;
	var R1 = obj1.offsetLeft + obj1.offsetWidth;
	var T1 = obj1.offsetTop;
	var B1 = obj1.offsetTop + obj1.offsetHeight;
	
	var L2 = obj2.offsetLeft;
	var R2 = obj2.offsetLeft + obj2.offsetWidth;
	var T2 = obj2.offsetTop;
	var B2 = obj2.offsetTop + obj2.offsetHeight;		
	
	if( R1 < L2  ||  L1>R2 ||  B1<T2 || T1 >B2 ){ //　碰不上
		return false;	
	}else{
		return true;
	}
}
//获取任意区间值函数
function rand(min,max){
	return Math.round( Math.random()*(max-min) + min );
}
//获取颜色
function getColor(){
	var str = "0123456789abcdef";
	var color = "#";
	for( var i = 0; i < 6 ; i++ ){
		color +=  str.charAt(rand(0,15));
	}
	return color;
}
//获取日期时间格式函数  封装  
function dateToString(now,sign){
	sign = sign || "-";
	var y = now.getFullYear();
	var m =toTow( now.getMonth()+1 );
	var d =toTow( now.getDate() );
	var h =toTow( now.getHours() );
	var mint =toTow( now.getMinutes() );
	var s =toTow( now.getSeconds() );
	return  y + sign + m + sign + d + " " + h + ":" + mint + ":" +s;
}
function toTow(num){
	return num < 10 ? "0"+num : num;
}

//字符串转日期时间格式
function stringToDate(str){
     return new Date(str);
}

//时间差
function diff(start,end){ 
	return Math.abs( start.getTime() - end.getTime() )/1000;
}

//根据id找元素
function $id(id){
	return document.getElementById(id);
}
//判断鼠标操作的是 左键？滚轮？右键？
function getButton(evt){
     var e = evt || event;
     if( evt ){    // 高版本浏览器
         return e.button;
     }else if( window.event ){ //  ie
         switch( e.button ){
               case 1 : return 0;
               case 4 : return 1;
               case 2 : return 2;
          }
     }
}

//dom操作创建元素
function create(ele){
	return document.createElement(ele);
}

//obj要操作的对象
// json 代表 多个attr和target   { "width" : 3 ,"height":3000 }
// callback 表示一个函数    一个函数作为参数，这样的函数 叫做   回调函数
function startMove( obj, json, callback ){
	clearInterval( obj.timer );
	obj.timer = setInterval( function(){
		var flag = true;
		for( var attr in json ){
			var current = 0;
			if( attr == "opacity" ){
				current = parseFloat( getStyle( obj, attr ) ) * 100;
			}else if( attr == "zIndex" ){
				current = parseInt( getStyle( obj, attr ) );
			}else{
				current = parseInt( getStyle( obj, attr ) );
			}
			var speed = ( json[ attr ] - current )/10;
			speed = speed > 0 ? Math.ceil( speed ) : Math.floor( speed );
			if( current != json[ attr ] ){
				flag = false;
			}
			if( attr == "opacity" ){
				obj.style[ attr ] = (current + speed)/100;
			}else if( attr == "zIndex" ){
				obj.style[ attr ] = json[ attr ];
			}else{
				obj.style[ attr ] = current + speed + "px";
			}
		}
		if( flag ){
			clearInterval( obj.timer );
			if( callback ){
				callback();
			}
		}
	}, 30 )
}

