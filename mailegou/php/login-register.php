<?php
	header("Access-Control-Allow-Origin:*");
	//接受数据
	$status = isset($_GET["status"])?$_GET["status"]:"";
	$uname = isset($_GET["uname"])?$_GET["uname"]:"";
	$upwd = isset($_GET["upwd"])?$_GET["upwd"]:"";
	
	header("content-type:text/html; charset=utf-8");
	//连接数据源
	$db = mysql_connect("localhost","root","root");
	//连接数据库
	mysql_select_db("db1819",$db);
	//设置字符编码
	mysql_query("set names utf8");
	//编写sql语句
	if( $status == "login"){
		$sql = "select * from user where `uname`='$uname'";
		$res = mysql_query( $sql );
		$arr = mysql_fetch_array( $res );
		if( $arr ){
			if( $arr["upwd"]==$upwd ){
				echo 0;//登录成功
			}else{
				echo 1;//密码错误
			}
		}else{
			echo 2;//用户名不存在
		}
	}else if( $status == "register"){
		$sql = "select * from user where `uname`='$uname'";
		$res = mysql_query( $sql );
		$arr = mysql_fetch_array( $res );
		if( $arr ){
			echo 2;//用户名存在
		}else{
			$sql = "insert into user (`uname`,`upwd`) values('$uname','$upwd')";
			$row = mysql_query( $sql );
			if( $row ){
				echo 0;//注册成功
			}else{
				echo 1;//注册失败
			}
		}
	}
?>