function writeCookie_search(){
	writeCookie_LL('search_code_LL',JSON.stringify(seach_check_LL),24);
}
function check_submit(){
	if(!$.trim(seach_check_LL['SOURCE_'])){cusmot_alert_fun('Please select at least one SOURCE'); return false;}
	if(seach_check_LL['DATE_']=='' && (seach_check_LL['startTime_']=='' || seach_check_LL['endTime_']=='')){
		cusmot_alert_fun('Please select at least one DATE'); return false;
	}
	if(!$.trim(seach_check_LL['LOCATIONS_'])){cusmot_alert_fun('Please select at least one LOCATIONS'); return false;}
	if(!$.trim(seach_check_LL['CATEGORY_'])){cusmot_alert_fun('Please select at least one CATEGORY'); return false;}
	if(!$.trim(seach_check_LL['RESOLUTION_'])){cusmot_alert_fun('Please select at least one RESOLUTION'); return false;}
	if(!$.trim(seach_check_LL['FENBIANLV_'])){cusmot_alert_fun('Please select at least one FENBIANLV'); return false;}
	return true;
}
var seach_check_LL ={"keyword_":"","startTime_":"","endTime_":"","RESOLUTION_":"1,2","FENBIANLV_":"1,2","SOURCE_":"1","DATE_":"0,1,2,3","LOCATIONS_":"data_all,C01,150,002,B01,142,021,419,009,A01","CATEGORY_":"1000000,2000000,3000000,4000000,5000000,6000000,7000000,8000000,9000000,10000000,11000000,12000000,13000000,14000000,15000000,16000000,17000000,90000000"};
function search_fun_LL(curpage){
	var search_list_box = $("#search_list_box");
	var find_num_val_ = $('#find_num_val');
	if(!check_submit()){ return false;};
	writeCookie_search();
	window.location.hash=encodeURIComponent("!sq_start="+JSON.stringify(seach_check_LL)+"&sq_end=");
	var cell_num = Math.floor((search_list_box.width()+20)/312);
	if(cell_num>5){cell_num=5;}
	if(cell_num<3){cell_num=3;}
	var pagesize = cell_num*3;//æ¯é¡µå±ç¤ºæ¡æ°
	search_list_box.html('<p style="text-align:center; padding:10px;">Loading...</p>');
	find_num_val_.text('');
	$.getJSON('https://secure.cctvplus.com/searchInterface/archive.do?callback=?',{'pageSize':pagesize,'pageNo':curpage,'searchTitle':encodeURIComponent(decodeURIComponent(seach_check_LL.keyword_)),'isstime':seach_check_LL.DATE_,'searchStartTime':seach_check_LL.startTime_,'searchEndTime':seach_check_LL.endTime_,'CATEGORY':seach_check_LL.CATEGORY_,'LOCATIONS':seach_check_LL.LOCATIONS_,'RESOLUTION':seach_check_LL.RESOLUTION_,'FENBIANLV':seach_check_LL.FENBIANLV_,'SOURCE':seach_check_LL.SOURCE_},function(data){
	//$.getJSON('http://172.20.1.9:8890/searchInterface/archive.do?callback=?',{'pageSize':pagesize,'pageNo':curpage,'searchTitle':encodeURIComponent(decodeURIComponent(seach_check_LL.keyword_)),'isstime':seach_check_LL.DATE_,'searchStartTime':seach_check_LL.startTime_,'searchEndTime':seach_check_LL.endTime_,'CATEGORY':seach_check_LL.CATEGORY_,'LOCATIONS':seach_check_LL.LOCATIONS_,'RESOLUTION':seach_check_LL.RESOLUTION_,'FENBIANLV':seach_check_LL.FENBIANLV_,'SOURCE':seach_check_LL.SOURCE_},function(data){	
		if(!data || !data.categorys.length){search_list_box.html('<p style="text-align:center; padding:10px;">No data</p>'); $("#search_list_pagebox").html(''); find_num_val_.text(''); return;}			
		var lis=data.categorys;	
		var itemsum=data.numFound;			
		if(itemsum<=0){search_list_box.html('<p style="text-align:center; padding:10px;">No data</p>'); $("#search_list_pagebox").html(''); find_num_val_.text(''); return;}
		var pagesum=Math.ceil(itemsum/pagesize);
		find_num_val_.text(itemsum);
		var html_arr = [];
		html_arr.push('<ul class="custom_list_box2">');
		for(var i = 0, len = lis.length; i<len; i++){
			html_arr.push('<li><div class="brg_box">');
			html_arr.push('<div class="img_box"><a onclick="alink_detail(this)" target="_blank" href="',lis[i].detailBuyPath,'"><img src="',lis[i].spic,'" height="164" width="292" /></a></div>');
			html_arr.push('<div class="text_box">');
			html_arr.push('<h3',(lis[i].language==3?' dir="rtl" style="text-align:right;"':''),'><a onclick="alink_detail(this)" target="_blank" href="',lis[i].detailBuyPath,'">',lis[i].pubtitle,'</a></h3>');
			html_arr.push('<span class="file_id">ID:',lis[i].dcid,'</span>');
			html_arr.push('<span class="buy_btn" dcid="',lis[i].dcid,'" mid="',lis[i].mid,'"></span>');
			html_arr.push('</div>');
			html_arr.push('</div></li>');
		}
		html_arr.push('</ul>');
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
		}else{//显示前四页
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
		
		search_list_box.html(html_arr.join(""));	 
		$("#search_list_pagebox").html(textArr.join(""));
	});
}
function change_time_check(){
	var s_time = $.trim($('#startTime_val').val());
	var e_time = $.trim($('#endTime_val').val());
	var re = /^\d{4}-\d{2}-\d{2}$/;
	if(s_time && e_time){
		if(re.test(s_time) && re.test(e_time) && (new Date(e_time.replace(/-/g,'/'))).getTime() > (new Date(s_time.replace(/-/g,'/'))).getTime()){
			seach_check_LL['startTime_'] = s_time;
			seach_check_LL['endTime_'] = e_time;
			search_fun_LL(1);
		}else{
			cusmot_alert_fun("time is error");
		}
	}
}

function init_search_fun(){
	$('#subsearch_val').val(decodeURIComponent(seach_check_LL['keyword_']));
	if(seach_check_LL['SOURCE_']){
		var g_1 = seach_check_LL['SOURCE_'].split(',');
		$('#SOURCE_data_box input[type="checkbox"]').each(function(){
			if(jQuery.inArray($(this).val(), g_1)!==-1){
				$(this).prop('checked','checked');
			}else{
				$(this).removeProp('checked');
			}
			$(this).iCheck('update');
		});
	}
	if(seach_check_LL['DATE_']){
		var g_2 = seach_check_LL['DATE_'].split(',');
		$('#Date_data_box input[type="checkbox"][class="data_item"]').each(function(){
			if(jQuery.inArray($(this).val(), g_2)!==-1){
				$(this).prop('checked','checked');
			}else{
				$(this).removeProp('checked');
			}
			$(this).iCheck('update');
		});
		if($('#Date_data_box input[type="checkbox"][class="data_item"]').not(':checked').length==0){
			$('#Date_data_box input[type="checkbox"][class="data_all"]').prop('checked','checked').iCheck('update').iCheck('disable');
		}
		$('#startTime_val, #endTime_val').val('');
	}
	if(seach_check_LL['startTime_'] && seach_check_LL['endTime_']){			
		$('#startTime_val').val(seach_check_LL['startTime_']); 
		$('#endTime_val').val(seach_check_LL['endTime_']);
		$('#Date_data_box input[name="Date_radio"][class="data_select"]').iCheck('check');
	}
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
			$('#Locations_data_box input[type="checkbox"][class="data_all"]').prop('checked','checked').iCheck('update').iCheck('disable');
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
			$('#Category_data_box input[type="checkbox"][class="data_all"]').prop('checked','checked').iCheck('update').iCheck('disable');
		}
	}
	if(seach_check_LL['RESOLUTION_']){
		var g_5 = seach_check_LL['RESOLUTION_'].split(',');
		$('#Resolution_data_box input[type="checkbox"][class="data_item"]').each(function(){
			if(jQuery.inArray($(this).val(), g_5)!==-1){
				$(this).prop('checked','checked');
			}else{
				$(this).removeProp('checked');
			}
			$(this).iCheck('update');
		});
	}
	if(seach_check_LL['FENBIANLV_']){
		var g_6 = seach_check_LL['FENBIANLV_'].split(',');
		$('#Fenbianlv_data_box input[type="checkbox"][class="data_item"]').each(function(){
			if(jQuery.inArray($(this).val(), g_6)!==-1){
				$(this).prop('checked','checked');
			}else{
				$(this).removeProp('checked');
			}
			$(this).iCheck('update');
		});
	}
			
}
function reset_fun_sear(){
	$('#subsearch_val').val($('#subsearch_val').prop('defaultValue'));
	$('#AllTheseWords_val').val('');
	$('#ExactWords_val').val('');
	$('#AnyTheseWords_val').val('');
	$('#NoneTheseWords_val').val('');
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
	$('#SOURCE_data_box input[type="checkbox"]').on('ifChanged',function(){
		var che_=[];
		$('#SOURCE_data_box input[type="checkbox"]:checked').each(function(){
			che_.push($(this).val());															   
		});
		if(che_.length>0){
			seach_check_LL['SOURCE_'] = che_.join(',');
			search_fun_LL(1);
		}else{
			seach_check_LL['SOURCE_'] ='';
			cusmot_alert_fun('Please select at least one');
		}
	});
	$('#startTime_val, #endTime_val').click(function(){
		seach_check_LL['DATE_'] ='';
		$('#Date_data_box input[name="Date_radio"][class="data_select"]').iCheck('check');			
	});
	$('#Date_data_box input[name="Date_radio"]').on('ifChecked ifUnchecked',function(e_){
		var inp_data_all_ = $('#Date_data_box input[name="Date_radio"][class="data_all"]');
		var inp_data_select = $('#Date_data_box input[name="Date_radio"][class="data_select"]');
		var inp_data_items_ = $('#Date_data_box input[name="Date_radio"][class="data_item"]');
		if($(this).hasClass('data_select')){
			seach_check_LL['DATE_'] ='';
			if(e_.type == 'ifChecked'){
				inp_data_all_.removeProp('checked').iCheck('update').iCheck('enable');
				inp_data_items_.removeProp('checked').iCheck('update');					
			}else{
				if($('#Date_data_box input[name="Date_radio"][class="data_item"]:checked').length==0){
					inp_data_all_.iCheck('check');
				}
			}
		}else{	
			if($(this).hasClass('data_all')){//ç¹å»å¨é					
				if(e_.type == 'ifChecked'){
					inp_data_items_.prop('checked','checked');
				}else{
					inp_data_items_.removeProp('checked');
				}
				inp_data_items_.iCheck('update');
			}
			var che_1=[];
			$('#Date_data_box input[name="Date_radio"][class="data_item"]:checked').each(function(){
				che_1.push($(this).val());															   
			});
			if(che_1.length>0){
				seach_check_LL['DATE_'] = che_1.join(',');
				$('#startTime_val').val('');
				$('#endTime_val').val('');
				seach_check_LL['startTime_'] ='';
				seach_check_LL['endTime_'] ='';
				search_fun_LL(1);
				if(che_1.length == inp_data_items_.length){
					inp_data_all_.prop('checked','checked').iCheck('update').iCheck('disable');
				}else{
					inp_data_all_.removeProp('checked').iCheck('update').iCheck('enable');
				}
			}else{
				seach_check_LL['DATE_'] ='';
				//inp_data_all_.removeProp('checked').iCheck('update');
				cusmot_alert_fun('Please select at least one Date');
			}
			if(inp_data_select.prop('checked')){
				inp_data_select.removeProp('checked').iCheck('update');
			}
		}
	});
	$('#Locations_data_box input[type="checkbox"]').on('ifChecked ifUnchecked',function(e_){
		var inp_data_all_ = $('#Locations_data_box input[type="checkbox"][class="data_all"]');
		var inp_data_items_ = $('#Locations_data_box input[type="checkbox"][class="data_item"]');	
		if($(this).hasClass('data_all')){//ç¹å»å¨é					
			if(e_.type == 'ifChecked'){
				inp_data_items_.prop('checked','checked');
			}else{
				inp_data_items_.removeProp('checked');
			}
			inp_data_items_.iCheck('update');
		}
		var che_1=[];
		$('#Locations_data_box input[type="checkbox"][class="data_item"]:checked').each(function(){
			che_1.push($(this).val());															   
		});
		if(che_1.length>0){
			seach_check_LL['LOCATIONS_'] = che_1.join(',');
			$('#startTime_val').val('');
			$('#endTime_val').val('');
			seach_check_LL['startTime_'] ='';
			seach_check_LL['endTime_'] ='';
			search_fun_LL(1);
			if(che_1.length == inp_data_items_.length){
				inp_data_all_.prop('checked','checked').iCheck('update').iCheck('disable');
			}else{
				inp_data_all_.removeProp('checked').iCheck('update').iCheck('enable');
			}
		}else{
			seach_check_LL['LOCATIONS_'] ='';
			//inp_data_all_.removeProp('checked').iCheck('update');
			cusmot_alert_fun('Please select at least one Locations');
		}
	});
	$('#Category_data_box input[type="checkbox"]').on('ifChecked ifUnchecked',function(e_){
		var inp_data_all_ = $('#Category_data_box input[type="checkbox"][class="data_all"]');
		var inp_data_items_ = $('#Category_data_box input[type="checkbox"][class="data_item"]');	
		if($(this).hasClass('data_all')){//ç¹å»å¨é					
			if(e_.type == 'ifChecked'){
				inp_data_items_.prop('checked','checked');
			}else{
				inp_data_items_.removeProp('checked');
			}
			inp_data_items_.iCheck('update');
		}
		var che_1=[];
		$('#Category_data_box input[type="checkbox"][class="data_item"]:checked').each(function(){
			che_1.push($(this).val());															   
		});
		if(che_1.length>0){
			seach_check_LL['CATEGORY_'] = che_1.join(',');
			$('#startTime_val').val('');
			$('#endTime_val').val('');
			seach_check_LL['startTime_'] ='';
			seach_check_LL['endTime_'] ='';
			search_fun_LL(1);
			if(che_1.length == inp_data_items_.length){
				inp_data_all_.prop('checked','checked').iCheck('update').iCheck('disable');
			}else{
				inp_data_all_.removeProp('checked').iCheck('update').iCheck('enable');
			}
		}else{
			seach_check_LL['CATEGORY_'] ='';
			cusmot_alert_fun('Please select at least one Locations');
		}
	});
	$('#Resolution_data_box input[type="checkbox"]').on('ifChanged',function(){
		var che_=[];
		$('#Resolution_data_box input[type="checkbox"]:checked').each(function(){
			che_.push($(this).val());															   
		});
		if(che_.length>0){
			seach_check_LL['RESOLUTION_'] = che_.join(',');
			search_fun_LL(1);
		}else{
			seach_check_LL['RESOLUTION_'] ='';
			cusmot_alert_fun('Please select at least one');
		}
	});
	$('#Fenbianlv_data_box input[type="checkbox"]').on('ifChanged',function(){
		var che_=[];
		$('#Fenbianlv_data_box input[type="checkbox"]:checked').each(function(){
			che_.push($(this).val());															   
		});
		if(che_.length>0){
			seach_check_LL['FENBIANLV_'] = che_.join(',');
			search_fun_LL(1);
		}else{
			seach_check_LL['FENBIANLV_'] ='';
			cusmot_alert_fun('Please select at least one');
		}
	});
	$('#subsearch_btn').click(function(e){ //ä¸»æç´¢æé® -æ®éæç´¢
		var ss = $("#custom_sel_val").val();
		if($('#custom_sel_val').val()=='ord11111'){			
			window.location.href="/news/latest.shtml#!keyword="+encodeURIComponent($.trim((($('#subsearch_val').val()==$('#subsearch_val').prop('defaultValue'))?'':$('#subsearch_val').val())));
		}else if($('#custom_sel_val').val()=='ord33333'){
			window.location.href="/exchange/allExchange.shtml#!keyword="+encodeURIComponent($.trim((($('#subsearch_val').val()==$('#subsearch_val').prop('defaultValue'))?'':$('#subsearch_val').val())));
		}else if($('#custom_sel_val').val()=='ord44444'){
			window.location.href="/archive/allCollections.shtml#!keyword="+encodeURIComponent($.trim((($('#subsearch_val').val()==$('#subsearch_val').prop('defaultValue'))?'':$('#subsearch_val').val())));
		}else{
			seach_check_LL['keyword_'] = encodeURIComponent($.trim((($('#subsearch_val').val()==$('#subsearch_val').prop('defaultValue'))?'':$('#subsearch_val').val())));
			seach_check_LL['startTime_'] = $.trim($('#startTime_val').val());
			seach_check_LL['endTime_'] = $.trim($('#endTime_val').val());
			search_fun_LL(1);
		}
		//=========add wjj æç´¢è®°å½
		var searchType = 'archive';
		if(ss=='ord22222'){
			searchType = 'archive';
		}else if(ss=='ord11111'){
			searchType = 'News';
		}else if(ss=='ord33333'){
			searchType = 'exchange';
		}else{
			searchType = 'collection';
		}
		$.getJSON('https://secure.cctvplus.com/interface/searchRecord.do?callback=?',{"keyword":$.trim($('#subsearch_val').val()),"type":searchType},function(d_){
		});
		//=========
	});
	$('#keyword_submit_morebtn').click(function(){ //é«çº§æç´¢æé®	
		seach_check_LL['startTime_'] = $.trim($('#startTime_val').val());
		seach_check_LL['endTime_'] = $.trim($('#endTime_val').val());
		var AllTheseWords_ = $.trim($('#AllTheseWords_val').val());
		var ExactWords_ = $.trim($('#ExactWords_val').val());
		var AnyTheseWords_ = $.trim($('#AnyTheseWords_val').val());
		var NoneTheseWords_ = $.trim($('#NoneTheseWords_val').val());
		
		if(AllTheseWords_){
			var AllTheseWords_array = AllTheseWords_.split(' '), AllTheseWords_array_ =[], AllTheseWords_val_ ='';
			$.each(AllTheseWords_array,function(i_1,n_1){
				if($.trim(n_1)){AllTheseWords_array_.push($.trim(n_1));}
			});
			if(AllTheseWords_array_.length>0){
				AllTheseWords_val_ = AllTheseWords_array_.join(' AND ');
			}			
		}
		if(AnyTheseWords_){
			var AnyTheseWords_array = AnyTheseWords_.split(' '), AnyTheseWords_array_ =[], AnyTheseWords_val_ ='';
			$.each(AnyTheseWords_array,function(i_1,n_1){
				if($.trim(n_1)){AnyTheseWords_array_.push($.trim(n_1));}
			});
			if(AnyTheseWords_array_.length>0){
				AnyTheseWords_val_ = AnyTheseWords_array_.join(' OR ');
			}
		}
		if(NoneTheseWords_){
			var NoneTheseWords_array = NoneTheseWords_.split(' '), NoneTheseWords_array_ =[], NoneTheseWords_val_ ='';
			$.each(NoneTheseWords_array,function(i_1,n_1){
				if($.trim(n_1)){NoneTheseWords_array_.push('AND NOT '+$.trim(n_1));}
			});
			if(NoneTheseWords_array_.length>0){
				NoneTheseWords_val_ = NoneTheseWords_array_.join(' ');
			}
		}
		var keyw_ ='';
		if(AllTheseWords_val_){keyw_ += AllTheseWords_val_; if(ExactWords_ || AnyTheseWords_val_){keyw_ += " AND ";}}		
		if(ExactWords_){keyw_ += '"'+ExactWords_+'"'; if(AnyTheseWords_val_){keyw_ += " AND "}}
		if(AnyTheseWords_val_){keyw_ += AnyTheseWords_val_;}
		if(NoneTheseWords_val_){keyw_ += ' '+NoneTheseWords_val_;}
		seach_check_LL['keyword_'] = encodeURIComponent(keyw_);
		//$('#subsearch_val').val(keyw_);
		$('#more_sear_btn').click();
		search_fun_LL(1);
	});
	var key_word_uri_ = decodeURIComponent(Request_url_fun('keyword'));
	seach_check_LL['keyword_']=($.trim(key_word_uri_).length>0)?key_word_uri_:seach_check_LL['keyword_'];
	var hash_=decodeURIComponent(window.location.hash);
	if(hash_&&(hash_.indexOf("sq_start=")>-1) && (hash_.indexOf("&sq_end=")>-1)){		
		var search_str = hash_.substring(hash_.indexOf("sq_start=")+9,hash_.indexOf("&sq_end="));
		if(search_str){
			seach_check_LL = JSON.parse(search_str);
		}
	}else{
		if(readCookie_LL('search_code_LL')){
			seach_check_LL = JSON.parse(readCookie_LL('search_code_LL')); 
			seach_check_LL['keyword_']=($.trim(key_word_uri_).length>0)?key_word_uri_:seach_check_LL['keyword_'];
		}
	}		
	init_search_fun();
	search_fun_LL(1);

	$(window).hashchange( function(){
		var hash_=decodeURIComponent(window.location.hash);
		if(hash_&&(hash_.indexOf("sq_start=")>-1) && (hash_.indexOf("&sq_end=")>-1)){		
			var search_str = hash_.substring(hash_.indexOf("sq_start=")+9,hash_.indexOf("&sq_end="));
			if(search_str){
				seach_check_LL = JSON.parse(search_str);
			}
		}else{
			if(readCookie_LL('search_code_LL')){seach_check_LL = JSON.parse(readCookie_LL('search_code_LL'));}
		} 
		init_search_fun();
		search_fun_LL(1);
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
	
	
	
	//初始化大小屏问题
	
	
	function _facebook(url){
		window.open (url,'','height=300,width=700,top=100,left=400,toolbar=no,menubar=no,scrollbars=no, resizable=no,location=no, status=no');
		var mid = $("#mid").val();
		var dcid = $("#dcid").val();
		$.getJSON('https://secure.cctvplus.com/interface/topicBrowseRecord.do?callback=?',{"MID":mid,"DCID":dcid,"browse_source":document.referrer,"type":"News"},function(d_){
		});
		$.getJSON('https://secure.cctvplus.com/interface/shareRecord.do?callback=?',{"MID":mid,"DCID":dcid,"shareType":"2","type":"News"},function(d_){
		});
	}
	function _twitter(url){
		window.open (url,'','height=430,width=700,top=100,left=400,toolbar=no,menubar=no,scrollbars=no, resizable=no,location=no, status=no');
		var mid = $("#mid").val();
		var dcid = $("#dcid").val();
		$.getJSON('https://secure.cctvplus.com/interface/topicBrowseRecord.do?callback=?',{"MID":mid,"DCID":dcid,"browse_source":document.referrer,"type":"News"},function(d_){
		});
		$.getJSON('https://secure.cctvplus.com/interface/shareRecord.do?callback=?',{"MID":mid,"DCID":dcid,"shareType":"1","type":"News"},function(d_){
		});
	}
	function _linkedin(url){
		window.open (url,'','height=550,width=750,top=100,left=400,toolbar=no,menubar=no,scrollbars=no, resizable=no,location=no, status=no');
		var mid = $("#mid").val();
		var dcid = $("#dcid").val();
		$.getJSON('https://secure.cctvplus.com/interface/topicBrowseRecord.do?callback=?',{"MID":mid,"DCID":dcid,"browse_source":document.referrer,"type":"News"},function(d_){
		});
		$.getJSON('https://secure.cctvplus.com/interface/shareRecord.do?callback=?',{"MID":mid,"DCID":dcid,"shareType":"3","type":"News"},function(d_){
		});
	}
});