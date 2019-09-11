	var page_tid_ = Request_url_fun('tid');
	var is_submitting=0;
	var count_num_ = 1;
	var elementID;
	var rmp;
	
	function search_fun_LL(curpage){
		var search_list_box = $("#search_list_box"),
			page_tit_ = $('#page_tit');
		var pagesize = 20;
		search_list_box.html('<p style="text-align:center; padding:10px;">Loading...</p>');
		page_tit_.text('');
		$.getJSON('https://secure.cctvplus.com/searchInterface/archiveByCollection.do?callback=?',{'pageSize':pagesize,'pageNo':curpage,'tid':page_tid_},function(data){
			if(data && data.title){page_tit_.text(data.title);}
			if(!data || !data.categorys || !data.categorys.length){search_list_box.html('<p style="text-align:center; padding:10px;">No data</p>'); $('#download_box_').hide(); return;}
			
			var lis=data.categorys;	
			var itemsum=data.numFound;			
			if(itemsum<=0){search_list_box.html('<p style="text-align:center; padding:10px;">No data</p>'); return;}
			var pagesum=Math.ceil(itemsum/pagesize);
			var html_arr = [],len_ = lis.length;
			for(var i = 0; i<len_; i++){
				html_arr.push('<li><div class="brg_box">');
				html_arr.push('<div class="img_box"><a onclick="alink_detail(this)" target="_blank" href="',lis[i].detailBuyPath,'"><img src="',lis[i].spic,'" height="164" width="292" /></a></div>');
				html_arr.push('<div class="text_box">');
				html_arr.push('<h3',(lis[i].language==3?' dir="rtl" style="text-align:right;"':''),'><a onclick="alink_detail(this)" target="_blank" href="',lis[i].detailBuyPath,'">',lis[i].pubtitle,'</a></h3>');
				html_arr.push('<span class="file_id">ID:',lis[i].dcid,'</span>');
				html_arr.push('<span class="buy_btn" dcid="',lis[i].dcid,'" mid="',lis[i].mid,'"></span>');
				html_arr.push('</div>');
				html_arr.push('</div></li>');
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
			if(pagesum<=5){
				beginpage=1;
				endpage=pagesum;
				set_page_fun();
			}else{//如果显示最前面的五页
				if(curpage<5&&curpage>0){
					beginpage=1;
					endpage=5;
					set_page_fun();
					textArr.push('<a onselectstart="return false;" style="cursor:default;">...</a>');
					textArr.push('<a onselectstart="return false;" onclick="search_fun_LL(',pagesum,');">',pagesum,'</a>');
				}else if(curpage<=pagesum&&curpage>=(pagesum-4)){//如果显示最后面的五页
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
			search_list_box.html(html_arr.join(""));	 
			$("#search_list_pagebox").html(textArr.join(""));
			$('#download_box_').show();	
			$('#download_box_ li').removeClass('opened');
			$('#download_box_ .d_item_s').html('');
		});
	}	
$(function(){
	
	$('input[name!="ordertype_win"]').iCheck({
		radioClass: 'iradio_square',
		checkboxClass: 'icheckbox_square',
		increaseArea: '10%'
	});
	$('input[name="ordertype_win"]').iCheck({
		radioClass: 'radio_input_win',
		increaseArea: '10%' // optional
	});
	
	$('#navmain_2015box_3').addClass('cur');
	cusmot_select_fun('order_sel_box');
	search_load_fun(1);
	search_fun_LL(1);
	
	function search_load_fun(curpage){
		var video_list_main = $("#video_list_main"),
			md_title = $(".md_01_title");
		var pagesize = 20;
		md_title.text('');
		$.getJSON('https://secure.cctvplus.com/searchInterface/archiveByCollection.do?callback=?',
			{
				'pageSize':pagesize,
				'pageNo':curpage,
				'tid':page_tid_
			},
			function(data){
				if(data && data.title){
					md_title.text(data.title);
				}
				if(!data || !data.categorys || !data.categorys.length){
					video_list_main.html('<li style="text-align:center; padding:10px;">No data</li>');
					return;
				}
				
				if( data.numFound <= pagesize*curpage ){
					$(".fresh_box").hide();
				}
				
				var list_data = data.categorys;
				var coll_arr = [];
				for( var i=0;i<list_data.length;i++ ){
					coll_arr.push('<li><a href="',list_data[i].detailBuyPath,'"><dl>');
					coll_arr.push('<dt><img src="',list_data[i].spic,'"/></dt>');
					coll_arr.push('<dd><p>',list_data[i].pubtitle,'</p><span>',list_data[i].scriptIssTime,'</span></dd></dt>');
					coll_arr.push('</dl></a></li>');
				}
				video_list_main.append(coll_arr.join(''));
			}
		);
	}
	
	$('#search_list_box').on('click','.buy_btn',function(){
		$('#order_win_msg').hide().html('');
		var this_ = $(this).parent('.text_box').parent('.brg_box'),
		this_h3_ = this_.find('.text_box h3');
		var img_ = this_.find('.img_box img').prop('src'),
		txt_ = this_h3_.text(),
		fid_ = this_.find('.text_box .file_id').text();
		curpage_dcid_ = $(this).attr('dcid');
		curpage_mid_ = $(this).attr('mid');
		var a_yu = '';
		if(this_h3_.attr('style')){a_yu +=' style="'+this_h3_.attr('style')+'"';}
		if(this_h3_.attr('dir')){a_yu +=' dir="'+this_h3_.attr('dir')+'"';}
		$('#creat_order_win .order_win_info').html('<img class="l_timg" src="'+img_+'" height="83" width="150"/><div class="txtbox"><h4'+a_yu+'>'+txt_+'</h4><p>'+fid_+'</p></div>');
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
	$('#add_to_order_win').on('ifChecked',function(e_){				
		$('#neworder_val_box').hide();
		$('#order_sel_box').show();
	});
	$('#cre_new_order_win').on('ifChecked',function(e_){				
		$('#order_sel_box').hide();
		$('#neworder_val_box').show();
	});
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
						if(data.result=='-1'){
							msg_.show().html('not login');
						}
						else if(data.result=='0'){
							msg_.show().html('Order Failed. (error code:'+data.errCode+')');//æ·»å è®¢åå¤±è´¥
						}
						else if(data.result=='1'){		
							//$('#order_win_msg').show().html('Add order to success');//æ·»å è®¢åæåÂÂ
							$.colorbox.close();
						}else if(data.result=='-2'){
								msg_.show().html('Video already exists. (error code:'+data.errCode+')');			//è®¢åä¸­å·²ææ­¤é¡¹
						}else if(data.result=='-3'){	
								msg_.show().html('No choice has been available. (error code:'+data.errCode+')');			//æ²¡æéæ©å·²æè®¢å
						}
						else if(data.result=='-4'){		
								msg_.show().html('You have just encountered a technical failure (#'+data.errCode+'). Please report it to our customer service representative if possible, thank you.');			//midæèdcidä¸ºç©º
						}
						
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
						}
						else if(data.result=='0'){
								msg_.show().html('Order Failed. (error code:'+data.errCode+')');
						}
						else if(data.result=='-2'){
								msg_.show().html('Please specify an order name. (error code:'+errCode+')');			
						}
						else if(data.result=='1'){
							//$('#order_win_msg').show().html('Add order to success');
							$.colorbox.close();
						}else if(data.result=='-3'){
								msg_.show().html('You have just encountered a technical failure ('+data.errCode+'). Please report it to our customer service representative if possible, thank you.');			
						}
						else if(data.result=='-4'){
								msg_.show().html('You have just encountered a technical failure ('+data.errCode+'). Please report it to our customer service representative if possible, thank you.');			
						}
						else if(data.result=='-5'){
								msg_.show().html('Order already exists');
						}
					}
				}); 
			}
			is_submitting=0;
			}
	});
	
	$(".subsearch_btn").click(function(){
		var ss = $("#custom_sel_val").val();
		if(ss=='ord11111'){
			window.location.href="/news/latest.shtml#!keyword="+encodeURIComponent($.trim((($('#subsearch_val').val()==$('#subsearch_val').prop('defaultValue'))?'':$('#subsearch_val').val())));
		}else if(ss=='ord22222'){
			window.location.href="/archive/allArchive.shtml#!keyword="+encodeURIComponent($.trim((($('#subsearch_val').val()==$('#subsearch_val').prop('defaultValue'))?'':$('#subsearch_val').val())));
		}else if(ss=='ord33333'){
			window.location.href="/exchange/allExchange.shtml#!keyword="+encodeURIComponent($.trim((($('#subsearch_val').val()==$('#subsearch_val').prop('defaultValue'))?'':$('#subsearch_val').val())));
		}else{
			window.location.href="/archive/allCollections.shtml#!keyword="+encodeURIComponent($.trim((($('#subsearch_val').val()==$('#subsearch_val').prop('defaultValue'))?'':$('#subsearch_val').val())));
		}
		//=========add wjj 搜索记录
		var searchType = 'archive';
		if(ss=='ord11111'){
			searchType = 'News';
		}else if(ss=='ord22222'){
			searchType = 'archive';
		}else if(ss=='ord33333'){
			searchType = 'exchange';
		}else{
			searchType = 'collection';
		}
		$.getJSON('https://secure.cctvplus.com/interface/searchRecord.do?callback=?',{"keyword":$.trim($('#subsearch_val').val()),"type":searchType},function(d_){
		});
		//=========
	});
	$('#subsearch_val').keypress(function(e){
		if(e.keyCode==13){
			if($('#subsearch_val').val()!=''){
				$(".subsearch_btn").click();
			}else{
				$('#subsearch_val').val('');
			}
		}
	});
	
	$(".loadMore_btn").click(function(){
		count_num_ ++;
		search_load_fun(count_num_);
	})
	
})