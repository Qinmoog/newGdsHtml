//(function(window,document){
//
//	//  px转换rem           -----------start
//  var docEl = document.documentElement, //获取html标签
//		resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize',
//		recalc = function () {
//			
//			var clientWidth = docEl.clientWidth;
//			if (!clientWidth) return;
//			if( clientWidth <= 1280 ){
//				clientWidth = 1280;
//			}
//			docEl.style.fontSize = 100 * (clientWidth / 1920) + 'px';
//		};
//
//	if (!document.addEventListener) return;
//	window.addEventListener(resizeEvt, recalc, false);
//	document.addEventListener('DOMContentLoaded', recalc, false);
//	//  px转换rem           -----------end
//	
//	
//
//	var screenWidth = 0;
//	var app = {
//	 	init:function(){
//	 		if( navigator.userAgent.indexOf('Windows') > 0 ){   //pc设备
//	 			screenWidth = $(window).width();
//	 			if( screenWidth > 1024 ){  //pc大屏
//	 				screenWidth = 1024;
//	 				console.log(screenWidth)
//	 				$(".page_topbar").show();
//					$(".page_body").show();
//					$(".page_bottom").show();
//					$(".page_topbar_s").hide();
//					$(".page_topbar_nav_s").hide();
//					$(".page_body_s").hide();
//					$(".page_bottom_s").hide();
//		 		}else{  //pc小屏
//		 			screenWidth = $(window).width();
//		 		}
//	 		}else{  //移动设备
//	 			screenWidth = window.screen.width;
//				$(".page_topbar").hide();
//				$(".page_body").hide();
//				$(".page_bottom").hide();
//				$(".page_topbar_s").show();
//				$(".page_body_s").show();
//				$(".page_bottom_s").show();
//	 		}
//	 		
//	 		
//	 	}()
//	}
//
//
//})(window,document); 


$(function(){	
//	changeSize();
    //窗体大小改变事件
    $(window).resize(function(){
//      changeSize();
    });

    function changeSize(){
        var lnkLarge=$(".lnkLarge");
	        //获取窗体的宽度
	        var width=$(this).innerWidth();
			var Version = navigator.userAgent;

			//判断设备系统
			if( /windows|Mac/i.test(Version) && /iPhone|iPod|iPad/i.test(Version)==false ) {  //pc端设备,且mac端不是iPhone,iPod,iPad设备
				if( window.location.href.indexOf('news') > -1 ){
					lnkLarge.attr('href','/style/style_news.css');
				}else if( window.location.href.indexOf('live') > -1 ){
					lnkLarge.attr('href','/style/style_news_06.css');
				}else{
					lnkLarge.attr('href','/style/style_news.css');
				}

				
				$(".page_body").show();
				$(".page_bottom").show();
				$(".page_topbar_s").hide();
				$(".page_topbar_nav_s").hide();
				$(".page_body_s").hide();
				$(".page_bottom_s").hide();
				$('.page_topbar_nav_n').hide();
				
			}else{
				if (width<=1280) {//窄屏
					if( lnkLarge.attr('href').indexOf('style_phone') < 0 ){
		        		lnkLarge.attr('href','/style/style_phone.css');
					}
	
					$(".page_topbar").hide();
					$(".page_body").hide();
					$(".page_bottom").hide();
					$(".page_topbar_s").show();
					$(".page_body_s").show();
					$(".page_bottom_s").show();	        	
		        }else{//宽屏
					if( window.location.href.indexOf('news') > -1 ){
						lnkLarge.attr('href','/style/style_news.css');
					}else if( window.location.href.indexOf('live') > -1 ){
						lnkLarge.attr('href','/style/style_news_06.css');
					}else{
						lnkLarge.attr('href','/style/style_news.css');
					}
					//alert('大屏')
					$(".page_topbar").show();
					$(".page_body").show();
					$(".page_bottom").show();
					$(".page_topbar_s").hide();
					$(".page_topbar_nav_s").hide();
					$(".page_body_s").hide();
					$(".page_bottom_s").hide();
					
					$('.page_topbar_nav_n').hide();	            
		        }
				
			}
	        
			
			$(".about-videos").css({'height':$(".about-videos").width()*9/16+'px'});
			$(".about-videos_").css({'height':$(".about-videos_").width()*9/16+'px'});
        
    };
    
    
    $(".custom_sel_text_s").click(function(){
    	if( $(this).hasClass('open') ){
    		$(".custom_sel_list_s").hide();
    		$(this).removeClass('open');
    	}else{
    		$(".custom_sel_list_s").show();
    		$(this).addClass('open')
    	}
    })
    
    $(".custom_sel_list_s>li").click(function(){
    	var custom_val = $(this).text(),
    		custom_id = $(this).attr('ord_id')
    	$(".custom_sel_text_s").text(custom_val).attr('ord_id',custom_id).removeClass('open');
    	$(".custom_sel_list_s").hide();
    })
    
    
})
