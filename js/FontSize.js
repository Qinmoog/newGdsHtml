// JavaScript Document
$(function(){
	$(window).resize(function(){
       var width=$(this).innerWidth();
//     if(width > 1280) {
//     		$(".page_topbar_nav").removeClass('open');
//     }
    });
	
	var net_name = $('.page_body_s').attr('data-name'),
		light_num = $('.page_body_s').attr('data-num'),
		light_num_li = $('.page_body_s').attr('data-li');
	
	showNavFun('other',net_name,light_num,light_num_li);
	
	//首页nav
	$(".page_topbar_nav").click(function(){
		if( $(this).hasClass('open') ){
			$(this).removeClass('open');
			$(".zhezhaoceng").css('display','none');	
		}else{
			$(this).addClass('open');
			$(".zhezhaoceng").css('display','block');			
		}
		showNavFun('list');

	})
	
	$(".zhezhaoceng").click(function () {
		$(".zhezhaoceng").css('display','none');
		showNavFun('all');

	})
	
	$(".page_topbar_search").click(function(){
		if($(".zhezhaoceng").css('display') == 'block') {
			$(".zhezhaoceng").css('display','none');
			$(".page_topbar_nav").removeClass('open');;
		}
		
		if( $(this).hasClass('open') ){
			$(this).removeClass('open');
		}else{
			$(this).addClass('open');
		}
		showNavFun('search');
	})
	
	$(".sub_nav_s_val").click(function(){
		if( $(this).hasClass('open') ){
			$(this).removeClass('open');
		}else{
			$(this).addClass('open');
		}
		showNavFun('nav');
	})
	
	$(".topbar_nav_list>li").click(function(){
		if( $(this).hasClass('on') ){
			$(this).removeClass('on');
			$(this).find('ul').hide();
		}else{
			$(this).addClass('on');
			$(this).find('ul').show();
		}
//		showNavFun('nav_list')
	})
	
	
	function showNavFun(n,name,light_num,light_num_li){
		if( n == 'list' ){  //控制导航显示隐藏
			if( $(".page_topbar_nav").hasClass("open") ){
				$(".page_topbar_nav_n").show();
			}else{
				$(".page_topbar_nav_n").hide();
			}
		}else if( n == 'search' ){  //控制搜索框显示隐藏
			if( $(".page_topbar_search").hasClass("open") ){
				$(".page_topbar_nav_s").show();
			}else{
				$(".page_topbar_nav_s").hide();
			}
		}else if( n == 'nav' ){  //控制latest语言列表显示隐藏
			if( $(".sub_nav_s_val").hasClass("open") ){
				$(".sub_nav_list_s").show();
			}else{
				$(".sub_nav_list_s").hide();
			}
		}else if( n == 'all' ){  //遮罩层隐藏所有
			$(".page_topbar_nav").removeClass("open")
			$(".page_topbar_nav_n").hide();
			$(".page_topbar_search").removeClass("open")
			$(".page_topbar_nav_s").hide();
			$(".sub_nav_s_val").removeClass("open")
			$(".sub_nav_list_s").hide();
		}else if( n == 'other' ){
			if( name == 'Home' ){  //首页
				$(".topbar_nav_list>li:eq(0)").addClass('on');
				$('.topbar_nav_list>li:eq(0)').children().addClass('lightLI');
			}else if(  name == 'About Us' ){  //关于我们
				$(".topbar_nav_02 li:eq(0)").addClass('on');
				$('.topbar_nav_02 li:eq(0)').children().addClass('lightLI');
			}else if( name == 'Contact Us' ){  //联系我们
				$(".topbar_nav_02 li:eq(1)").addClass('on');
				$('.topbar_nav_02 li:eq(1)').children().addClass('lightLI');
			}else{  //其他含有二级导航
				
				$(".topbar_nav_list>li:eq("+light_num+")").addClass('on');
				setTimeout(function(){
					$(".topbar_nav_list>li:eq("+light_num+")").find('ul').show();
				},1000)
				$(".topbar_nav_list>li:eq("+light_num+")").find('ul li a').eq(light_num_li).addClass('lightLI');
			}
		}else{
			if( $(".page_topbar_nav").hasClass("open") ){
				$(".page_topbar_nav_n").show();
			}else{
				$(".page_topbar_nav_n").hide();
			}
			if( $(".page_topbar_search").hasClass("open") ){
				$(".page_topbar_nav_s").show();
			}else{
				$(".page_topbar_nav_s").hide();
			}
			if( $(".sub_nav_s_val").hasClass("open") ){
				$(".sub_nav_list_s").show();
			}else{
				$(".sub_nav_list_s").hide();
			}
		}
		
	}
	
	
})
