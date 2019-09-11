$(function(){
		
		var seach_check_LL ={"keyword_":"","startTime_":"","endTime_":"","RESOLUTION_":"1,2","FENBIANLV_":"1,2","SOURCE_":"1","DATE_":"0,1,2,3","LOCATIONS_":"data_all,C01,150,002,B01,142,021,419,009,A01","CATEGORY_":"1000000,2000000,3000000,4000000,5000000,6000000,7000000,8000000,9000000,10000000,11000000,12000000,13000000,14000000,15000000,16000000,17000000,90000000"};
		var key_word_uri_ = decodeURIComponent(Request_url_fun('keyword'));
		seach_check_LL['keyword_']=($.trim(key_word_uri_).length>0)?key_word_uri_:seach_check_LL['keyword_'];
		var hash_=decodeURIComponent(window.location.hash);
		var seach_check_LL ={"keyword_":"","startTime_":"","endTime_":"","RESOLUTION_":"1,2","FENBIANLV_":"1,2","SOURCE_":"1","DATE_":"0,1,2,3","LOCATIONS_":"data_all,C01,150,002,B01,142,021,419,009,A01","CATEGORY_":"1000000,2000000,3000000,4000000,5000000,6000000,7000000,8000000,9000000,10000000,11000000,12000000,13000000,14000000,15000000,16000000,17000000,90000000"};
		seach_check_LL['keyword_']=($.trim(key_word_uri_).length>0)?key_word_uri_:seach_check_LL['keyword_'];
		var is_submitting=0;
		var curpage_dcid_ ='',
			curpage_mid_ ='';
		
		if(hash_&&(hash_.indexOf("sq_start=")>-1) && (hash_.indexOf("&sq_end=")>-1)){		
			var search_str = hash_.substring(hash_.indexOf("sq_start=")+9,hash_.indexOf("&sq_end="));
			if(search_str){
				seach_check_LL = JSON.parse(search_str);
				seach_check_LL = JSON.parse(search_str);
			}
		}else{
			if(readCookie_LL('search_code_LL')){
				seach_check_LL = JSON.parse(readCookie_LL('search_code_LL')); 
				seach_check_LL['keyword_']=($.trim(key_word_uri_).length>0)?key_word_uri_:seach_check_LL['keyword_'];
				seach_check_LL = JSON.parse(readCookie_LL('search_code_LL')); 
				seach_check_LL['keyword_']=($.trim(key_word_uri_).length>0)?key_word_uri_:seach_check_LL['keyword_'];
			}
		}

		$('#navmain_2015box_6').addClass('cur');
		//QM--add new 0906
		checkType();
		init_search_fun();
//		search_load_fun(1);
		search_fun_LL(1);
		cusmot_select_fun('order_sel_box');
		
		function search_fun_LL(curpage){
			var search_list_box = $("#search_list_box");
			var find_num_val_ = $('#find_num_val');
//			if(!check_submit()){ return false;};
			writeCookie_search();
//			window.location.hash=encodeURIComponent("!sq_start="+JSON.stringify(seach_check_LL)+"&sq_end=");
			var cell_num = Math.floor((search_list_box.width()+20)/312);
			if(cell_num>5){cell_num=5;}
			if(cell_num<3){cell_num=3;}
			var pagesize = cell_num*3;
			search_list_box.html('<p style="text-align:center; padding:10px;">Loading...</p>');
			find_num_val_.text('');
			$.getJSON('https://secure.cctvplus.com/searchInterface/archive.do?callback=?',{'pageSize':pagesize,'pageNo':curpage,'searchTitle':encodeURIComponent(decodeURIComponent(seach_check_LL.keyword_)),'isstime':seach_check_LL.DATE_,'searchStartTime':seach_check_LL.startTime_,'searchEndTime':seach_check_LL.endTime_,'CATEGORY':seach_check_LL.CATEGORY_,'LOCATIONS':seach_check_LL.LOCATIONS_,'RESOLUTION':seach_check_LL.RESOLUTION_,'FENBIANLV':seach_check_LL.FENBIANLV_,'SOURCE':seach_check_LL.SOURCE_},function(data){
			//$.getJSON('http://172.20.1.9:8890/searchInterface/archive.do?callback=?',{'pageSize':pagesize,'pageNo':curpage,'searchTitle':encodeURIComponent(decodeURIComponent(seach_check_LL.keyword_)),'isstime':seach_check_LL.DATE_,'searchStartTime':seach_check_LL.startTime_,'searchEndTime':seach_check_LL.endTime_,'CATEGORY':seach_check_LL.CATEGORY_,'LOCATIONS':seach_check_LL.LOCATIONS_,'RESOLUTION':seach_check_LL.RESOLUTION_,'FENBIANLV':seach_check_LL.FENBIANLV_,'SOURCE':seach_check_LL.SOURCE_},function(data){	
				console.log(data)
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
					html_arr.push('<div class="img_box"><a onclick="alink_detail(this)" target="_blank" href="',lis[i].detailBuyPath,'"><img src="',lis[i].spic,'" height="" width="100%" /></a></div>');
					html_arr.push('<div class="text_box">');
					html_arr.push('<h3',(lis[i].language==3?' dir="rtl" style="text-align:right;"':''),'><a onclick="alink_detail(this)" target="_blank" href="',lis[i].detailBuyPath,'">',lis[i].pubtitle,'</a></h3>');
					html_arr.push('<p class="summary">',lis[i].summary,'</p>');
					html_arr.push('<ul><li class="listCity">Hong Kong,China</li></ul>');
					html_arr.push('<time>',lis[i].scriptIssTime,'</time>');
//					html_arr.push('<span class="file_id">ID:',lis[i].dcid,'</span>');
					html_arr.push('<span class="buy_btn" dcid="',lis[i].dcid,'" mid="',lis[i].mid,'"></span>');
					html_arr.push('</div>');
					html_arr.push('</div></li>');
				}
				html_arr.push('</ul>');
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
				}else{//显示前四页
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
				
				search_list_box.html(html_arr.join(""));	 
				$("#search_list_pagebox").html(textArr.join(""));
			});
		}
		
		
		function init_search_fun(){
//			$('#subsearch_val').val(decodeURIComponent(seach_check_LL['keyword_']));
//			$('#subsearch_val_s').val(decodeURIComponent(seach_check_LL['keyword_']));
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
			
			if(seach_check_LL['DATE_']){
				var g_2_ = seach_check_LL['DATE_'].split(',');
				$('#ser_data_box input[type="checkbox"][class="data_item"]').each(function(){
					if(jQuery.inArray($(this).val(), g_2_)!==-1){
						$(this).prop('checked','checked');
					}else{
						$(this).removeProp('checked');
					}
					$(this).iCheck('update');
				});
				if($('#ser_data_box input[type="checkbox"][class="data_item"]').not(':checked').length==0){
					$('#ser_data_box input[type="checkbox"][class="data_all"]').prop('checked','checked').iCheck('update').iCheck('disable');
				}
				$('#startTime_val, #endTime_val').val('');
			}
			if(seach_check_LL['startTime_'] && seach_check_LL['endTime_']){			
				$('#startTime_val_').val(seach_check_LL['startTime_']); 
				$('#endTime_val_').val(seach_check_LL['endTime_']);
				$('#ser_data_box input[name="date_radio"][class="data_select"]').iCheck('check');
			}
			if(seach_check_LL['LOCATIONS_']){
				var g_3 = seach_check_LL['LOCATIONS_'].split(',');
				$('#ser_location_box input[type="checkbox"][class="data_item"]').each(function(){
					if(jQuery.inArray($(this).val(), g_3)!==-1){
						$(this).prop('checked','checked');
					}else{
						$(this).removeProp('checked');
					}
					$(this).iCheck('update');
				});
				if($('#ser_location_box input[type="checkbox"][class="data_item"]').not(':checked').length==0){
					$('#ser_location_box input[type="checkbox"][class="data_all"]').prop('checked','checked').iCheck('update').iCheck('disable');
				}
			}
			if(seach_check_LL['CATEGORY_']){
				var g_4 = seach_check_LL['CATEGORY_'].split(',');
				$('#ser_category_box input[type="checkbox"][class="data_item"]').each(function(){
					if(jQuery.inArray($(this).val(), g_4)!==-1){
						$(this).prop('checked','checked');
					}else{
						$(this).removeProp('checked');
					}
					$(this).iCheck('update');
				});
				if($('#ser_category_box input[type="checkbox"][class="data_item"]').not(':checked').length==0){
					$('#ser_category_box input[type="checkbox"][class="data_all"]').prop('checked','checked').iCheck('update').iCheck('disable');
				}
			}
			
			
					
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
		
		function reset_fun_sear(){
			$('#subsearch_val').val($('#subsearch_val').prop('defaultValue'));
			$('#AllTheseWords_val').val('');
			$('#ExactWords_val').val('');
			$('#AnyTheseWords_val').val('');
			$('#NoneTheseWords_val').val('');
		}
		
		function writeCookie_search(){
			writeCookie_LL('search_code_LL',JSON.stringify(seach_check_LL),24);
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
		$('#startTime_val').click(function(){
			seach_check_LL['DATE_'] ='';
			$('#Date_data_box input[name="Date_radio"][class="data_select"]').iCheck('check');
			WdatePicker({maxDate:(($('#endTime_val').val()==$('#endTime_val').attr('default'))?'%y-%M-%d':'#F{$dp.$D(\'endTime_val\')||\'%y-%M-%d\'}'),lang:'en',onpicked:function(dp){change_time_check();}});
		});
		
		$('#endTime_val').click(function(){
			seach_check_LL['DATE_'] ='';
			$('#Date_data_box input[name="Date_radio"][class="data_select"]').iCheck('check');
			WdatePicker({minDate:($('#startTime_val').val()==$('#startTime_val').attr('default'))?'1970-01-01':'#F{$dp.$D(\'startTime_val\')}',maxDate:'%y-%M-%d',lang:'en',onpicked:function(dp){change_time_check();}});
		})
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
//					cusmot_alert_fun('Please select at least one Date');
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
		
		$('#add_to_order_win').on('ifChecked',function(e_){				
			$('#neworder_val_box').hide();
			$('#order_sel_box').show();
		});
		$('#cre_new_order_win').on('ifChecked',function(e_){				
			$('#order_sel_box').hide();
			$('#neworder_val_box').show();
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
		
		$('.search_item_left .ser_htit').click(function(){
			$(this).parent('.search_item_left').toggleClass('opened');
		});
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
		
			$.getJSON('https://secure.cctvplus.com/interface/selOrder.do?callback=?','ORDER_STATE=0',function(d){
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
							ord_.push('<li class="option" ord_id="',list[i].orderID,'"  checked="checked" >',list[i].ordername,'</li>');
						}else{
							ord_.push('<li class="option" ord_id="',list[i].orderID,'" >',list[i].ordername,'</li>');  
						}
						
					}
					$.colorbox({innerWidth:"580px", opacity:'0.6', overlayClose:false, inline:true, href:'#creat_order_win'});
					$("#order_sel_box .custom_sel_list ").html(ord_.join(''));
				}else if(d && d.result==-1){
					login_bar_fun();
				}
			});		
		});
		
		$('#more_sear_btn').click(function(){
			var th_ = $(this);
			if(th_.hasClass('cur')){
				th_.removeClass('cur');
				$('#more_sear_2015').hide();
			}else{
				th_.addClass('cur');
				$('#more_sear_2015').show();
			}
		});
		
		$("#addArchive").click(function(){
			if(is_submitting==0){
				is_submitting=1;
				var dcid = curpage_dcid_;
				var mid = curpage_mid_;
				var msg_ = $('#order_win_msg');	
				if(!dcid || !mid){
					msg_.show().html('date error');
					is_submitting=0;
					return;
				}
				
				if($("#add_to_order_win").is(':checked')){
					var order = $("#orderID").val();
					if(!order){
						msg_.show().html('please check one');
						is_submitting=0;
						return;
					}
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
					if(!inp){
						msg_.show().html('name not null');
						is_submitting=0;
						return;
					}
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
								//$('#order_win_msg').show().html('Add order to success');
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
		
		//移动端筛选条件
		$('#ser_data_box input[name="date_radio"]').on('ifChecked ifUnchecked',function(e_){
			var input_data_all_ = $('#ser_data_box input[name="date_radio"][class="data_all"]');
			var input_data_select = $('#ser_data_box input[name="date_radio"][class="data_select"]');
			var input_data_items_ = $('#ser_data_box input[name="date_radio"][class="data_item"]');
			if($(this).hasClass('data_select')){
				seach_check_LL['DATE_'] ='';
				if(e_.type == 'ifChecked'){
					input_data_all_.removeProp('checked').iCheck('update').iCheck('enable');
					input_data_items_.removeProp('checked').iCheck('update');					
				}else{
					if($('#ser_data_box input[name="date_radio"][class="data_item"]:checked').length==0){
						input_data_all_.iCheck('check');
					}
				}
			}else{	
				if($(this).hasClass('data_all')){//ç¹å»å¨é					
					if(e_.type == 'ifChecked'){
						input_data_items_.prop('checked','checked');
					}else{
						input_data_items_.removeProp('checked');
					}
					input_data_items_.iCheck('update');
				}
				var che_1_=[];
				$('#ser_data_box input[name="date_radio"][class="data_item"]:checked').each(function(){
					che_1_.push($(this).val());															   
				});
				
				if(che_1_.length>0){
					seach_check_LL['DATE_'] = che_1_.join(',');
					$('#startTime_val_').val('');
					$('#endTime_val_').val('');
					seach_check_LL['startTime_'] ='';
					seach_check_LL['endTime_'] ='';
					search_load_fun(1);
					if(che_1_.length == input_data_items_.length){
						input_data_all_.prop('checked','checked').iCheck('update').iCheck('disable');
					}else{
						input_data_all_.removeProp('checked').iCheck('update').iCheck('enable');
					}
				}else{
					seach_check_LL['DATE_'] ='';
					//inp_data_all_.removeProp('checked').iCheck('update');
//					cusmot_alert_fun('Please select at least one Date');
				}
				if(input_data_select.prop('checked')){
					input_data_select.removeProp('checked').iCheck('update');
				}
			}
		});
		$('#ser_location_box input[type="checkbox"]').on('ifChecked ifUnchecked',function(e_){
			var input_data_all_ = $('#ser_location_box input[type="checkbox"][class="data_all"]');
			var input_data_items_ = $('#ser_location_box input[type="checkbox"][class="data_item"]');	
			if($(this).hasClass('data_all')){//ç¹å»å¨é					
				if(e_.type == 'ifChecked'){
					input_data_items_.prop('checked','checked');
				}else{
					input_data_items_.removeProp('checked');
				}
				input_data_items_.iCheck('update');
			}
			var che_1_=[];
			$('#ser_location_box input[type="checkbox"][class="data_item"]:checked').each(function(){
				che_1_.push($(this).val());															   
			});
			
			
			if(che_1_.length>0){
				seach_check_LL['LOCATIONS_'] = che_1_.join(',');
				$('#startTime_val_').val('');
				$('#endTime_val_').val('');
				seach_check_LL['startTime_'] ='';
				seach_check_LL['endTime_'] ='';
				search_load_fun(1);
				if(che_1_.length == input_data_items_.length){
					input_data_all_.prop('checked','checked').iCheck('update').iCheck('disable');
				}else{
					input_data_all_.removeProp('checked').iCheck('update').iCheck('enable');
				}
			}else{
				seach_check_LL['LOCATIONS_'] ='';
				//inp_data_all_.removeProp('checked').iCheck('update');
//				cusmot_alert_fun('Please select at least one Locations');
			}
		});
		$('#ser_category_box input[type="checkbox"]').on('ifChecked ifUnchecked',function(e_){
			var input_data_all_ = $('#ser_category_box input[type="checkbox"][class="data_all"]');
			var input_data_items_ = $('#ser_category_box input[type="checkbox"][class="data_item"]');	
			if($(this).hasClass('data_all')){//ç¹å»å¨é					
				if(e_.type == 'ifChecked'){
					input_data_items_.prop('checked','checked');
				}else{
					input_data_items_.removeProp('checked');
				}
				input_data_items_.iCheck('update');
			}
			var che_1_=[];
			$('#ser_category_box input[type="checkbox"][class="data_item"]:checked').each(function(){
				che_1_.push($(this).val());															   
			});
			
			if(che_1_.length>0){
				seach_check_LL['CATEGORY_'] = che_1_.join(',');
				$('#startTime_val_').val('');
				$('#endTime_val_').val('');
				seach_check_LL['startTime_'] ='';
				seach_check_LL['endTime_'] ='';
				search_load_fun(1);
				if(che_1_.length == input_data_items_.length){
					input_data_all_.prop('checked','checked').iCheck('update').iCheck('disable');
				}else{
					input_data_all_.removeProp('checked').iCheck('update').iCheck('enable');
				}
			}else{
				seach_check_LL['CATEGORY_'] ='';
				input_data_all_.removeProp('checked').iCheck('update');
//				cusmot_alert_fun('Please select at least one Locations');
			}
		});
		
		
		//pc数据翻页
		$("#search_list_pagebox").on('click','.cus_page_btns>a',function(){
			search_fun_LL($(this).attr('data-page'));
		})
		
		
	});