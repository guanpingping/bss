		$id("searchinp").onkeyup = function(){
			var  str = $id("searchinp").value;
			var script = document.createElement("script");
			script.src="https://sp0.baidu.com/5a1Fazu8AA54nxGko9WTAnF6hhy/su?wd="+str+"&cb=fn";
			document.body.appendChild(script);
		}
		function fn(msg){
			$id("u").innerHTML = "";
			var item = msg.s;
			for(var i = 0 ; i < item.length ; i++ ){
				$id("u").innerHTML +=`
								<li onclick=cli(this)>
									<a href='#'>
										${item[i]}
									</a>
								</li>
								`;
			}
		}
		function cli(a){
			var str = a.children[0].innerHTML.replace(/\s/g,"");
			searchinp.value = str;
			$id("u").innerHTML = "";
		}
		document.onclick = function(){
			$id("u").innerHTML = "";
		}
