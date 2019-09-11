$(function(){
	var videoURL = 'http://cd-live-stream.news.cctvplus.com/live/smil:CHANNEL1.smil/playlist.m3u8';
//	var videoURL = 'http://pv.news.cctvplus.com/2018/0830/8089289_Preview_1924.mp4';
	var screenWidth_=$(window).width();
	var liveDCID;
	var elementID;
	var rmp;
	var elementID_;
	var rmp_;
	var w;
	var h;
	var pc_flag = false;
	var phone_flag = false;
	var pc_pause = false;
	var phone_pause = false;
	var bitrates = {
//			hls: 'http://origin-live-stream.news.cctvplus.com:1936/live/smil:CHANNEL1.smil/playlist.m3u8'
			hls: 'http://cd-live-stream.news.cctvplus.com/live/smil:CHANNEL1.smil/playlist.m3u8'
//			hls: 'http://180.149.148.170:1936/live/smil:CHANNEL1.smil/playlist.m3u8'
		};			
	var settings;
	var number_play;
	
	//获取浏览器版本号
	var userAgent = window.navigator.userAgent,
	rMsie = /(msie\s|trident.*rv:)([\w.]+)/,
	rFirefox = /(firefox)\/([\w.]+)/,
	rOpera = /(opera).+version\/([\w.]+)/,
	rChrome = /(chrome)\/([\w.]+)/,
	rSafari = /version\/([\w.]+).*(safari)/;
	
	var browser = "";
	var version = "";
	var browserMatch = uaMatch(userAgent.toLowerCase());
	
	var channel_num=(change=='channel1'?'01':'02');
	
	
	//QM--add new 0906
	checkType();
	getMainWidth();
//	init_phone();
	Right_Detail();
	
	function uaMatch(ua) {
		var match = rMsie.exec(ua);
		if(match != null) {
			return {
				browser: "IE",
				version: match[2] || "0"
			};
		}
		var match = rFirefox.exec(ua);
		if(match != null) {
			return {
				browser: match[1] || "",
				version: match[2] || "0"
			};
		}
		var match = rOpera.exec(ua);
		if(match != null) {
			return {
				browser: match[1] || "",
				version: match[2] || "0"
			};
		}
		var match = rChrome.exec(ua);
		if(match != null) {
			return {
				browser: match[1] || "",
				version: match[2] || "0"
			};
		}
		var match = rSafari.exec(ua);
		if(match != null) {
			return {
				browser: match[2] || "",
				version: match[1] || "0"
			};
		}
		if(match != null) {
			return {
				browser: "",
				version: "0"
			};
		}
	}

	function init() {

		if(browserMatch.browser) {
			browser = browserMatch.browser;
			version = browserMatch.version;
		}
		
	}
	//获取浏览器版本号end
	init();
	
	
	$('#navmain_2015box_3').addClass('cur');
	
	


	function createVideo(src, img, id) {
	  return videojs(id, {
	  	autoplay: true,
	    controls: true,
	    preload: true,
	    width:1000,
	    height:600,
	    sources:[src],
	    controlBar: {
	        subtitlesButton:false
	      }
	  });
	}	


		
	
	function init_pc(){
		
			pc_flag = true;
//			phone_flag = false;
			if(browser.indexOf("IE") != -1) {
				if (version == '9.0' || version == '10.0') {
//					$('#Live_L').append('<div class="video_error" ><p>Please upgrade to the latest browser.</p></div>');
					$('#Live_L').append('<div class="video_error" ><p>Please upgrade to the latest browser.</p></div>')
					return 0;
				}
			}
			
			$('#Live_L').append('<video x5-video-player-type="h5" x5-playsinline="" playsinline="" webkit-playsinline=""   id="my_video_1" class="video-js vjs-big-play-centered vjs-fluid vjs-default-skin" ></video>');
		    var player = createVideo(videoURL, null, "my_video_1");	
			videojs("my_video_1").play(); 
			
			 //-----解决ios显示字幕文字---------
	        $(".vjs-menu vjs-lock-showing").hide();
	        $(".vjs-control .vjs-button").hide();
	         //-----解决ios显示字幕文字---------
	
	    var videoPanelMenu = $("#Live_L .vjs-fullscreen-control");  
      videoPanelMenu.before('<div class="vjs-subs-caps-button  vjs-menu-button vjs-menu-button-popup vjs-control vjs-button"  aria-live="polite" aria-expanded="false" aria-haspopup="true">'  
        + '<div class="vjs-menu" role="presentation">'  
        + '<ul class="vjs-menu-content" role="menu">'  
        + '<li class="vjs-menu-item" tabindex="-1" role="menuitemcheckbox"  onclick="changeVideo(1,9)">240p-400 kbps</li>'  
        + '<li class="vjs-menu-item" tabindex="-1" role="menuitemcheckbox"  onclick="changeVideo(2,9)">360p-700 kbps</li>'  
        + '<li class="vjs-menu-item" tabindex="-1" role="menuitemcheckbox"  onclick="changeVideo(3,9)">600p-1000 kbps</li>'  
        + '</ul></div>'  
        +'  <button class="vjs-subs-caps-button vjs-control vjs-button" type="button" aria-live="polite" title="Sharpness switching" aria-disabled="false">'  
        +'      <span aria-hidden="true" class="vjs-icon-placeholder"></span><span class="vjs-control-text">Sharpness switching</span>'  
        +'  </button>'  
        +'</div>'  
        );  
        
    }    
        
          
    var obj={tag:false,ctime:0};  
    window.obj=obj;  
    var myPlayer=videojs.getPlayers()['my_video_1'];  
     myPlayer.on("timeupdate", function(){  
          
        if(window.obj.tag){  
            videojs("my_video_1").currentTime(window.obj.ctime)  
            videojs("my_video_1").play();  
            window.obj.tag=false;  
        }  
          
        //视频打点  
        var ctime_=videojs("my_video_1").currentTime();  
        if(ctime_==60){  
            videojs("my_video_1").currentTime(ctime_+1);  
        }  


    });  

		
	

	
//	function init_phone(){
//
//			phone_flag = true;
//			if(browser.indexOf("IE") != -1) {
//				if (version == '9.0' || version == '10.0') {
//					$('.live_top_box').append('<div class="video_error" >Please upgrade to the latest browser. </div>');
//					return 0;
//				}
//			}	
//			$('.live_top_box').append('<video x5-video-player-type="h5"  x5-playsinline="" playsinline="" webkit-playsinline=""  id="my_video_2" class="video-js vjs-big-play-centered vjs-fluid vjs-default-skin" ></video>');
//		    var player = createVideo(videoURL, null, "my_video_2");
//			videojs("my_video_2").play(); 
// 
//
//	
//	    var videoPanelMenu = $(".live_top_box .vjs-fullscreen-control");  
//    videoPanelMenu.before('  <button class="jump vjs-subs-caps-button vjs-control vjs-button" type="button" aria-live="polite" title="Clarity switching" aria-disabled="false">'
//     +'      <span aria-hidden="true" class="vjs-icon-placeholder"></span><span class="vjs-control-text">Clarity switching</span>'
//   +'  </button>' 
//      );  
//      var videoPanelMenu111 = $(".live_top_box"); 
//      videoPanelMenu111.append('<div style="display:none" class="tanchu vjs-menu" role="presentation">'  
//      + '<ul class="vjs-menu-content" role="menu">'  
//      + '<li class="vjs-menu-item di" tabindex="-1" role="menuitemcheckbox"  >240p-400 kbps</li>'  
//      + '<li class="vjs-menu-item zhong" tabindex="-1" role="menuitemcheckbox" ">360p-700 kbps</li>'  
//      + '<li class="vjs-menu-item gao" tabindex="-1" role="menuitemcheckbox"  ">600p-1000 kbps</li>'  
//      + '</ul></div>' )
//      
//      //-----解决ios显示字幕文字---------
//      $(".vjs-menu vjs-lock-showing").hide();
//      $(".vjs-control .vjs-button").hide();
//       //-----解决ios显示字幕文字---------
//      
//      setTimeout(function () {
//	         $(document).on('touchend','.di',function () {
//			        changeVideo(1,0);
//			        $('.tanchu').css('display','none');
//			})  
//	         $(document).on('touchend','.zhong',function () {
//			        changeVideo(2,0);
//			        $('.tanchu').css('display','none');
//			})  
//	         $(document).on('touchend','.gao',function () {
//			        changeVideo(3,0);
//			        $('.tanchu').css('display','none');
//			})  	
//	         $(document).on('touchend','.jump',function () {
//	         		if($('.tanchu').css('display') == 'none') {
//	         			$('.tanchu').css('display','block');
//	         		} else {
//	         			$('.tanchu').css('display','none');
//	         		}
//			        
//			})  			
//      },500);
//
//      
//      
//      
//        
//  var obj={tag:false,ctime:0};  
//  window.obj=obj;  
//  var myPlayer=videojs.getPlayers()['my_video_2'];  
//   myPlayer.on("timeupdate", function(){  
//        
//      if(window.obj.tag){  
//          videojs("my_video_2").currentTime(window.obj.ctime)  
//          videojs("my_video_2").play();  
//          window.obj.tag=false;  
//      }  
//        
//      //视频打点  
//      var ctime_=videojs("my_video_2").currentTime();  
//      if(ctime_==60){  
//          videojs("my_video_2").currentTime(ctime_+1);  
//          //do something  
//      }  
//
//
//  });  		
//	}
	

	
	//加载右侧数据
	function Right_Detail(){
		var dcid = getHref();
		$.ajax({
			url:'https://secure.cctvplus.com/livenotice/getLiveon.do',
//			url:'http://172.20.1.9:8890/livenotice/getLiveon.do',
			data:{
				CHANNEL:channel_num
			},
			beforeSend:function(){
				$(".Live_content").html("Loading...");
			},
			dataType:'json',
			success:function(e){
				if(e.PMGGUID == ''){
					$(".Live_content").html("Test");
					$(".bigTitle").html("Test");
				}else{
					var data = e[0].pd,			
					str_ = '';
				str = "<div class='Live_content'>";
				      if(data.TBC == 1){
						 str = str + 
						 "<p class='Location'>"+
							"<span class='fileID_one'>Start Time</span>"+
							"<span class='fileID_two'>TBC</span>"+
						 "</p>"+
						 "<p class='Location'>"+
							"<span class='fileID_one'>End Time</span>"+
							"<span class='fileID_two'>TBC</span>"+
						 "</p>";
					  }else if(data.TBC == 2){
						str = str + 
						 "<p class='Location'>"+
							"<span class='fileID_one'>Start Time</span>"+
							"<span class='fileID_two'>"+data.LIVETIME.split('-').reverse().join('/')+'&nbsp'+'TBC'+"</span>"+
						 "</p>"+
						 "<p class='Location'>"+
							"<span class='fileID_one'>End Time</span>"+
							"<span class='fileID_two'>"+data.ENDDATE.split('-').reverse().join('/')+'&nbsp'+'TBC'+"</span>"+
						 "</p>";
					  }else{
						 str = str + 
						 "<p class='Location'>"+
							"<span class='fileID_one'>Start Time</span>"+
							"<span class='fileID_two'>"+data.LIVETIME.split('-').reverse().join('/')+'&nbsp'+data.STARTTIME+"</span>"+
						 "</p>"+
						 "<p class='Location'>"+
							"<span class='fileID_one'>End Time</span>"+
							"<span class='fileID_two'>"+data.ENDDATE.split('-').reverse().join('/')+'&nbsp'+data.ENDTIME+"</span>"+
						 "</p>";
					  }
					    str = str +
						"<p class='Location'>"+
							"<span class='fileID_one'>Slug</span>"+
							"<span class='fileID_two'>"+data.TITLE+"</span>"+
						"</p>"+
						"<p class='Location'>"+
							"<span class='fileID_one'>Event</span>"+
							"<span class='fileID_two'>"+data.REMARKS+"</span>"+
						"</p>"+
						"<p class='fileID' style='display:none;'>"+
							"<span class='fileID_one'>ID</span>"+
							"<span class='fileID_two'>"+data.PMGGUID+"</span>"+
						"</p>"+
						"<p class='Location'>"+
							"<span class='fileID_one'>Location</span>"+
							"<span class='fileID_two'>"+data.LOCATION+"</span>"+
						"</p>"+
						"<p class='Location'>"+
							"<span class='fileID_one'>Audio/Translation</span>"+
							"<span class='fileID_two'>"+data.AUDIO.split('，').join(',&nbsp;').split('：').join(':&nbsp;')+"</span>"+
						"</p>"+
						"<p class='Location'>"+
							"<span class='fileID_one'>Source</span>"+
							"<span class='fileID_two'>"+data.SOURCE+"</span>"+
						"</p>"+
						"<p class='Location'>"+
							"<span class='fileID_one'>Restrictions</span>"+
							"<span class='fileID_two'>"+data.RESTRICTIONS+"</span>"+
						"</p>"+
					"</div>";
					$('#Live_NEW_R').html(str);
					$(".bigTitle").html(data.TITLE);
				}
		
				liveDCID=data.DCID;
			},
			error:function(e){
				console.log(e);
			}
		})
		
		
	}
	
	
	
	//获取路径参数
	function getHref(){
		//var href = window.location.href.split('?')[1].split('=')[1];
		return liveDCID;
	}
	
	//判断播放器状态 控制生成栏目的显示和隐藏	
	function makEenterfullscreen(){		
		$('.page_topbar').hide();
	}
		
	function makeExitfullscreen(){
		$('.page_topbar').show();
	}
	
	//直播结束显示ended
	function makePlay() {
	    $('.rmp-loading-spin').empty()
	  	.append('<div class="warn">Ended</div>').
	  	find('.warn').css({	  	
	  		'line-height':''+($('.warn').height()+'px')+''
	  	});
	}
	
	//改变播放器提示内容
	function logError() {
		var val = $('.live-status').text().split('(')[1].split(')')[0];
		$('.rmp-error>div').text(val);
//	    $('.rmp-error>div').text('ended');
	}
	
	
	//主内容居中显示
	
	$(window).on('resize',function(){
		
		getMainWidth();
	});
	

	
	function getMainWidth(){
		if( $('.live_top_box').width() == 0 || $('.live_top_box').width() == undefined ){
			w = $('.comment').width();
			h = 9/16*w;
		}else{
			w = $('.live_top_box').width();
			h = 9/16*w;
		}
		var url = 'https://secure.cctvplus.com/livenotice/getLiveboard';
//		var url = 'http://10.0.9.27:8080/livenotice/getLiveboard';	
		
//		if( $(window).width() > 1440 ){
//			var mainW = ($(window).width() - $('.lastest_page').width()) / 2 + 100;
//		}else{
//			var mainW = ($(window).width() - $('.lastest_page').width()) / 2;
//		}
//		$('.lastest_page').css({'left':mainW+'px'});
		
		
		//play or img
		if (change == 'channel1') {
			number_play = '01';
//			videoURL = 'http://180.149.148.171:1936/live/smil:CHANNEL1_600p.smil/playlist.m3u8';
			videoURL = 'http://cd-live-stream.news.cctvplus.com/live/smil:CHANNEL1.smil/playlist.m3u8';	
		} else {
			number_play = '02';
//			videoURL = 'http://180.149.148.171:1936/live/smil:CHANNEL2_600p.smil/playlist.m3u8';
			videoURL = 'http://cd-live-stream.news.cctvplus.com/live/smil:CHANNEL2.smil/playlist.m3u8';	
		}
		
		$.getJSON(url, {'CHANNEL': number_play}, function(data){
			if( data.isEnabled == '0' ){//todo 调接口进行判断
				bitrates.hls = 'http://cd-live-stream.news.cctvplus.com/live/smil:CHANNEL1.smil/playlist.m3u8';	
			} else if( data.isEnabled == '1' ){
//				if( $(window).width() <= 1280 ){
//					setTimeout(function(){
//						videojs("my_video_2").dispose();
//					},100)
//				}else{
					setTimeout(function(){
						videojs("my_video_1").dispose();
					},100)
//				}
				
				//pc图片
				$('#imgWp').show().css({
					backgroundImage : 'url('+data.imgUrl+')',
					backgroundSize: '100% 100%',
//					height : h,
//					width : w
				});
				
				return 0;
				
			} else{
				alert('Page Error!!!');					
			}
		});		
		//play or img
		
		
		
//		if( $(window).width() <= 1280 ){			
//
//			if (phone_flag) {
//				
//				if(pc_flag && !pc_pause) {
//					pc_pause = true;
//					phone_pause = false;
//					videojs("my_video_1").pause(); 
//					videojs("my_video_2").play(); 
//				}
//				
//				return 0;
//			}
////			init_phone();
//			
//			if(browser.indexOf("IE") != -1 ) {
//				if (version == '9.0' || version == '10.0') {
//					var w = $('#Live_NEW_L').width();
//					var h = 7/16*w;
//					$('.video_error').css('height',h+'px');
//				}
//			}					
//		}else{
	
			
//			if (pc_flag) {
//				if(phone_flag && !phone_pause) {
//					pc_pause = false;
//					phone_pause = true;
//					videojs("my_video_2").pause(); 
//					videojs("my_video_1").play(); 	
//				}
//					
//				return 0;
//			}
			
			init_pc();
			
			if(browser.indexOf("IE") != -1) {
				if (version == '9.0' || version == '10.0') {
					var w = $('.comment').width();
					var h = 9/16*w;
					$('.video_error').css('height',h+'px');
				}
			}					
			
//		}
		
	}
	
	//时间补0
	function fill0(n){
		return n = n>9 ? n : '0'+n;			
	}
	
	function getStatus(startD,startTime,endD,endTime){
		var BeginYTxt = startD.split('-'),
			BeginT = startTime.split(':'),
			endYTxt = endD.split('-'),
			endT = endTime.split(':'),
			date = new Date,
			y =date.getFullYear(),
			mon = date.getMonth()+1,
			d = date.getDate(),        
			h = fill0(date.getHours()),
			m = fill0(date.getMinutes());
	
		if(y<=BeginYTxt[0] && mon<=BeginYTxt[1]&& d<=BeginYTxt[2] &&  (h<BeginT[0] || (h == BeginT[0] && m<BeginT[1]) || d<BeginYTxt[2])){			
			$('.live-status').text('(Scheduled)');
			return;
		}else if(y>=endYTxt[0] && mon>=endYTxt[1] && d>=endYTxt[2] && (h>endT[0] || ( h==endT[0] && m>endT[1]) || d>endYTxt[2])){
			$('.live-status').text('(Ended)');
		 	return;	
		}else{
			$('.live-status').text('(Live In)');			
			return;	
		}
		
	}
	
	
	/*未开启的评论功能---------------------strat-------------------------*/
	
	//关闭提示文字长度弹框
	
	//显示所有评论和回复
	
	//显示回复框
	
	//回复框实时改变字数
	
	//添加回复
	
	//添加评论
	
	//后台发送数据
	
	//获取当前时间
	
	/*未开启的评论功能---------------------end-------------------------*/
	
	
		var videoEl = document.querySelector('video');
		$(document).keydown(function (e) {
			var e = e || window.event;
			var code = e.keyCode;
			 switch (code) {
			 	case 32:
			 	if (videoEl.paused && (document.activeElement.id!="subsearch_val")) {
			 		videoEl.play();
					e.preventDefault();
			 	} else if(videoEl.play && (document.activeElement.id!="subsearch_val")){
			 		videoEl.pause();
					e.preventDefault();
			 	}
			 	break;
			 	default:
			 	break;
			 }
	         
    	})		
	
	
	
})


//切换清晰度
function changeVideo(rp, type){  
	var num;
	if (change == 'channel1') {
		num = 1;
	} else {
		num = 2;
	}
      if(rp==1){  
//    	if (type == '9') {
	        videojs("my_video_1").src([{type: "application/x-mpegURL", src: "http://180.149.148.171:1936/live/smil:CHANNEL"+num+"_240p.smil/playlist.m3u8" }]);  
	        videojs("my_video_1").play();     		
//    	} else {
// 	        videojs("my_video_2").src([{type: "application/x-mpegURL", src: "http://180.149.148.171:1936/live/smil:CHANNEL"+num+"_240p.smil/playlist.m3u8" }]);  
//	        videojs("my_video_2").play();        		
//    	}

      }  
      if(rp==2){  
//    	if (type == '9') {
	        videojs("my_video_1").src([{type: "application/x-mpegURL", src: "http://180.149.148.171:1936/live/smil:CHANNEL"+num+"_360p.smil/playlist.m3u8" }]);  
	        videojs("my_video_1").play();     		
//    	} else {
//	        videojs("my_video_2").src([{type: "application/x-mpegURL", src: "http://180.149.148.171:1936/live/smil:CHANNEL"+num+"_360p.smil/playlist.m3u8" }]);  
//	        videojs("my_video_2").play();         		
//    	}

      }  
      if(rp==3){  
//    	if (type == '9') {
	        videojs("my_video_1").src([{type: "application/x-mpegURL", src: "http://180.149.148.171:1936/live/smil:CHANNEL"+num+"_600p.smil/playlist.m3u8" }]);  
	        videojs("my_video_1").play();     		
//    	} else {
//	        videojs("my_video_2").src([{type: "application/x-mpegURL", src: "http://180.149.148.171:1936/live/smil:CHANNEL"+num+"_600p.smil/playlist.m3u8" }]);  
//	        videojs("my_video_2").play();         		
//    	}
      }  
      
//    if (type == '9') {
		var ctime=videojs("my_video_1").currentTime();
		window.obj.ctime=ctime;  
		window.obj.tag=true;  
//    } else {
//    	var ctime=videojs("my_video_2").currentTime();  
//    	window.obj.ctime=ctime;  
//		window.obj.tag=true;  
//    }
	}


	$('#subsearch_btn').click(function(e){
		var ss = $("#custom_sel_val").val();
		if($('#custom_sel_val').val()=='ord22222'){			
			window.location.href="/archive/allArchive.shtml#!keyword="+encodeURIComponent($.trim((($('#subsearch_val').val()==$('#subsearch_val').prop('defaultValue'))?'':$('#subsearch_val').val())));
		}else if($('#custom_sel_val').val()=='ord33333'){
			window.location.href="/exchange/allExchange.shtml#!keyword="+encodeURIComponent($.trim((($('#subsearch_val').val()==$('#subsearch_val').prop('defaultValue'))?'':$('#subsearch_val').val())));
		}else{
			window.location.href="/news/latest.shtml#!keyword="+encodeURIComponent($.trim((($('#subsearch_val').val()==$('#subsearch_val').prop('defaultValue'))?'':$('#subsearch_val').val())));
		}
		//=========add wjj æç´¢è®°å½
		var searchType = 'News';
		if(ss=='ord22222'){
			searchType = 'archive';
		}else if(ss=='ord11111'){
			searchType = 'News';
		}else if(ss=='ord33333'){
			searchType = 'exchange';
		}
		$.getJSON('https://secure.cctvplus.com/interface/searchRecord.do?callback=?',{"keyword":$.trim($('#subsearch_val').val()),"type":searchType},function(d_){
		});
		//=========
		
	});
	
	
	$('#subsearch_val').keypress(function(e){
		if(e.keyCode==13){$('#subsearch_btn').click();}
	}).blur(function(){
		var this_ = $(this);
		if(!$.trim(this_.val())){this_.val(this_.prop('defaultValue'));}
	}).focus(function(){
		var this_ = $(this);
		if(this_.val()==this_.prop('defaultValue')){this_.val('');}
	});
	

	$("#subsearch_sel_box").click(function(){
		if( $(".custom_sel_list").css('display') != 'block' ){
			$(".custom_sel_list").show();
		}else{
			$(".custom_sel_list").hide();
		}
	})
	
