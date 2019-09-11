$(function(){

	var seach_check_LL ={"keyword_":"","LANGUAGE_":"1","DATE_":"4","LOCATIONS_":"Select_all,C01,150,002,B01,142,021,419,009,A01","CATEGORY_":"1000000,2000000,3000000,4000000,5000000,6000000,7000000,8000000,9000000,10000000,11000000,12000000,13000000,14000000,15000000,16000000,17000000,90000000"}; 
	var currentNo=1;
	var is_submitting=0;
	var first_flag = false;
	var first_times = 0;
	init_search_fun();
	search_fun_LL(1);
	var videoEl;	
	
	//QM--add new 0906
	checkType();
	
	
	function init_p(uu_){
		if (first_times < 2) {
			$('#video_box').append('<video id="player" class="video-js vjs-big-play-centered vjs-fluid"></video>');
		}
		
	    var player = createVideo(uu_, "player");
	    var myplay = videojs('player');
		myplay.src(uu_);
		myplay.load(uu_);		
					
		function createVideo(src, id) {
		  return videojs(id, {
//		  	poster: img,
		    controls: true,
		    preload: true,
		    width:1000,
		    height:600,
		    sources:[src]
		  });
		}		
	}	
	
	//每30 秒后更新一次数据
	setInterval(function(){
		setTime_fun_LL(currentNo);
	},30000);
	
	//初始化默认选项
	function init_search_fun(){
		var key_word_uri_ = decodeURIComponent(Request_url_fun_by_special('keyword'));
		seach_check_LL['keyword_']=($.trim(key_word_uri_).length>0)?key_word_uri_:"";
		if(seach_check_LL['keyword_'] != ""){
			$('#subsearch_val').val(decodeURIComponent(seach_check_LL['keyword_']));
		}
		if(seach_check_LL['DATE_']){
			$('#Date_data_box li input[class="data_item"][value="'+seach_check_LL["DATE_"]+'"]').prop('checked','checked');
			$('#Date_data_box li input[class="data_item"]').iCheck('update');	}
		if(seach_check_LL['LOCATIONS_']){
			var g_3 = seach_check_LL['LOCATIONS_'].split(',');
			$('#Locations_data_box input[type="checkbox"][class="data_item"]').each(function(){
				if(jQuery.inArray($(this).val(), g_3)!==-1){
					$(this).prop('checked','checked');
				}else{
					$(this).removeProp('checked');
				}
				$(this).iCheck('update');
			});
			if($('#Locations_data_box input[type="checkbox"][class="data_item"]').not(':checked').length==0){
				$('#Locations_data_box input[type="checkbox"][class="data_all"]').prop('checked','checked').iCheck('update');
			}
		}
		if(seach_check_LL['CATEGORY_']){
			var g_4 = seach_check_LL['CATEGORY_'].split(',');
			$('#Category_data_box input[type="checkbox"][class="data_item"]').each(function(){
				if(jQuery.inArray($(this).val(), g_4)!==-1){
					$(this).prop('checked','checked');
				}else{
					$(this).removeProp('checked');
				}
				$(this).iCheck('update');
			});
			if($('#Category_data_box input[type="checkbox"][class="data_item"]').not(':checked').length==0){
				$('#Category_data_box input[type="checkbox"][class="data_all"]').prop('checked','checked').iCheck('update');
			}
		}//cusmot_alert_fun(seach_check_LL['LANGUAGE_']+'#');
		if(seach_check_LL['LANGUAGE_']){ 
			$('#Language_data_box li input[class="data_item"][value="'+seach_check_LL["LANGUAGE_"]+'"]').prop('checked','checked');
			$('#Language_data_box li input[class="data_item"]').iCheck('update');	}			
	}
	
	
	//加载latest所有数据
	function search_fun_LL(curpage){ //return false;
		currentNo=curpage;
		var search_list_box = $("#search_list_box"),
			search_list_pagebox = $('#search_list_pagebox'),
			detail_box_ = $('#detail_box_');
		if(seach_check_LL.keyword_){
			var search_keyword=decodeURIComponent(seach_check_LL.keyword_).replace(/[\-\_\,\!\|\~\`\(\)\#\$\%\^\&\*\{\}\:\;\"\L\<\>\?]/g, '');
			$('#search_key_tit').html("<b style='color: #ed2122;'>"+search_keyword+"</b>");
			$('#search_key_box').css('visibility','visible');
		}else{
			$('#search_key_tit').text('');
			$('#search_key_box').css('visibility','hidden');
		}
		
		if(!check_submit()){ return false;};
		writeCookie_search();
		var pagesize = 20;
		search_list_box.html('<p style="text-align:center; padding:10px;">Loading...</p>');
		detail_box_.hide();
		search_list_pagebox.html('');
		$.getJSON('https://secure.cctvplus.com/searchInterface/castest.do?callback=?',
//		$.getJSON('http://10.0.9.27:8080/searchInterface/castest.do?callback=?',
			{
				'pageSize':pagesize,
				'pageNo':curpage,
				'searchTitle':encodeURIComponent(decodeURIComponent(seach_check_LL.keyword_)),
				'isstime':seach_check_LL.DATE_,
				'CATEGORY':seach_check_LL.CATEGORY_,
				'LOCATIONS':seach_check_LL.LOCATIONS_,
				'LANGUAGE':seach_check_LL.LANGUAGE_
			},
			function(data){
				console.log(data)
				if(!data || !data.categorys || !data.categorys.length){
					search_list_box.html('<p style="text-align:center; padding:10px;">No data</p>');
					return;
				}
		
				var lis=data.categorys;
				var itemsum=data.numFound;			
				if(itemsum<=0){
					search_list_box.html('<p style="text-align:center; padding:10px;">No data</p>');
					detail_box_.hide();
					return;
				}
				pagesum=Math.ceil(itemsum/pagesize);
				var html_arr = [];
				for(var i = 0, len = lis.length; i<len; i++){
					html_arr.push('<li class="clearfix',(i==0?" cur":""),'" dcid="',lis[i].dcid,'" mid="',lis[i].mid,'" detailpath="',lis[i].detailPath,'"><a href="javascript:void(0);">');
					html_arr.push('<div class="img_box"><img src="',lis[i].spic,'" height="60" width="106" /></div>');
					html_arr.push('<div class="text_box clearfix">');
					if(lis[i].language=='3'){
						html_arr.push('<h3 dir="rtl"><span>',lis[i].pubtitle,'</span><i></i></h3>');
					}else{
						html_arr.push('<h3><span>',lis[i].pubtitle,'</span><i></i></h3>');
					}
					html_arr.push('<p class="summary">',lis[i].summary,'</p>');
					html_arr.push('<ul><li class="listCity">Hong Kong,China</li></ul>');
					html_arr.push('<span class="time">',getTimeString1(lis[i].scriptIssTime),'</span>'); 
					html_arr.push('</div>');
					html_arr.push('</a></li>');
				}
				
				var textArr = new Array();
				textArr.push('<div class="cus_page_btns">');		
				if(curpage>1){		
					textArr.push('<a onselectstart="return false;" data-page="',curpage-1,'" class="prev">Prev</a>');
				}else{
					textArr.push('<a style="cursor:default;" onselectstart="return false;" class="prev">Prev</a>');
				}
			
				var beginpage = beginpage = 1;
				function set_page_fun(){
					for(var i=beginpage;i<=endpage;i++){
						if(i==curpage){
							textArr.push('<a onselectstart="return false;" class="cur">',i,'</a>');
						}else{
							textArr.push('<a onselectstart="return false;" class="" data-page="',i,'">',i,'</a>');
						}
					}
				}
				if(pagesum<=5){
					beginpage=1;
					endpage=pagesum;
					set_page_fun();
				}else{
					if(curpage<5&&curpage>0){
						beginpage=1;
						endpage=5;
						set_page_fun();
						textArr.push('<a onselectstart="return false;" style="cursor:default;" data-page="',endpage+1,'">...</a>');			
						textArr.push('<a onselectstart="return false;" data-page="',pagesum,'">',pagesum,'</a>');
					}else if(curpage<=pagesum&&curpage>=(pagesum-4)){//
						beginpage=pagesum-4;
						endpage=pagesum;
						textArr.push('<a onselectstart="return false;" data-page="',1,'">1</a>');
						textArr.push('<a onselectstart="return false;" style="cursor:default;" data-page="',beginpage-1,'">...</a>');
						set_page_fun();
					}else{
						beginpage=curpage-2;
						endpage=Number(curpage)+2;
						textArr.push('<a onselectstart="return false;" data-page="',1,'">1</a>');
						textArr.push('<a onselectstart="return false;" style="cursor:default;" data-page="',beginpage-1,'">...</a>');
						set_page_fun();
						textArr.push('<a onselectstart="return false;" style="cursor:default;" data-page="',endpage+1,'">...</a>');
						textArr.push('<a onselectstart="return false;" data-page="',pagesum,'">',pagesum,'</a>');
					}
				}
			
				if(curpage<pagesum){
					textArr.push('<a onselectstart="return false;" data-page="',1+Number(curpage),'" class="next">Next</a>');
				}else{
					textArr.push('<a style="cursor:default;" onselectstart="return false;" class="next">Next</a>');
				}
				textArr.push('<div class="clear"></div></div><div class="clear"></div>');
				search_list_box.html(html_arr.join(''));
				search_list_pagebox.html(textArr.join(''));
				$('#search_list_box li').eq(0).trigger('click');
				
			}	
		);
	}
	
	function setTime_fun_LL(curpage){
		var search_list_box = $("#search_list_box");
		var firstDCID=$("#search_list_box li:first-child").attr("dcid");
		if(seach_check_LL.keyword_){
			var search_keyword=decodeURIComponent(seach_check_LL.keyword_).replace(/[\-\_\,\!\|\~\`\(\)\#\$\%\^\&\*\{\}\:\;\"\L\<\>\?]/g, '');
			$('#search_key_tit').html("<b style='color: #ed2122;'>"+search_keyword+"</b>");
			$('#search_key_box').css('visibility','visible');
		}else{
			$('#search_key_tit').text('');
			$('#search_key_box').css('visibility','hidden');
		}
		
		if(!check_submit()){ return false;};
		writeCookie_search();
		var pagesize = 20;

		$.getJSON('http://secure.cctvplus.com/searchInterface/castest.do?callback=?',
			{
			'pageSize':pagesize,
			'pageNo':curpage,
			'searchTitle':encodeURIComponent(decodeURIComponent(seach_check_LL.keyword_)),
			'isstime':seach_check_LL.DATE_,
			'CATEGORY':seach_check_LL.CATEGORY_,
			'LOCATIONS':seach_check_LL.LOCATIONS_,
			'LANGUAGE':seach_check_LL.LANGUAGE_
			},
			function(data){
				var lis=data.categorys;	
				var itemsum=data.numFound;
				
				var sj_num=0;  
				var html_arr = [];
				for(var i = 0; i<lis.length; i++){
					if(lis[i].dcid==firstDCID || !firstDCID){
						break;
					}else{
						sj_num++;
					}
					html_arr.push('<li class="clearfix" dcid="',lis[i].dcid,'" mid="',lis[i].mid,'">');
					html_arr.push('<div class="img_box"><img src="',lis[i].spic,'" height="60" width="106" /></div>');
					html_arr.push('<div class="text_box clearfix">');
					if(lis[i].language=='3'){
						html_arr.push('<h3 dir="rtl"><span>',lis[i].pubtitle,'</span><i></i></h3>');
					}else{
						html_arr.push('<h3><span>',lis[i].pubtitle,'</span><i></i></h3>');
					}
					html_arr.push('<span class="time">',getTimeString1(lis[i].scriptIssTime),'</span>'); 
					html_arr.push('</div>');
					html_arr.push('</li>');
					
				}
				
				if(sj_num>0){
					showMessage(sj_num);
					setTimeout(function(){
						hideMessage();
					},3000);
					search_list_box.prepend("<div class='new_box'></div>");
					search_list_box.find("div:eq(0)").animate({"height":sj_num*61+"px"},500,function(){
					search_list_box.find("div:eq(0)").html( html_arr.join('') );
					search_list_box.find("div.new_box").css({"height":"auto"});
				});
				}
				var count_num=search_list_box.find("li").length;
				var Count_Num=Number(count_num)-sj_num;
				for(var i = count_num, len = Count_Num; i>len; i--){
					
					$(search_list_box.find("li")[i-1]).remove();
				}
				
		});
	}
	
	function check_curkey_fun(k_){
		var re1= '[\'"]';
		return k_.replace(new RegExp(re1,'g'),'');
	}
	//获取地址栏所需参数
	function Request_url_fun_by_special(strName){
		var strHref = location.href ;
		var intPos = strHref.indexOf('?!');
		if(intPos<0){
			intPos=strHref.indexOf('#!');
		}
		var strRight = strHref.substr(intPos + 2);
		var arrTmp = strRight.split('&');
		for(var i = 0; i < arrTmp.length; i ++ ){
			var arrTemp = arrTmp[i].split('=');
			if(arrTemp[0].toUpperCase() == strName.toUpperCase()){ 
				if(i===arrTmp.length-1){
					var sIndex = arrTemp[1].indexOf('#');
					if(sIndex!==-1){arr[1] = arrTemp[1].substring(0,sIndex);}
				}
				return arrTemp[1];
			}
		}
		return '';
	}
	
	//提示更新数据
	function showMessage(soun){
		$('.updata_message').show();
		$('.updata_message').animate({opacity:1});
		$('.updata_num').text(soun);
	}
	//隐藏第一页多余数据
	function hideMessage(){
		$('.updata_message').hide();
		$('.updata_message').animate({opacity:0});
		$('.updata_num').text('');
	}
	
	function writeCookie_search(){
		writeCookie_LL('search_codenews_LL',JSON.stringify(seach_check_LL),24);
	}
	
	//提示至少选择一个选项
	function check_submit(){
		if(seach_check_LL['DATE_']==''){cusmot_alert_fun('Please select at least one DATE'); return false;}
		if(!$.trim(seach_check_LL['LOCATIONS_'])){cusmot_alert_fun('Please select at least one LOCATIONS'); return false;}
		if(!$.trim(seach_check_LL['CATEGORY_'])){cusmot_alert_fun('Please select at least one CATEGORY'); return false;}
		if(!$.trim(seach_check_LL['LANGUAGE_'])){cusmot_alert_fun('Please select at least one language'); return false;}
		return true;
	}
	
	//点击左侧列表，右侧显示当前详情
	$('#search_list_box').on('click','li',function(){
		$('#search_list_box li').removeClass('cur');
		var th_= $(this);
		th_.addClass('cur');
		make_detail_box(th_.attr('dcid'),th_.attr('mid'));
		//make_detail_box(th_.attr('dcid'),th_.attr('mid'),th_.attr('mtype'));
	});
	
	//显示右侧详情
	function make_detail_box(dcid,mid){ //return false;
		var data_success_box_ = $('#data_success_box'),
			data_error_box_ = $('#data_error_box');
		$('#detail_box_').show();
		
		data_success_box_.hide();
		data_error_box_.show().html('Loading...');
		
		$.getJSON('https://secure.cctvplus.com/searchInterface/newsSearch.do?callback=?',{'dcid':dcid,'mid':mid},function(d){
			if(d && d.items && d.items.length){
				data_success_box_.show();
				data_error_box_.hide();
				//add start
				var mtype = d.items[0].mtype;
				var itemType = 'News';
				if(mtype=='T3'){
					itemType = 'archive';
				}
				$.getJSON('https://secure.cctvplus.com/interface/topicBrowseRecord.do?callback=?',{"MID":mid,"DCID":dcid,"browse_source":document.referrer,"type":itemType},function(d_){
				});
				if(mtype == 'T2'){
					$('#download_box_').show();
					$('#buy_box_').hide();
				}else{
					$('#buy_box_').show();
					$('#buy_box_').attr("mid",mid);
					$('#buy_box_').attr("dcid",dcid);
					$('#buy_box_').attr("imgUrl",d.imgUrl);
					$('#download_box_').hide();
				}
				//add end
				var hd_ = $('#detail_info_head'),
					cont_box_ = $('#detail_info_cont'),
					video_info_ = $('#video_info_list'),
					detail_info_tab = $('#detail_infotab'),
					sharebtns_box = $('#sharebtns_box'),
					video_box_ = $('#video_box'),
					video_imgbox_ = $('#video_imgbox');
				var items_ = d.items;
				var hd_arry = [],
					cont_ = [],
					detail_ = [],
					detail_tab_ = [],
					lang_arry =[],
					sharebtns_ =[],
					lang_lab = ['English','Français','العربية','Pусский','Español','日本語','Deutsch'],
					lang_lab_s = ['EN','','','','','',''];
				var video_path = d.videoUrl;
				if(d.metasource==3){
					$('#download_box_ li[format^="HD-"]').hide();
				}else{
					$('#download_box_ li[format^="HD-"]').show();
				}
				$('#download_box_ li[format="METADATA"]').children('a.d_item_t').prop('href',d.xmlurl);
				var re_='';
				if($.trim(decodeURIComponent(seach_check_LL.keyword_))){
					var n_key_ = check_curkey_fun(decodeURIComponent(seach_check_LL.keyword_));
				    re_ = '('+n_key_.split(' ').join('|')+')';
				}

				
				var nowDate = new Date(); //当前时间
				var publishDate = d.published;//发布时间
				var path = ''; //详情页跳转地址
	
				$.each(items_,function(i,obj){
					hd_arry.push('<div class="item" ',((obj.cur)?'style="display:block;"':''),'>');
					
					//30天之前的，跳转到archive详情页
					if(dateDiff(publishDate,nowDate) < 30){
						path = obj.detailPath;
					} else {
						path = obj.detailBuyPath;
					}

					if(obj.language=='3'){
						hd_arry.push('<a class="alink" href="',path,'" target="_blank"></a><h1 dir="rtl">',(re_?obj.summary.replace(new RegExp(re_,'gi'),'<b class="curtext">$1</b>'):obj.summary),'</h1>');
					}else{
						hd_arry.push('<a class="alink" href="',path,'" target="_blank"></a><h1>',(re_?obj.summary.replace(new RegExp(re_,'gi'),'<b class="curtext">$1</b>'):obj.summary),'</h1>');	
					}	
					
					hd_arry.push('</div>');
					cont_.push('<div class="item" ',((obj.cur)?'style="display:block;"':''),'>');
					if(obj.shotlist){
						cont_.push('<div class="info1">');
						cont_.push('<h4>Shotlist</h4>');
						if(obj.language=='3'){
							cont_.push('<p dir="rtl">',(re_?(obj.shotlist.replace(/\n/g,'<br/>')).replace(new RegExp(re_,'gi'),'<b class="curtext">$1</b>'):(obj.shotlist.replace(/\n/g,'<br/>'))),'</p>');
						}else{
							cont_.push('<p>',(re_?(obj.shotlist.replace(/\n/g,'<br/>')).replace(new RegExp(re_,'gi'),'<b class="curtext">$1</b>'):(obj.shotlist.replace(/\n/g,'<br/>'))),'</p>');
						}
						cont_.push('</div>');
						cont_.push('<div class="vspace" style="height:20px;"></div>');
					}
					if(obj.storyline){
						cont_.push('<div class="info1">');
						cont_.push('<h4>Storyline</h4>');
						if(obj.language=='3'){
							cont_.push('<p dir="rtl">',(re_?(obj.storyline.replace(/\n/g,'<br/>')).replace(new RegExp(re_,'gi'),'<b class="curtext">$1</b>'):(obj.storyline.replace(/\n/g,'<br/>'))),'</p>');
						}else{
							cont_.push('<p>',(re_?(obj.storyline.replace(/\n/g,'<br/>')).replace(new RegExp(re_,'gi'),'<b class="curtext">$1</b>'):(obj.storyline.replace(/\n/g,'<br/>'))),'</p>');
						}
						cont_.push('</div>');
					}
					cont_.push('</div>');
					detail_tab_.push('<li class="item',((obj.cur)?" cur":""),'" mid="',obj.mid,'" dcid="',obj.dcid,'">',lang_lab[obj.language-1],'</li>');
					
					sharebtns_.push('<div class="item_s" style="display:',((obj.cur)?"block":"none"),';">');
					//wjj 2016-03-04
					if(mtype == 'T2'){
						sharebtns_.push('<a href="javascript:;" class="btn01"></a><input type="hidden" value="http://www.facebook.com/share.php?u=',path,'&t=',obj.slug,'" id="facebook_val">');
						sharebtns_.push('<a href="javascript:;" rel="nofollow" class="btn02"></a><input type="hidden" value="http://twitter.com/share?&text=',obj.slug,'&url=',path,'" id="twitter_val">');
						sharebtns_.push('<a href="javascript:;" class="btn03"></a><input type="hidden" value="http://www.linkedin.com/shareArticle?mini=true&url=',path,'&title=',obj.slug,'" id="linkedin_val">');
					}else{
						sharebtns_.push('<a href="javascript:;" class="btn01"></a><input type="hidden" value="http://www.facebook.com/share.php?u=',obj.detailBuyPath,'&t=',obj.slug,'" id="facebook_val">');
						sharebtns_.push('<a href="javascript:;" rel="nofollow" class="btn02"></a><input type="hidden" value="http://twitter.com/share?&text=',obj.slug,'&url=',obj.detailBuyPath,'" id="twitter_val">');
						sharebtns_.push('<a href="javascript:;" class="btn03"></a><input type="hidden" value="http://www.linkedin.com/shareArticle?mini=true&url=',obj.detailBuyPath,'&title=',obj.slug,'" id="linkedin_val">');
					}
					sharebtns_.push('</div>');
					detail_.push('<div class="item" ',((obj.cur)?'style="display:block;"':''),'>');                        
					detail_.push('<ul class="info_list">');
					detail_.push('<li><span class="lab">ID: </span>',d.dcid,'</li>');
					if(d.published){
						if(d.language=='3'){
							detail_.push('<li dir="rtl"><span class="lab">Published: </span>',getTimeString(d.published),'</li>');
						}else{
							detail_.push('<li><span class="lab">Published: </span>',getTimeString(d.published),'</li>');
						}
					}
					if(d.lastmodifytime){detail_.push('<li><span class="lab">Last Modified: </span>',getTimeString(d.lastmodifytime),'</li>');}
					if(obj.location){
						if(d.language=='3'){
							detail_.push('<li dir="rtl"><span class="lab">Location: </span>',(re_?obj.location.replace(new RegExp(re_,'gi'),'<b class="curtext">$1</b>'):obj.location),';</li>');
						}else{
							detail_.push('<li><span class="lab">Location: </span>',(re_?obj.location.replace(new RegExp(re_,'gi'),'<b class="curtext">$1</b>'):obj.location),';</li>');
						}
					}
					
					if(d.duration){detail_.push('<li><span class="lab">Duration: </span>',d.duration,'</li>');}
					if(obj.source){detail_.push('<li><span class="lab">Source: </span>',obj.source,'</li>');}
					if(obj.restrictions){detail_.push('<li><span class="lab">Restrictions: </span>',obj.restrictions,'</li>');}
					if(obj.version){detail_.push('<li><span class="lab">Version: </span>',obj.version,'</li>');}
					detail_.push('</ul>');
					detail_.push('</div>');
				});
				hd_.html(hd_arry.join(''));
				cont_box_.html(cont_.join(''));
				sharebtns_box.html(sharebtns_.join(''));
				detail_info_tab.html(detail_tab_.join(''));
				video_info_.html(detail_.join(''));
				if(video_path){
					video_imgbox_.html('').hide();
					video_box_.show();
					++first_times;
					init_p(video_path);
					videoEl = document.querySelector('video');
				}else{
					video_box_.hide();
					video_imgbox_.html('<img src="'+d.imgUrl+'"/>').show();				
				}
				$('#download_box_ li').removeClass('opened');
				$('#download_box_ .d_item_s').html('');				
			}else{
				data_success_box_.hide();
				data_error_box_.show().html('<p style="font-size:22px; text-align:center;">Data Error</p>');
			}
		});
	}

	//计算时间差
	function dateDiff(d1,d2){
		//console.log(d1);
		//console.log(d2);
		var dateBegin = new Date(d1.replace(/-/g, "/"));
		var dateDiff = d2.getTime() - dateBegin.getTime();
		var dayDiff = Math.floor(dateDiff / (24 * 3600 * 1000));//相差天数
		return dayDiff;
	}
	
	//右侧详情的下载操作
	$("#download_box_ .tit").click(function(){
	  $("#download_box_").animate({width: '310px'}, "fast",function(){
		  $('#download_box_ .close_btn').show();
		  $('#download_box_ ul').slideDown();
		  $("#download_box_ .tit").addClass('opened');
		});
	});
	$('#download_box_ .close_btn').click(function(){
		$('#download_box_ ul').slideUp(function(){
			$('#download_box_ .close_btn').hide();
			$("#download_box_").animate({width: '190px'}, "fast");
			$("#download_box_ .tit").removeClass('opened');
		});
	});
	$('#download_box_').on('click','li[format!="METADATA"]',function(){
		var this_f = $(this);
		if(!this_f.hasClass('opened')){
			$('#download_box_ li').removeClass('opened');
			this_f.addClass('opened');
			var d_l_ = $(this).children('.d_item_s');
			d_l_.html('Loading...');	
			var format = $(this).attr("format");
			var mid = $("#detail_infotab li.cur").attr("mid");
			var dcid = $("#detail_infotab li.cur").attr("dcid");

			$.getJSON('https://secure.cctvplus.com/interface/downloadUrl.do?callback=?',{"MID":mid,"DCID":dcid,"type":"News","format":format},function(d_){
				if(d_ && d_.result == 1){
					var gncHtml = '<a onclick="addToDQ(\''+dcid+'\', \''+format+'\')" target="_blank" class="download_link">GNC</a>';
					if( d_.cdurl != '' && d_.l3url != '' ){
						d_l_.html('<a href="'+d_.cdurl+'" onclick="downloadUrl(\''+d_.cdurl+'\',\'cdurl\',\''+d_.downloadID+'\')" target="_blank" class="download_link">download1</a><a href="'+d_.l3url+'" onclick="downloadUrl(\''+d_.l3url+'\',\'l3url\',\''+d_.downloadID+'\')" target="_blank" class="download_link">download2</a>');
					}else if( d_.cdurl != '' && d_.l3url == '' ){
						d_l_.html('<a href="'+d_.cdurl+'" onclick="downloadUrl(\''+d_.cdurl+'\',\'cdurl\',\''+d_.downloadID+'\')" target="_blank" class="download_link">download1</a>');
					}else if( d_.cdurl == '' && d_.l3url != '' ){
						d_l_.html('<a href="'+d_.l3url+'" onclick="downloadUrl(\''+d_.l3url+'\',\'l3url\',\''+d_.downloadID+'\')" target="_blank" class="download_link">download2</a>');
					}
				}else if(d_ && d_.result == -1){
					login_bar_fun();
					$('#download_box_ li').removeClass('opened');
				}else if(d_ && d_.result == -2){
					if(d_.errCode != ''){
						cusmot_alert_fun('Permission validation failed. (error code:'+d_.errCode+')');	
					}else{
						cusmot_alert_fun('Permission validation failed.');
					}
				}else if(d_ && d_.result == 0){
					if(d_.errCode != ''){
						d_l_.html('<span style="color:red">still in process Transcoding('+d_.errCode+')</span>');
					}else{
						d_l_.html('<span style="color:red">still in process Transcoding</span>');
					}
				}else if(d_ && d_.result == -3){
					if(d_.errCode != ''){
						d_l_.html('<span style="color:red">still in process Transcoding('+d_.errCode+')</span>');
					}else{
						d_l_.html('<span style="color:red">still in process Transcoding</span>');
					}
				}
			});

		}else{
			this_f.removeClass('opened');
		}
	});
	
	$('input[name!="ordertype_win"]').iCheck({
		radioClass: 'iradio_square',
		checkboxClass: 'icheckbox_square',
		increaseArea: '10%'
	});
	$('input[name="ordertype_win"]').iCheck({
		radioClass: 'radio_input_win',
		increaseArea: '10%' // optional
	});
	
	$('.search_item_left .ser_htit').click(function(){
		$(this).parent('.search_item_left').toggleClass('opened');
	});
	
	$('#detail_infotab').on('click','.item',function(){
		var item_ = $('#detail_infotab .item'),
		head_item_ = $('#detail_info_head .item'),
		cont_item_ = $('#detail_info_cont .item'),
		sharebtns_box = $('#sharebtns_box .item_s'),
		video_info_item_ = $('#video_info_list .item');
		if (!$(this).hasClass('cur')){
			var in_ = item_.index($(this));
			item_.removeClass('cur').eq(in_).addClass('cur');
			head_item_.hide().eq(in_).show();
			cont_item_.hide().eq(in_).show();
			video_info_item_.hide().eq(in_).show();
			sharebtns_box.hide().eq(in_).show();
		}
	});
	
	//add wjj 2016-02-03
	$('#detail_box_').on('click','.buy_box',function(){
		$('#order_win_msg').hide().html('');
		var this_ = $('#detail_box_');
		this_h3_ = this_.find('.item[style*="block"] h1');
		var img_ = $('#buy_box_').attr('imgUrl');
		txt_ = this_h3_.text();
		fid_ = $('#buy_box_').attr('dcid');
		curpage_dcid_ = $('#buy_box_').attr('dcid');
		curpage_mid_ = $('#buy_box_').attr('mid');
		var a_yu = '';
		if(this_h3_.attr('style')){a_yu +=' style="'+this_h3_.attr('style')+'"';}
		if(this_h3_.attr('dir')){a_yu +=' dir="'+this_h3_.attr('dir')+'"';}
		$('#creat_order_win .order_win_info').html('<img class="l_timg" src="'+img_+'" height="83" width="150"/><div class="txtbox"><h4'+a_yu+'>'+txt_+'</h4><p>ID:'+fid_+'</p></div>');
		$('#add_to_order_win').iCheck('check');
		$.getJSON('https://secure.cctvplus.com/interface/selOrder.do?callback=?',function(d){
			if(d && d.result==1){
				var ord_ = [], list = d.list;
				 if(!list || list.length==0){
					$('#neworder_val').val("");
					$("#cre_new_order_win").iCheck('check');
				}else{
					$('#add_to_order_win').iCheck('check');
				} 
				for(var i = 0; i < list.length ; i++) {
					if(i==0){
						$("#order_sel_text").html(list[i].ordername);
						$("#orderID").val(list[i].orderID);
						ord_.push('<li class="option" ord_id="',list[i].orderID,'"  checked="checked">',list[i].ordername,'</li>');
					}else{
						ord_.push('<li class="option" ord_id="',list[i].orderID,'">',list[i].ordername,'</li>');  
					}
					
				}
				$.colorbox({innerWidth:"580px", opacity:'0.6', overlayClose:false, inline:true, href:'#creat_order_win'});
				$("#order_sel_box .custom_sel_list ").html(ord_.join(''));
			}else if(d && d.result==-1){
				login_bar_fun();
			}
		});		
	});
	
	//
	cusmot_select_fun('order_sel_box');
	$('#add_to_order_win').on('ifChecked',function(e_){				
		$('#neworder_val_box').hide();
		$('#order_sel_box').show();
	});
	$('#cre_new_order_win').on('ifChecked',function(e_){				
		$('#order_sel_box').hide();
		$('#neworder_val_box').show();
	});
	
	//add wjj 2016-02-03
	$("#addArchive").click(function(){
		if(is_submitting==0){
			is_submitting=1;
			var dcid = curpage_dcid_;
			var mid = curpage_mid_;
			var msg_ = $('#order_win_msg');	
			if(!dcid || !mid){msg_.show().html('date error');is_submitting=0; return;}
			
			if($("#add_to_order_win").is(':checked')){
				var order = $("#orderID").val();
				if(!order){msg_.show().html('please check one');is_submitting=0; return;}
				$.ajax({
					url:"https://secure.cctvplus.com/interface/addToOrder.do",
					dataType:'jsonp',
					data:{orderID:order,DCID:dcid,MID:mid},
					success : function (data){

					}
				});
			}
			if($("#cre_new_order_win").is(':checked')){
				var inp = $.trim($("#neworder_val").val());
				if(!inp){msg_.show().html('name not null');is_submitting=0; return;}
				$.ajax({ 
					url:"https://secure.cctvplus.com/interface/newOrder.do",
					dataType:'jsonp',
					data:{ordername:encodeURIComponent(inp),DCID:dcid,MID:mid},
					success : function (data){
						if(data.result=='-1'){
							msg_.show().html('not login');
						}else if(data.result=='0'){
							msg_.show().html('Order Failed. (error code:'+data.errCode+')');
						}else if(data.result=='-2'){
							msg_.show().html('Please specify an order name. (error code:'+errCode+')');			
						}else if(data.result=='1'){
							$.colorbox.close();
						}else if(data.result=='-3'){
							msg_.show().html('You have just encountered a technical failure ('+data.errCode+'). Please report it to our customer service representative if possible, thank you.');			
						}else if(data.result=='-4'){
							msg_.show().html('You have just encountered a technical failure ('+data.errCode+'). Please report it to our customer service representative if possible, thank you.');			
						}else if(data.result=='-5'){
							msg_.show().html('Order already exists');
						}
					}
				}); 
			}
			is_submitting=0;
		}
	});
	
	function addToDQ(dcid, vtype) {
		var username = $('#uscenter_sel_box .custom_sel_text').text();
		$.ajax({
			url:'https://secure.cctvplus.com/downloadQueueMgt/extraContent?',
			data:{
				'username':username,
				'dcid':dcid,
				'vtype':vtype
			},
			success:function(d){
				if(d == 'success'){
					cusmot_alert_fun("files has been added to download list");
				} else if(d == 'denied'){
					cusmot_alert_fun("no authorization");
				} else if(d == 'done') {
					cusmot_alert_fun("download completed");
				}
			}
		});
	}
	
	downloadUrl = function(url,type,downloadId){
		var dcid = $("#detail_infotab li.cur").attr("dcid");
		$.ajax({
			url:"https://secure.cctvplus.com/interface/downloadMedia.do",
			dataType:'jsonp',
			data:{ DCID:dcid,downloadID:downloadId,url:url, urltype :type},
			success : function (data){
			}
		});
	}
	
	$('#navmain_2015box_2').addClass('cur');
	//check日期
	$('#Date_data_box input[class="data_item"]').on('ifChecked',function(){
		seach_check_LL['DATE_'] = $('#Date_data_box input[class="data_item"]:checked').val();
		search_fun_LL(1);
	});
	//check地点位置(国家)
	$('#Locations_data_box input[type="checkbox"]').on('ifChecked ifUnchecked',function(e_){
		var inp_data_all_ = $('#Locations_data_box input[type="checkbox"][class="data_all"]');
		var inp_data_items_ = $('#Locations_data_box input[type="checkbox"][class="data_item"]');	
		if($(this).hasClass('data_all')){//ç¹å»å¨é					
			if(e_.type == 'ifChecked'){
				inp_data_items_.prop('checked','checked');
			}else{
				inp_data_items_.removeProp('checked');
			}
			inp_data_items_.iCheck('update').iCheck('enable');
		}
		var che_1=[];
		$('#Locations_data_box input[type="checkbox"][class="data_item"]:checked').each(function(){
			che_1.push($(this).val());															   
		});
		if(che_1.length>0){
			seach_check_LL['LOCATIONS_'] = che_1.join(',');
			search_fun_LL(1);
			if(che_1.length == inp_data_items_.length){
				inp_data_all_.prop('checked','checked').iCheck('update').iCheck('enable');
			}else{
				inp_data_all_.removeProp('checked').iCheck('update').iCheck('enable');
			}
		}else{
			seach_check_LL['LOCATIONS_'] ='';
		}
	});
	//check类型
	$('#Category_data_box input[type="checkbox"]').on('ifChecked ifUnchecked',function(e_){
		var inp_data_all_ = $('#Category_data_box input[type="checkbox"][class="data_all"]');
		var inp_data_items_ = $('#Category_data_box input[type="checkbox"][class="data_item"]');	
		if($(this).hasClass('data_all')){//ç¹å»å¨é					
			if(e_.type == 'ifChecked'){
				inp_data_items_.prop('checked','checked');
			}else{
				inp_data_items_.removeProp('checked');
			}
			inp_data_items_.iCheck('update').iCheck('enable');
		}
		var che_1=[];
		$('#Category_data_box input[type="checkbox"][class="data_item"]:checked').each(function(){
			che_1.push($(this).val());															   
		});
		if(che_1.length>0){
			seach_check_LL['CATEGORY_'] = che_1.join(',');
			search_fun_LL(1);
			if(che_1.length == inp_data_items_.length){
				inp_data_all_.prop('checked','checked').iCheck('update').iCheck('enable');
			}else{
				inp_data_all_.removeProp('checked').iCheck('update').iCheck('enable');
			}
		}else{
			seach_check_LL['CATEGORY_'] ='';
			cusmot_alert_fun('Please select at least one Locations');
		}
	});
	//check语言
	$('#Language_data_box input[class="data_item"]').on('ifChecked',function(){
		seach_check_LL['LANGUAGE_'] = $('#Language_data_box input[class="data_item"]:checked').val();
		search_fun_LL(1);
	});
	//二级导航搜索input框
	$('#subsearch_val').keypress(function(e){
		if(e.keyCode==13){$('#subsearch_btn').click();}
	}).blur(function(){
		var this_ = $(this);
		if(!$.trim(this_.val())){this_.val(this_.prop('defaultValue'));}
	}).focus(function(){
		var this_ = $(this);
		if(this_.val()==this_.prop('defaultValue')){this_.val('');}
	});
	//清空搜索框
	$('#search_key_close_btn').click(function(){
		$('#search_key_tit').text('');
		$('#search_key_box').css('visibility','hidden');
		$('#subsearch_val').val('');
		$('#subsearch_btn').trigger('click');
	});
	//二级导航中搜索频道
	$('#subsearch_btn').click(function(e){
		var ss = $("#custom_sel_val").val();
		if($('#custom_sel_val').val()=='ord22222'){			
			window.location.href="/archive/allArchive.shtml#!keyword="+encodeURIComponent($.trim((($('#subsearch_val').val()==$('#subsearch_val').prop('defaultValue'))?'':$('#subsearch_val').val())));
		}else if($('#custom_sel_val').val()=='ord33333'){
			window.location.href="/exchange/allExchange.shtml#!keyword="+encodeURIComponent($.trim((($('#subsearch_val').val()==$('#subsearch_val').prop('defaultValue'))?'':$('#subsearch_val').val())));
		}else{
			seach_check_LL['keyword_'] = encodeURIComponent($.trim((($('#subsearch_val').val()==$('#subsearch_val').prop('defaultValue'))?'':$('#subsearch_val').val())));
			search_fun_LL(1);
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
	
	
	
	
	
	var key_word_uri_ = decodeURIComponent(Request_url_fun_by_special('keyword'));
	seach_check_LL['keyword_']=($.trim(key_word_uri_).length>0)?key_word_uri_:seach_check_LL['keyword_'];
	var hash_=''; // decodeURIComponent(window.location.hash);
	if(hash_&&(hash_.indexOf("sq_start=")>-1) && (hash_.indexOf("&sq_end=")>-1)){		
		var search_str = hash_.substring(hash_.indexOf("sq_start=")+9,hash_.indexOf("&sq_end="));
		if(search_str){
			seach_check_LL = JSON.parse(search_str);
		}
	}else{
		if(readCookie_LL('search_codenews_LL')){
			seach_check_LL = JSON.parse(readCookie_LL('search_codenews_LL')); 
			seach_check_LL['keyword_']=($.trim(key_word_uri_).length>0)?key_word_uri_:seach_check_LL['keyword_'];
		}
	}

//	function _facebook(){
//		var url = $("#facebook_val").val();
//		window.open (url,'','height=300,width=700,top=100,left=400,toolbar=no,menubar=no,scrollbars=no, resizable=no,location=no, status=no');
//		var mid = $("#detail_infotab li.cur").attr("mid");
//		var dcid = $("#detail_infotab li.cur").attr("dcid");
//		$.getJSON('https://secure.cctvplus.com/interface/shareRecord.do?callback=?',{"MID":mid,"DCID":dcid,"shareType":"2","type":"News"},function(d_){
//		});
//	}
//	function _twitter(){
//		var url = $("#twitter_val").val();
//		window.open (url,'','height=430,width=700,top=100,left=400,toolbar=no,menubar=no,scrollbars=no, resizable=no,location=no, status=no');
//		var mid = $("#detail_infotab li.cur").attr("mid");
//		var dcid = $("#detail_infotab li.cur").attr("dcid");
//		$.getJSON('https://secure.cctvplus.com/interface/shareRecord.do?callback=?',{"MID":mid,"DCID":dcid,"shareType":"1","type":"News"},function(d_){
//		});
//	}
//	function _linkedin(){
//		var url = $("#linkedin_val").val();
//		window.open (url,'','height=550,width=750,top=100,left=400,toolbar=no,menubar=no,scrollbars=no, resizable=no,location=no, status=no');
//		var mid = $("#detail_infotab li.cur").attr("mid");
//		var dcid = $("#detail_infotab li.cur").attr("dcid");
//		$.getJSON('https://secure.cctvplus.com/interface/shareRecord.do?callback=?',{"MID":mid,"DCID":dcid,"shareType":"3","type":"News"},function(d_){
//		});
//	}

	//pc数据翻页
	$("#f_left").on('click','.cus_page_btns>a',function(){
		search_fun_LL($(this).attr('data-page'));
	})

		
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
         
	});
	
	//分享facebook
	$("#sharebtns_box").on('click','.item_s>a.btn01',function(){
		var url = $("#facebook_val").val();
		window.open (url,'','height=300,width=700,top=100,left=400,toolbar=no,menubar=no,scrollbars=no, resizable=no,location=no, status=no');
		var mid = $("#detail_infotab li.cur").attr("mid");
		var dcid = $("#detail_infotab li.cur").attr("dcid");
		$.getJSON('https://secure.cctvplus.com/interface/shareRecord.do?callback=?',{"MID":mid,"DCID":dcid,"shareType":"2","type":"News"},function(d_){
		});
	})
	
	//分享twitter
	$("#sharebtns_box").on('click','.item_s>a.btn02',function(){
		var url = $("#twitter_val").val();
		window.open (url,'','height=430,width=700,top=100,left=400,toolbar=no,menubar=no,scrollbars=no, resizable=no,location=no, status=no');
		var mid = $("#detail_infotab li.cur").attr("mid");
		var dcid = $("#detail_infotab li.cur").attr("dcid");
		$.getJSON('https://secure.cctvplus.com/interface/shareRecord.do?callback=?',{"MID":mid,"DCID":dcid,"shareType":"1","type":"News"},function(d_){
		});
	})
	
	//分享linkedin
	$("#sharebtns_box").on('click','.item_s>a.btn03',function(){
		var url = $("#linkedin_val").val();
		window.open (url,'','height=550,width=750,top=100,left=400,toolbar=no,menubar=no,scrollbars=no, resizable=no,location=no, status=no');
		var mid = $("#detail_infotab li.cur").attr("mid");
		var dcid = $("#detail_infotab li.cur").attr("dcid");
		$.getJSON('https://secure.cctvplus.com/interface/shareRecord.do?callback=?',{"MID":mid,"DCID":dcid,"shareType":"3","type":"News"},function(d_){
		});
	})		
});