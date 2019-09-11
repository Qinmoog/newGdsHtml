$(function(){
	
	var screenWidth=$(this).innerWidth();  //获取当前屏幕宽度
	var count_num = 1;
	var this_tid_ = Request_url_fun('tid');
	var elementID;
	var rmp;
	
	
	
	$('input').iCheck({
		radioClass: 'iradio_square',
		checkboxClass: 'icheckbox_square',
		increaseArea: '10%'
	});
	
	$('#navmain_2015box_2').addClass('cur');
	search_load_fun(1);
	search_fun_LL(1);
	
	
	
	
	
	function search_fun_LL(curpage){
		var search_list_box = $("#search_list_box");
		var pagesize = 20;
		search_list_box.html('<p style="text-align:center; padding:10px;">Loading...</p>');
		$.getJSON('http://secure.cctvplus.com/searchInterface/topicDetails.do?callback=?',{'pageSize':pagesize,'pageNo':curpage,'tid':this_tid_},function(data){
			if(data && data.title){
				$('#topic_head').text(data.title);
			}
			if(!data || !data.categorys || !data.categorys.length){
				search_list_box.html('<p style="text-align:center; padding:10px;">No data</p>');
				$('#download_box_').hide();
				return;
			}
	
			var lis=data.categorys;	
			var itemsum=data.numFound;			
			if(itemsum<=0){
				search_list_box.html('<p style="text-align:center; padding:10px;">No data</p>');
				return;
			}
			
			pagesum=Math.ceil(itemsum/pagesize);
			var html_arr = [],len_ = lis.length;		         
	   		for(var i = 0; i<len_; i++){
				html_arr.push('<li class="clearfix',(i==0?" cur":""),'" dcid="',lis[i].dcid,'" mid="',lis[i].mid,'">');
				html_arr.push('<div class="img_box"><img src="',lis[i].spic,'" height="60" width="106" /></div>');
				html_arr.push('<div class="text_box clearfix">');
				if(lis[i].language=='3'){
					html_arr.push('<h3 dir="rtl">',lis[i].pubtitle,'</h3>');
				}else{
					html_arr.push('<h3>',lis[i].pubtitle,'</h3>');
				}
				html_arr.push('<span class="time">',getTimeString1(lis[i].scriptIssTime),'</span>');
				//html_arr.push('<span class="time">',lis[i].scriptIssTime,'</span>');
				html_arr.push('</div>');
				html_arr.push('</li>');
			}
			var textArr = new Array();
			textArr.push('<div class="cus_page_btns">');		
			if(curpage>1){
				textArr.push('<a onselectstart="return false;" onclick="search_fun_LL(',curpage-1,');" class="prev">Prev</a>');
				textArr.push('<a onselectstart="return false;" onclick="search_fun_LL(',curpage-1,');" class="prev_btn">&nbsp;</a>');			
			}else{
				textArr.push('<a style="cursor:default;" onselectstart="return false;" class="prev">Prev</a>');
				textArr.push('<a style="cursor:default;" onselectstart="return false;" class="prev_btn">&nbsp;</a>');
			}
			
			var beginpage = beginpage = 1;
			function set_page_fun(){
				for(var i=beginpage;i<=endpage;i++){
					if(i==curpage){
							textArr.push('<a onselectstart="return false;" class="cur">',i,'</a>');
					}else{
							textArr.push('<a onselectstart="return false;" class="" onclick="search_fun_LL(',i,');">',i,'</a>');
					}
				}
			}
			if(pagesum<5){
				beginpage=1;
				endpage=pagesum;
				set_page_fun();
			}else{//å¦ææ¾ç¤ºæåé¢çäºé¡µ
				if(curpage<5&&curpage>0){
					beginpage=1;
					endpage=5;
					set_page_fun();
					textArr.push('<a onselectstart="return false;" style="cursor:default;">...</a>');
					textArr.push('<a onselectstart="return false;" onclick="search_fun_LL(',pagesum,');">',pagesum,'</a>');
				}else if(curpage<=pagesum&&curpage>=(pagesum-4)){//å¦ææ¾ç¤ºæåé¢çäºé¡µ
					beginpage=pagesum-4;
					endpage=pagesum;
					textArr.push('<a onselectstart="return false;" onclick="search_fun_LL(',1,');">1</a>');
					textArr.push('<a onselectstart="return false;">...</a>');
					set_page_fun();
				}else{
					beginpage=curpage-2;
					endpage=curpage+2;
					textArr.push('<a onselectstart="return false;" onclick="search_fun_LL(',1,');">1</a>');
					textArr.push('<a onselectstart="return false;" style="cursor:default;">...</a>');
					set_page_fun();
					textArr.push('<a onselectstart="return false;" style="cursor:default;">...</a>');
					textArr.push('<a onselectstart="return false;" onclick="search_fun_LL(',pagesum,');">',pagesum,'</a>');				
				}
			}
			
			if(curpage<pagesum){
				textArr.push('<a onselectstart="return false;" onclick="search_fun_LL(',1+curpage,')" class="next_btn">&nbsp;</a>');
				textArr.push('<a onselectstart="return false;" onclick="search_fun_LL(',1+curpage,')" class="next">Next</a>');
			}else{
				textArr.push('<a style="cursor:default;" onselectstart="return false;" class="next_btn">&nbsp;</a>');
				textArr.push('<a style="cursor:default;" onselectstart="return false;" class="next">Next</a>');
			}
			textArr.push('<div class="clear"></div></div><div class="clear"></div>');
			search_list_box.html(html_arr.join(''));
			$('#search_list_pagebox').html(textArr.join(''));
			$('#search_list_box li').eq(0).trigger('click');	
			$('#download_box_').show();	
			$('#download_box_ li').removeClass('opened');
			$('#download_box_ .d_item_s').html('');	
		});
	}
	
	function search_load_fun(curpage){
		var video_list_main = $("#video_list_main"),
			searchTitle_s = $("#subsearch_val_s").val();
		var pagesize = 20;
		
//		search_list_big.html('<p style="text-align:center; padding:10px;">Loading...</p>');
		$.getJSON('http://secure.cctvplus.com/searchInterface/topicDetails.do?callback=?',
			{
				'pageSize':pagesize,
				'pageNo':curpage,
				'tid':this_tid_
			},
			function(data){
//				console.log(data);
				if(!data || !data.categorys.length){
					video_list_main.html('<p style="text-align:center; padding:10px;">No data</p>');
					return;
				}
				var lis=data.categorys;
				var html_arr_ = [];

				for( var j=0;j<lis.length;j++ ){
					html_arr_.push('<li><a href="',lis[j].detailPath,'"><dl>');
					html_arr_.push('<dt><img src="',lis[j].spic,'"/></dt>');
					html_arr_.push('<dd><p>',lis[j].pubtitle,'</p><span>',lis[j].scriptIssTime,'</span></dd>');
					html_arr_.push('</dl></a></li>');
				}
				video_list_main.append(html_arr_.join(''));
				
				
//				changeImgSize();
			
			}
		);
	}
	
	function make_detail_box(dcid,mid){ //return false;
		var data_success_box_ = $('#data_success_box'), data_error_box_ = $('#data_error_box');
		//add wjj 2016-04-05 å¨åæ¢æ°é»æ¶ åæ¾ç¤ºloading
		data_success_box_.hide();
		data_error_box_.show().html('Loading...');
		//end
		$.getJSON('http://secure.cctvplus.com/searchInterface/newsSearch.do?callback=?',{'dcid':dcid,'mid':mid},function(d){
			if(d && d.items && d.items.length){
				data_success_box_.show();
				data_error_box_.hide();
				var hd_ = $('#detail_info_head'),
				cont_box_ = $('#detail_info_cont'),
				video_info_ = $('#video_info_list'),
				detail_info_tab = $('#detail_infotab'),
				sharebtns_box = $('#sharebtns_box'),
				video_box_ = $('#video_box'),
				video_imgbox_ = $('#video_imgbox');
				var items_ = d.items;
				var hd_arry = [],cont_ = [],detail_ = [],detail_tab_ = [], lang_arry =[], sharebtns_ =[], lang_lab = ['English','Français','العربية','Pусский','Español'], lang_lab_s = ['EN','','','',''];
				var video_path = d.videoUrl;
				if(d.metasource==3){
					$('#download_box_ li[format^="HD-"]').hide();
				}else{
					$('#download_box_ li[format^="HD-"]').show();
				}
				$('#download_box_ li[format="METADATA"]').children('a.d_item_t').prop('href',d.xmlurl);
				$.each(items_,function(i,obj){
					hd_arry.push('<div class="item" ',((obj.cur)?'style="display:block;"':''),'>');
					hd_arry.push('<a class="alink" onclick="alink_detail(this)" href="',obj.detailPath,'" target="_blank"></a>');
					if(obj.language=='3'){
						hd_arry.push('<h1 dir="rtl">',obj.slug,'</h1>');
						hd_arry.push('<p dir="rtl">',obj.summary,'</p>');
					}else{
						hd_arry.push('<h1>',obj.slug,'</h1>');
						hd_arry.push('<p>',obj.summary,'</p>');
					}
					hd_arry.push('</div>');
					cont_.push('<div class="item" ',((obj.cur)?'style="display:block;"':''),'>');
					if(obj.shotlist){
						cont_.push('<div class="info1">');
						cont_.push('<h4>Shotlist</h4>');
						if(obj.language=='3'){
							cont_.push('<p dir="rtl">',obj.shotlist.replace(/\n/g,'<br/>'),'</p>');					
						}else{
							cont_.push('<p>',obj.shotlist.replace(/\n/g,'<br/>'),'</p>');
						}
						cont_.push('</div>');
						cont_.push('<div class="vspace" style="height:20px;"></div>');
					}
					if(obj.storyline){
						cont_.push('<div class="info1">');
						cont_.push('<h4>Storyline</h4>');
						if(obj.language=='3'){
							cont_.push('<p dir="rtl">',obj.storyline.replace(/\n/g,'<br/>'),'</p>');
						}else{
							cont_.push('<p>',obj.storyline.replace(/\n/g,'<br/>'),'</p>');
						}
						cont_.push('</div>');
					}
					cont_.push('</div>');
					detail_tab_.push('<li class="item',((obj.cur)?" cur":""),'" mid="',obj.mid,'" dcid="',obj.dcid,'">',lang_lab[obj.language-1],'</li>');
					//lang_arry.push(lang_lab_s[obj.language-1]);
					sharebtns_.push('<div class="item_s" style="display:',((obj.cur)?"block":"none"),';">');
					sharebtns_.push('<a class="btn01"></a><input type="hidden" value="http://www.facebook.com/share.php?u=',obj.detailPath,'&t=',obj.slug,'" id="facebook_val">');
					sharebtns_.push('<a rel="nofollow" class="btn02"></a><input type="hidden" value="http://twitter.com/share?&text=',obj.slug,'&url=',obj.detailPath,'" id="twitter_val">');
					sharebtns_.push('<a class="btn03"></a><input type="hidden" value="http://www.linkedin.com/shareArticle?mini=true&url=',obj.detailPath,'&title=',obj.slug,'" id="linkedin_val">');
					sharebtns_.push('</div>');
					detail_.push('<div class="item" ',((obj.cur)?'style="display:block;"':''),'>');                        
					detail_.push('<ul class="info_list">');
					detail_.push('<li><span class="lab">ID: </span>',d.dcid,'</li>');
					if(d.published){
						if(obj.language=='3'){
							detail_.push('<li dir="rtl"><span class="lab">Published: </span>',getTimeString(d.published),'</span>');
							//detail_.push('<li dir="rtl"><span class="lab">Published: </span>',d.published,'</span>');
						}else{
							detail_.push('<li><span class="lab">Published: </span>',getTimeString(d.published),'</li>');
							//detail_.push('<li><span class="lab">Published: </span>',d.published,'</li>');
						}
					}
					if(d.lastmodifytime){detail_.push('<li><span class="lab">Last Modified: </span>',getTimeString(d.lastmodifytime),'</li>');}
					//if(d.lastmodifytime){detail_.push('<li><span class="lab">Last Modified: </span>',d.lastmodifytime,'</li>');}
					if(obj.location){
						if(obj.language=='3'){
							detail_.push('<li dir="rtl"><span class="lab">Location: </span>',obj.location,';</li>');
						}else{
							detail_.push('<li><span class="lab">Location: </span>',obj.location,';</li>');
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
					/* if(CKobject.getObjectById('ckplayer_a1')){
						CKobject.getObjectById('ckplayer_a1').newAddress('{f->'+video_path+'}{html5->'+video_path+'->video/mp4}');
					}else{ */
						init_p(video_path);
					//}
				}else{
					//if(CKobject.getObjectById('ckplayer_a1')){CKobject.getObjectById('ckplayer_a1').videoPause();}
					video_box_.hide();
					video_imgbox_.html('<img src="'+d.imgUrl+'"/>').show();				
				}
				$('#download_box_ .close_btn').trigger('click');
				$('#download_box_ li').removeClass('opened');
				$('#download_box_ .d_item_s').html('');				
			}else{
				if(CKobject.getObjectById('ckplayer_a1')){CKobject.getObjectById('ckplayer_a1').videoPause();}
				data_success_box_.hide();
				data_error_box_.show().html('<p style="font-size:22px; text-align:center;">Data Error</p>');
	
			}
		});
	}
	
	function init_p(uu_){
		var vid_box_ = $('#video_box'), vid_f_bod_ = $('#data_success_box'), window_width = $(window).width();
		var hh = Math.ceil(vid_f_bod_.width()/16*9),
			ww = vid_f_bod_.width();
		if( rmp ){rmp.destroy();}
		$('#video_box').html('');
		var bitrates = {
				mp4: [
					uu_
				  ]
			};
			var settings = {
			    licenseKey: 'Kl8leXk3OWdjODAyeWVpP3JvbTVkYXNpczMwZGIwQSVfKg==',
			    bitrates: bitrates,
			    delayToFade: 3000,
	//		    width:'100%',
	//		    height:'100%',
	//		    width: 661,
	//		    height: 372,
				width: ww,
				height:hh,
			    preload: 'auto',
				skin: 's4',
				skinBackgroundColor: 'rgba(0, 0, 0, 0.45)',
				skinButtonColor: 'FFFFFF',
				skinAccentColor: '000000'
			};
			elementID = 'video_box';
			rmp = new RadiantMP(elementID);
			var rmpContainer = document.getElementById(elementID);
			//全屏空格键只负责播放和暂停 
			rmpContainer.addEventListener('enterfullscreen', function() {
			  $('.page_topbar').hide();
			  $('#video_box').focus();
			});
			rmpContainer.addEventListener('exitfullscreen', function() {
				  $('.page_topbar').show();
			});
			rmp.init(settings);
	}
	
	//点击加载更多
	$(".loadMore_btn").click(function(){
		count_num++;
		search_load_fun(count_num);
	})
	
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
	
	$('#search_list_box').on('click','li',function(){
		$('#search_list_box li').removeClass('cur');
		var th_= $(this);
		th_.addClass('cur');
		make_detail_box(th_.attr('dcid'),th_.attr('mid'));
		//add wjj 0411 begin
		$.getJSON('http://secure.cctvplus.com/interface/topicBrowseRecord.do?callback=?',{"MID":th_.attr('mid'),"DCID":th_.attr('dcid'),"browse_source":document.referrer,"type":"News"},function(d_){
		});
		//add wjj 0411 end
	});
	
	$("#download_box_ .tit").click(function(){
	  $("#download_box_").animate({width: '350px'}, "fast",function(){
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
		//if(!this_f.hasClass('opened')){
			$('#download_box_ li').removeClass('opened');
			this_f.addClass('opened');
			var d_l_ = $(this).children('.d_item_s');
			d_l_.html('Loading...');	
			var format = $(this).attr("format");
			var mid = $("#detail_infotab li.cur").attr("mid");
			var dcid = $("#detail_infotab li.cur").attr("dcid");
			if(format!='METADATA'){
				$.getJSON('http://secure.cctvplus.com/interface/downloadUrl.do?callback=?',{"MID":mid,"DCID":dcid,"type":"News","format":format},function(d_){
					if(d_ && d_.result == 1){
						if( d_.cdurl != '' && d_.l3url != '' ){
							d_l_.html('<a href="'+d_.cdurl+'" onclick="downloadUrl(\''+d_.cdurl+'\',\'cdurl\',\''+d_.downloadID+'\')" target="_blank" class="download_link">download1</a><a href="'+d_.l3url+'" onclick="downloadUrl(\''+d_.l3url+'\',\'l3url\',\''+d_.downloadID+'\')" target="_blank" class="download_link">download2</a>');
						}else if( d_.cdurl != '' && d_.l3url == '' ){
							d_l_.html('<a href="'+d_.cdurl+'" onclick="downloadUrl(\''+d_.cdurl+'\',\'cdurl\',\''+d_.downloadID+'\')" target="_blank" class="download_link">download1</a>');
						}else if( d_.cdurl == '' && d_.l3url != '' ){
							d_l_.html('<a href="'+d_.l3url+'" onclick="downloadUrl(\''+d_.l3url+'\',\'l3url\',\''+d_.downloadID+'\')" target="_blank" class="download_link">download2</a>');
						}
					}else if(d_ && d_.result == -1){
						login_bar_fun();		//æééªè¯å¤±è´¥
						$('#download_box_ li').removeClass('opened');
					}else if(d_ && d_.result == -2){
						if(d_.errCode != ''){
							cusmot_alert_fun('Permission validation failed. (error code:'+d_.errCode+')');	//æééªè¯å¤±è´¥
						}else{
							cusmot_alert_fun('Permission validation failed.');	//æééªè¯å¤±è´¥
						}
					}else if(d_ && d_.result == 0){
						if(d_.errCode != ''){
							cusmot_alert_fun('Get download address failed. (error code:'+d_.errCode+')');	//è·åä¸è½½å°åå¤±è´¥
						}else{
							cusmot_alert_fun('Get download address failed.');	//è·åä¸è½½å°åå¤±è´¥
						}
					}else if(d_ && d_.result == -3){
						if(d_.errCode != ''){
							cusmot_alert_fun('Not found this video, please contact the administrator. (error code:'+d_.errCode+')');		//æ²¡ææ¾å°è¯¥è§é¢,è¯·èç³»ç®¡çåÂÂ	
						}else{
							cusmot_alert_fun('Not found this video, please contact the administrator.');		//æ²¡ææ¾å°è¯¥è§é¢,è¯·èç³»ç®¡çå	
						}
					}
				});
			//}
		}else{
			this_f.removeClass('opened');
		}
	});
	
	$(".subsearch_btn").click(function(){
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
		$.getJSON('http://secure.cctvplus.com/interface/searchRecord.do?callback=?',{"keyword":$.trim($('#subsearch_val').val()),"type":searchType},function(d_){
		});
		//=========
	});
	
	$('#subsearch_val').keypress(function(e){
		if(e.keyCode==13){
			if($('#subsearch_val').val()!=''){
				$(".subsearch_btn").click();
			}else{
				$('#subsearch_val').val('Search');
			}
		}
	});
	
//	function _facebook(){
//		var url = $("#facebook_val").val();
//		window.open (url,'','height=300,width=700,top=100,left=400,toolbar=no,menubar=no,scrollbars=no, resizable=no,location=no, status=no');
//		var mid = $("#detail_infotab li.cur").attr("mid");
//		var dcid = $("#detail_infotab li.cur").attr("dcid");
//		$.getJSON('http://secure.cctvplus.com/interface/shareRecord.do?callback=?',{"MID":mid,"DCID":dcid,"shareType":"2","type":"News"},function(d_){
//		});
//	}
//	function _twitter(){
//		var url = $("#twitter_val").val();
//		window.open (url,'','height=430,width=700,top=100,left=400,toolbar=no,menubar=no,scrollbars=no, resizable=no,location=no, status=no');
//		var mid = $("#detail_infotab li.cur").attr("mid");
//		var dcid = $("#detail_infotab li.cur").attr("dcid");
//		$.getJSON('http://secure.cctvplus.com/interface/shareRecord.do?callback=?',{"MID":mid,"DCID":dcid,"shareType":"1","type":"News"},function(d_){
//		});
//	}
//	function _linkedin(){
//		var url = $("#linkedin_val").val();
//		window.open (url,'','height=550,width=750,top=100,left=400,toolbar=no,menubar=no,scrollbars=no, resizable=no,location=no, status=no');
//		var mid = $("#detail_infotab li.cur").attr("mid");
//		var dcid = $("#detail_infotab li.cur").attr("dcid");
//		$.getJSON('http://secure.cctvplus.com/interface/shareRecord.do?callback=?',{"MID":mid,"DCID":dcid,"shareType":"3","type":"News"},function(d_){
//		});
//	}
	
	//分享facebook
	$("#sharebtns_box").on('click','.item_s>a.btn01',function(){
		var url = $("#facebook_val").val();
		window.open (url,'','height=300,width=700,top=100,left=400,toolbar=no,menubar=no,scrollbars=no, resizable=no,location=no, status=no');
		var mid = $("#detail_infotab li.cur").attr("mid");
		var dcid = $("#detail_infotab li.cur").attr("dcid");
		$.getJSON('http://secure.cctvplus.com/interface/shareRecord.do?callback=?',{"MID":mid,"DCID":dcid,"shareType":"2","type":"News"},function(d_){
		});
	})
	
	//分享twitter
	$("#sharebtns_box").on('click','.item_s>a.btn02',function(){
		var url = $("#twitter_val").val();
		window.open (url,'','height=430,width=700,top=100,left=400,toolbar=no,menubar=no,scrollbars=no, resizable=no,location=no, status=no');
		var mid = $("#detail_infotab li.cur").attr("mid");
		var dcid = $("#detail_infotab li.cur").attr("dcid");
		$.getJSON('http://secure.cctvplus.com/interface/shareRecord.do?callback=?',{"MID":mid,"DCID":dcid,"shareType":"1","type":"News"},function(d_){
		});
	})
	
	//分享linkedin
	$("#sharebtns_box").on('click','.item_s>a.btn03',function(){
		var url = $("#linkedin_val").val();
		window.open (url,'','height=550,width=750,top=100,left=400,toolbar=no,menubar=no,scrollbars=no, resizable=no,location=no, status=no');
		var mid = $("#detail_infotab li.cur").attr("mid");
		var dcid = $("#detail_infotab li.cur").attr("dcid");
		$.getJSON('http://secure.cctvplus.com/interface/shareRecord.do?callback=?',{"MID":mid,"DCID":dcid,"shareType":"3","type":"News"},function(d_){
		});
	})
	
	function downloadUrl(url,type,downloadId){
		var dcid = $("#detail_infotab li.cur").attr("dcid");
		$.ajax({
			url:"http://secure.cctvplus.com/interface/downloadMedia.do",
			dataType:'jsonp',
			data:{ DCID:dcid,downloadID:downloadId,url:url, urltype :type},
			success : function (data){
			}
		});
	}
	
	$("#subsearch_val_box_btn").click(function(){
		var ss = $(".custom_sel_text_s").attr('ord_id');
		if($(".custom_sel_text_s").attr('ord_id')=='ord22222'){			
			window.location.href="/archive/allArchive.shtml#!keyword="+encodeURIComponent($.trim((($('#subsearch_val_s').val()==$('#subsearch_val_s').prop('defaultValue'))?'':$('#subsearch_val_s').val())));
		}else if($(".custom_sel_text_s").attr('ord_id')=='ord33333'){
			window.location.href="/exchange/allExchange.shtml#!keyword="+encodeURIComponent($.trim((($('#subsearch_val_s').val()==$('#subsearch_val_s').prop('defaultValue'))?'':$('#subsearch_val_s').val())));
		}else{
			window.location.href="/news/latest.shtml?!keyword="+encodeURIComponent($.trim((($('#subsearch_val_s').val()==$('#subsearch_val_s').prop('defaultValue'))?'':$('#subsearch_val_s').val())));
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
		$.getJSON('http://secure.cctvplus.com/interface/searchRecord.do?callback=?',{"keyword":$.trim($('#subsearch_val_s').val()),"type":searchType},function(d_){
		});
	})
	
	$('#subsearch_val_s').keypress(function(e){
		if(e.keyCode==13){$('#subsearch_val_box_btn').click();}
	}).blur(function(){
		var this_ = $(this);
		if(!$.trim(this_.val())){this_.val(this_.prop('defaultValue'));}
	}).focus(function(){
		var this_ = $(this);
		if(this_.val()==this_.prop('defaultValue')){this_.val('');}
	});
	
	
//	$(window).resize(function(){
//      changeImgSize();
//  });
//	
//	function changeImgSize(){
//		$(".big_item").each(function(){
//			$(this).find('img').css({'height':($(this).width()/16*9)+'px'});
//		})
//		$(".small_item").each(function(){
//			$(this).find('img').css({'height':($(this).width()/16*9)+'px'});
//		})
//		
//		
//	}
	
})



