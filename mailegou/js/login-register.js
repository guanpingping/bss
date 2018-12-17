$(function(){
	
	var strurl = location.href.split("?")[1];
	if( strurl ){
		//登录和注册的页面的显示与隐藏
		var struname = location.href.split("?")[1].split("=")[0];
		if( struname == "status" ){
			str = location.href.split("=")[1];
			if( str == "login" ){
				$(".login-form").show();
				$(".register-form").hide();
				yzmload( $("#yzm") , $("#reyzm"));
			
			}else if( str == "register" ){
				$(".login-form").hide();
				$(".register-form").show();
				yzmload( $("#oyzm") , $("#ryzm"));
			}
		}else{
			$(".login-form").hide();
			$(".register-form").show();
			yzmload( $("#oyzm") , $("#ryzm"));
		
		}
	}
	//登陆按钮通过ajax点击获取数据库的
	/*$("#ubtn").click(function(){
		if( flaguyzm && flaguname && flagupwd ){
			var uname = $("#uname").val(),	
				upwd = $("#upwd").val();
			var data = `status=login&uname=${uname}&upwd=${upwd}&id=${Math.random()}`;
			$.ajax({
				type:"get",
				url:"../php/login-register.php",
				async:true,
				datatype:"json",
				data:data,
				success:function( msg ){
					if( msg == "0" ){
						alert("登录成功");
						localStorage.setItem("loguname",uname);
						location.href="../html/index.html";
					}else if( msg == "1" ){
						alert("密码错误");
					}else if( msg == "2" ){
						alert("用户名不存在");
					}
				}
			});
			return true;
		}
		return false;
	})
	
	//注册按钮
	$("#regbtn").click( function(){
		if( flagregname && flagregyzm && flagrepwd &&flagxym && checkagree() ){
			var uname = $("#regname").val(),
			    upwd = $("#regpwd").val();
			
			var data = `status=register&uname=${uname}&upwd=${upwd}`;
			$.ajax({
				type:"get",
				url:"../php/login-register.php",
				data:data,
				success:function( msg ){
					if( msg=="0" ){
						alert("注册成功");
						var json = {"uname":uname,"upwd":upwd};
						var arr = [];
						var brr = localStorage.getItem("regisloglist");
						if(brr){
							arr = JSON.parse( brr );
						}
						arr.push(json);
						console.log(arr);
						localStorage.setItem("regisloglist",JSON.stringify(arr))
						location.href = "../html/login-register.html?status=login";
					}else if( msg=="1" ){
						alert("注册失败");
					}else if( msg=="2" ){
						alert("用户名已存在");
					}
				}
			});
			return true;
		}
		return false;
	})
	*/
	//验证是否选中同意协议
	function checkagree(){
		if( $("#agreecheck").prop("checked") ){
			$(".erroragree").hide();
			return true;
		}else{
			$(".erroragree").show().html("协议必选");
			return false;
		}
	}
	//验证注册手机号
	var flagregname = null;
	var flagemail = null;
	$("#regname").blur(function(){
		var reg1 = /^1[3578]\d{9}$/,
		 	reg2 = /^\w+@\w+(\.\w+)+$/;//邮箱
		var str = $(this).val();
		if($(this).attr("placeholder")=="请输入手机号" ){
			if( str != "" && reg1.test( str )){
				$(".unamerror").hide();
				flagregname = true;
			}else{
				$(".unamerror").show().html("手机号不能为空或格式不正确");
				flagregname = false;
			}
		}else{
			if( str != "" && reg2.test( str )){
				$(".unamerror").hide();
				flagemail = true;
			}else{
				$(".unamerror").show().html("邮箱不能为空或格式不正确");
				flagemail = false;
			}
			console.log( flagemail , flagtel)
			if( flagemail && flagtel ){
				flagregname = true;
			}else{
				flagregname = false;
			}
		}
	})
	//验证手机号
	var flagtel = null;
	$("#regtel").blur(function(){
		var reg1 = /^1[3578]\d{9}$/;
		var str = $(this).val();
		if( str != "" && reg1.test( str )){
			$(".errortel").hide();
			flagtel = true;
		}else{
			$(".errortel").show().html("手机号不能为空或格式不正确");
			flagtel = false;
		}
		console.log( flagemail , flagtel)
		if( flagemail && flagtel ){
			flagregname = true;
		}else{
			flagregname = false;
		}
	})
	//验证登录用户名不为空
	var flaguname = null;
	$("#uname").blur(function(){
		var reg1 = /^1[3578]\d{9}$/,//手机号
		    reg2 = /^\w+@\w+(\.\w+)+$/,//邮箱
		    reg3 = /^\w{2,12}$/;//用户名
		var str = $(this).val();
		if( str != "" && (reg1.test( str ) || reg2.test( str ) || reg3.test( str ))){
			$(".errorname").hide();
			flaguname = true;
		}else{
			$(".errorname").show().html("账户不能为空或格式不正确");
			flaguname = false;
		}
	})
	//验证登录密码不为空
	var flagupwd = null;
	$(".upwd").blur(function(){
		var str = $(this).val();
		var reg = /^.{3,12}$/;
		if( str != "" && reg.test( str )){
			$(".pwderror").hide();
			flagupwd = true;
		}else{
			$(".pwderror").show().html("密码不能为空或格式错误");
			flagupwd = false;
		}
	})
	
	//验证两次输入的密码是否相等
	var flagrepwd = null;
	$("#rpwd").blur(function(){
		var str = $(this).val();
		console.log(str)
		var ostr = $("#regpwd").val();
		if( str == ostr){
			$(".rpwderror").hide();
			flagrepwd = true;
		}else{
			$(".rpwderror").show().html("两次输入密码不一致");
			flagrepwd = false;
		}
	})
	//实现验证码中每一个字的颜色不一样
	function showyzm( obj ){
		//下面的语句不能换位置 得先加入到页面中才能换颜色
		obj.html( yzm() );
		for( var i = 0 ; i < $(".yzmcolor").length ; i++ ){
			$(".yzmcolor").eq(i).css("color",getColor());
		}
	}
	//验证码的
	function yzmload( obj , obj1 ){
		showyzm( obj );
		obj1.click( function(){
			showyzm( obj );
		})
	}

	//验证登录验证码
	var flaguyzm = null;
	$("#uyzm").blur(function(){
		var str = $(this).val();
		var str1 = "";
		for( var i = 0 ; i < $("#yzm").children("span").length ; i++ ){
			str1 += $("#yzm").children("span").eq(i).html();
		}
		if(fnYzm(str,str1)){
			flaguyzm = true;
		}else{
			flaguyzm = false;
		}
	})
	//验证注册验证码
	var flagregyzm = null;
	$("#regyzm").blur(function(){
		var str = $(this).val();
		var str1 = "";
		for( var i = 0 ; i < $("#oyzm").children("span").length ; i++ ){
			str1 += $("#oyzm").children("span").eq(i).html();
		}
		if(fnYzm(str,str1)){
			flagregyzm = true;
		}else{
			flagregyzm = false;
		}
	})
	
	//验证验证码是否和图片显示一致的函数
	function fnYzm( str , str1){
		if(str.toLowerCase()==str1.toLowerCase()){
			$(".yzmerror").hide();
			return true;
		}else{
			$(".yzmerror").show().html("验证码不正确");
			return false;
		}
	}
	
	//点击短信验证码
	var flagxym = null;
	$(".telxym").click( function(){
		//模拟一个短信数据用户输入此数据就是短信验证成功
		alert("短信验证码：111111" );
		$("#telyzm").blur( function(){
		var str = $(this).val();
		if( str == "111111"){
			$(".errorxzm").hide();
			flagxym = true;
		}else{
			$(".errorxzm").show().html("短信验证码不正确");
			flagxym = false;
		}
		})
		return false;//阻止button按钮默认刷新页面操作
	})
	
	
	//点击换手机注册或邮箱注册
	var regulist = $("#regul li").not(".last");
	regulist.click( function(){
		//解决换时error全部隐藏
		$(".error").hide();
		
		$(this).addClass("active").siblings().removeClass("active");
		$(".login-con .register-form .ul .last").css("left",$(this).position().left);
//		$(".reg-box .form-log").eq($(this).index()).show().siblings().hide();
		if($(this).index()==0){
			$(".uname").attr("placeholder","请输入手机号");
			$("#regtel").hide();
		}else if($(this).index()==1){
			$(".uname").attr("placeholder","请输入邮箱");
			$("#regtel").show();
		}
	})
})
