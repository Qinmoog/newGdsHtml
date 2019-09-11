$(function(){
	
	var STR;
	var target;
	var value;
	var Audio_;
	var id;
	var dcidone;
	var val;
	var dcid;
	var startDay = getCookie("startDay");
	var endDay = getCookie("endDay");
	var REDindex;
	var user;
	var dcidMessage;
	var day = getCookie("day");
	var date = new Date();
//	var mindate = getDateStr(date);
	var L = getDateStr1(date);
	var state = 'All';
	var seach_check_LL = {
		"keyword_": "",
		"DATE_": day,
		"state_": state
	};
	var count_num_ = 1;
	
	
	if(day == '') {
		day = 0;
	}
	if(day == 5) {
		$("#startTime_val").val(startDay);
		$("#endTime_val").val(endDay);
		search_fun_LL_(1);
		$(".iradio_square").removeClass("checked");
		$(".Select .iradio_square").addClass("checked");
		if(seach_check_LL['state_']) {
			$('#Status_data_box li input[class="status_item"][value="' + seach_check_LL["state_"] + '"]').prop('checked', 'checked');
			$('#Status_data_box li input[class="status_item"]').iCheck('update');
		}

	} else if(day == undefined) {
		seach_check_LL.DATE_ = 0;
		search_fun_LL(1);
		setCookie("day", 0);
		setCookie('state', 'All');
		//seach_check_LL.DATE_ = 0;
	} else {
		search_fun_LL(1);
	}
	
	$(".date_box input").val("");
	$("#footer").css({
		bottom: "-1"
	});
	$("#UL li .iradio_square").eq(0).addClass("checked");
	$('#navmain_2015box_5').addClass('cur');
	var key_word_uri_ = decodeURIComponent(Request_url_fun('keyword'));
	seach_check_LL['keyword_'] = ($.trim(key_word_uri_).length > 0) ? key_word_uri_ : seach_check_LL['keyword_'];
	var hash_ = '';
	
	//QM--add new 0906
	checkType();
	
	init_search_fun();
//	search_load_fun(1);
//	search_fun_LL(1);
	cusmot_select_fun('subsearch_sel_box');
	cusmot_select_fun('uscenter_sel_box');
	init_check_status();
	
	//单选分页
	function search_fun_LL(curpage) { //return false;										
		var search_list_box = $(".live_list_box"),
			search_load_box = $('.live_load_box'),
			search_list_pagebox = $('.cus_page_btns');
		var pagesize = 10; //每页展示条数
		search_load_box.show();
		search_load_box.find('td').html("Loading...");
		$(".datail_success_box").hide();
		$(".datail_error_box").show().html('Loading...');
		search_list_pagebox.html('');
		
		$.getJSON('https://secure.cctvplus.com/livenotice/QueryGuideListByParams?', {
//					$.getJSON('http://172.20.1.9:8890/livenotice/QueryGuideListByParams?', {
			'Time': seach_check_LL['DATE_'],
			'PageSize' : pagesize,
			'PageNo' : curpage
		}, function(data) {
			setCookie('day', seach_check_LL.DATE_)
			setCookie('state', seach_check_LL.state_)
			var lis = data.varList;
			if(lis.length == 0 || lis.PMGGUID == '') {
				search_load_box.show();
				search_load_box.find('td').html("No data");
				$(".datail_success_box").hide();
				$(".datail_error_box").show().html('No data');
				return;
			}
			search_load_box.hide();
//			var window_width = $(window).width(),
//				w_hei = $(window).height();
			var textArr = [];
			var itemsum = data.pageCount;
			pagesum = Math.ceil(itemsum / pagesize);					

			var str = '';
			
				for(var i = 0; i < lis.length; i++) {
					str += '<tr class="clearfix" dcid="' + lis[i].DCID + '">' +
							'<td><span class="foldbtn">+</span><p>' + lis[i].TITLE + '</p></td>' +
							'<td><p>' + lis[i].LIVETIME.split('-').reverse().join('/') + ' ' + lis[i].STARTTIME + '</p></td>' +
							'<td><p>' + lis[i].ENDDATE.split('-').reverse().join('/') + ' ' + lis[i].ENDTIME + '</p></td>';
					str += '<td class="status_"><p>Completed</p></td></tr>';
					
					//取详情数据
				str += '<tr class="foldDetail">'+
							'<td colspan="4">'+
								'<p class="foldlist">'+
									'<span class="fold_cate">Start Time:</span>'+
									'<span>'+lis[i].LIVETIME.split('-').reverse().join('/')+' '+lis[i].STARTTIME+'</span>'+
								'</p>'+
								'<p class="foldlist">'+
									'<span class="fold_cate">End Time:</span>'+
									'<span>'+lis[i].ENDDATE.split('-').reverse().join('/')+' '+lis[i].ENDTIME+'</span>'+
								'</p>'+
								'<p class="foldlist">'+
									'<span class="fold_cate">Slug:</span>'+
									'<span>'+lis[i].TITLE+'</span>'+
								'</p>'+
								'<p class="foldlist">'+
									'<span class="fold_cate">Event:</span>'+
									'<span>'+lis[i].REMARKS+'</span>'+
								'</p>'+
								'<p class="foldlist">'+
									'<span class="fold_cate">Location:</span>'+
									'<span>'+lis[i].LOCATION+'</span>'+
								'</p>'+
								'<p class="foldlist">'+
									'<span class="fold_cate">Audio/Translation:</span>'+
									'<span>Natsound</span>'+
								'</p>'+
								'<p class="foldlist">'+
									'<span class="fold_cate">Source:</span>'+
									'<span>'+lis[i].SOURCE+'</span>'+
								'</p>'+
								'<p class="foldlist">'+
									'<span class="fold_cate">Restrictions:</span>'+
									'<span>'+lis[i].RESTRICTIONS+'</span>'+
								'</p>'+
								'<p class="foldlist">'+
									'<span class="fold_cate">Channel:</span>'+
									'<span>'+lis[i].CHANNEL.slice(7)+'</span>'+
								'</p>'+
								'<p class="scribebtn" onclick="btn(this)"><span>Subscribe</span></p>'+
							'</td>'+
						'</tr>';
					
				}

			if(curpage > 1) {
				textArr.push('<a onselectstart="return false;" data-page="',curpage-1,'" class="prev">Prev</a>');
			} else {
				textArr.push('<a style="cursor:default;" onselectstart="return false;" class="prev">Prev</a>');
			}
			var beginpage = beginpage = 1;
			function set_page_fun() {
				for(var i = beginpage; i <= endpage; i++) {
					if(i == curpage) {
						textArr.push('<a onselectstart="return false;" class="cur">', i, '</a>');
					} else {
						textArr.push('<a onselectstart="return false;" class="" data-page="',i,'">', i, '</a>');
					}
				}
			}
			if(pagesum <= 5) {
				beginpage = 1;
				endpage = pagesum;
				set_page_fun();
			} else { //如果显示最前面的五页
				if(curpage < 5 && curpage > 0) {
					beginpage = 1;
					endpage = 5;
					set_page_fun();
					textArr.push('<a onselectstart="return false;" style="cursor:default;" data-page="',endpage+1,'">...</a>');
					textArr.push('<a onselectstart="return false;" data-page="',pagesum,'">',pagesum,'</a>');
				} else if(curpage <= pagesum && curpage >= (pagesum - 4)) { //如果显示最后面的五页
					beginpage = pagesum - 4;
					endpage = pagesum;
					textArr.push('<a onselectstart="return false;" data-page="',1,'">1</a>');
					textArr.push('<a onselectstart="return false;" style="cursor:default;" data-page="',beginpage-1,'">...</a>');
					set_page_fun();
				} else {
					beginpage = curpage - 2;
					endpage=Number(curpage)+2;
					textArr.push('<a onselectstart="return false;" data-page="',1,'">1</a>');
					textArr.push('<a onselectstart="return false;" style="cursor:default;" data-page="',beginpage-1,'">...</a>');
					set_page_fun();
					textArr.push('<a onselectstart="return false;" style="cursor:default;" data-page="',endpage+1,'">...</a>');
					textArr.push('<a onselectstart="return false;" data-page="',pagesum,'">',pagesum,'</a>');
				}
			}

			if(curpage < pagesum) {
				textArr.push('<a onselectstart="return false;" data-page="',1+Number(curpage),'" class="next">Next</a>');
			} else {
				textArr.push('<a style="cursor:default;" onselectstart="return false;" class="next">Next</a>');
			}

			textArr.push('<div class="clear"></div></div>');
			search_list_box.html(str);
			search_list_pagebox.html(textArr.join(''));
		});

	}
	
	//日历分页
	function search_fun_LL_(curpage) { //return false;					
		$('.live_load_box').hide();
		var search_list_box = $(".live_list_box"),
			search_list_pagebox = $('.cus_page_btns');
		var pagesize = 10; //每页展示条数
		search_list_box.html('<p style="text-align:center;line-height:60px;">Loading...</p>');
		$(".datail_success_box").hide();
		$(".datail_error_box").show().html('Loading...');
		search_list_pagebox.html('');
		var start = getCookie("startDay"),
			end = getCookie("endDay");			

		if(seach_check_LL.state_ == '') {
			seach_check_LL.state_ = 0;
		}
		$.getJSON('https://secure.cctvplus.com/livenotice/QueryGuideListByParams?', {
//			$.getJSON('http://172.20.1.9:8890/livenotice/QueryGuideListByParams?', {
			'PageSize': pagesize,
			'PageNo': curpage,
			'startTime': start,
			'endTime': end,												
		}, function(data) {
			var lis = data.varList;
			if(lis.length == 0 || lis.PMGGUID == '') {
				search_list_box.html('<div class="clearfix" style="text-align:center;line-height:60px;">No data</div>');
				$(".datail_success_box").hide();
				$(".datail_error_box").show().html('No data');
				return;
			}

//			var window_width = $(window).width(),
//				w_hei = $(window).height();
			var itemsum = data.pageCount;
			var textArr = [];
			pagesum = Math.ceil(itemsum / pagesize);
			//var html_arr = [];
			var str = '';
			for(var i = 0; i < lis.length; i++) {
				str += '<tr class="clearfix" dcid="' + lis[i].DCID + '">' +
							'<td><span class="foldbtn">+</span><p>' + lis[i].TITLE + '</p></td>' +
							'<td><p>' + lis[i].LIVETIME.split('-').reverse().join('/') + ' ' + lis[i].STARTTIME + '</p></td>' +
							'<td><p>' + lis[i].ENDDATE.split('-').reverse().join('/') + ' ' + lis[i].ENDTIME + '</p></td>';
					str += '<td class="status_"><p>Completed</p></td></tr>';
				
				
				
				str += '<tr height="47" class="clearfix" dcid="' + lis[i].DCID + '">' ;
				if(lis[i].TITLE.length >= 24) {
					str += '<td class="txt_">' + lis[i].TITLE.slice(0, 24) + "..." + '</td>';
				} else {
					str += '<td class="txt_">' + lis[i].TITLE + '</td>';
				}

				str += '<td class="time_">' + lis[i].LIVETIME.split('-').reverse().join('/') +'&nbsp&nbsp' + lis[i].STARTTIME + '</td>';
				str += '<td class="time_">' + lis[i].ENDDATE.split('-').reverse().join('/') +'&nbsp&nbsp' + lis[i].ENDTIME + '</td>';
				str += '<td class="status_end">Completed</td></tr>';									

			}

			if(curpage > 1) {
				textArr.push('<a onselectstart="return false;" onclick="search_fun_LL_(', curpage - 1, ');" class="prev">Prev</a>');
			} else {
				textArr.push('<a style="cursor:default;" onselectstart="return false;" class="prev">Prev</a>');
			}

			var beginpage = beginpage = 1;
			function set_page_fun() {
				for(var i = beginpage; i <= endpage; i++) {
					if(i == curpage) {
						textArr.push('<a onselectstart="return false;" class="cur">', i, '</a>');
					} else {
						textArr.push('<a onselectstart="return false;" class="" onclick="search_fun_LL_(', i, ');">', i, '</a>');
					}
				}
			}

			if(pagesum <= 5) {
				beginpage = 1;
				endpage = pagesum;
				set_page_fun();
			} else { //如果显示最前面的五页
				if(curpage <= 5 && curpage > 0) {
					beginpage = 1;
					endpage = 5;
					set_page_fun();
					textArr.push('<a onselectstart="return false;" style="cursor:default;">...</a>');
					textArr.push('<a onselectstart="return false;" data-page="',pagesum,'">',pagesum,'</a>');
				} else if(curpage <= pagesum && curpage >= (pagesum - 4)) { //如果显示最后面的五页
					beginpage = pagesum - 4;
					endpage = pagesum;
					textArr.push('<a onselectstart="return false;" data-page="',1,'">1</a>');
					textArr.push('<a onselectstart="return false;">...</a>');
					set_page_fun();
				} else {
					beginpage = curpage - 2;
					endpage=Number(curpage)+2;
					textArr.push('<a onselectstart="return false;" data-page="',1,'">1</a>');
					textArr.push('<a onselectstart="return false;" style="cursor:default;">...</a>');
					set_page_fun();
					textArr.push('<a onselectstart="return false;" style="cursor:default;">...</a>');
					textArr.push('<a onselectstart="return false;" data-page="',pagesum,'">',pagesum,'</a>');
				}
			}

			if(curpage < pagesum) {
				textArr.push('<a onselectstart="return false;" data-page="',1+Number(curpage),'" class="next">Next</a>');
			} else {
				textArr.push('<a style="cursor:default;" onselectstart="return false;" class="next">Next</a>');
			}
			textArr.push('<div class="clear"></div></div>');
			search_list_pagebox.html(textArr.join(''));
			search_list_box.html(str);
		});
	}
		
	
//	function search_load_fun(curpage){
//		var live_list_main = $(".live_list_main_ul");
//		var pagesize = 10; //每页展示条数
//		
//		$.getJSON('https://secure.cctvplus.com/livenotice/QueryGuideListByParams?', 
//			{
//				'Time': 0,
//				'PageSize' : pagesize,
//				'PageNo' : curpage
//			}, function(data) {
//				if( data.pageCount <= pagesize*curpage ){
//					$(".fresh_box").hide();
//				}
//				var list_s = data.varList,
//					pre_html = [];
//				for(var i = 0; i < list_s.length; i++) {
//					pre_html.push('<li class="live_list_item">');
//					pre_html.push('<div class="live_item_box_01"><p class="live_item_hd">',list_s[i].TITLE,'</p></div>');
//					pre_html.push('<div class="live_item_box_02">');
//					
//					pre_html.push('<p class="live_item_bd_01">Completed');
//					pre_html.push('<span class="live_bd_time">',list_s[i].LIVETIME.split('-').reverse().join('/'),' ',list_s[i].STARTTIME,'-',list_s[i].ENDTIME,'</span>');
//					pre_html.push('<span class="live_bd_detail"></span></p>');
//					pre_html.push('<div class="live_item_bd_02">');
//					pre_html.push('<p class="live_item_detail"><span class="live_detail_cate">Start Time :</span><span class="live_detail_text">',list_s[i].LIVETIME.split('-').reverse().join('/'),' ',list_s[i].STARTTIME,'</span>');
//					pre_html.push('<p class="live_item_detail"><span class="live_detail_cate">End Time :</span><span class="live_detail_text">',list_s[i].ENDDATE.split('-').reverse().join('/'),' ',list_s[i].ENDTIME,'</span>');
//					pre_html.push('<p class="live_item_detail"><span class="live_detail_cate">Slug :</span><span class="live_detail_text">',list_s[i].TITLE,'</span>');
//					pre_html.push('<p class="live_item_detail"><span class="live_detail_cate">Event :</span><span class="live_detail_text">',list_s[i].REMARKS,'</span>');
//					pre_html.push('<p class="live_item_detail"><span class="live_detail_cate">Location :</span><span class="live_detail_text">',list_s[i].LOCATION,'</span>');
//					pre_html.push('<p class="live_item_detail"><span class="live_detail_cate">Audio/Translation :</span><span class="live_detail_text">Natsound</span>');
//					pre_html.push('<p class="live_item_detail"><span class="live_detail_cate">Source :</span><span class="live_detail_text">',list_s[i].SOURCE,'</span>');
//					pre_html.push('<p class="live_item_detail"><span class="live_detail_cate">Restrictions :</span><span class="live_detail_text">',list_s[i].RESTRICTIONS,'</span>');
//					pre_html.push('<p class="live_item_detail"><span class="live_detail_cate">Channel :</span><span class="live_detail_text">',list_s[i].CHANNEL.slice(1),'</span>');
//					pre_html.push('</div>');
//					pre_html.push('</div>');
//					pre_html.push('</li>');
//				}
//				live_list_main.append(pre_html.join(''));
//			}
//		);	
//	}
	
//	function getDateStr(date) {
//		//2016年5月11日   12:12:00
//		var year = date.getFullYear(); //年
//		var month = date.getMonth() + 1; //月
//		var day = date.getDate(); //日
//		var hours = date.getHours(); //时
//		var minutes = date.getMinutes(); //分
//		var seconds = date.getSeconds(); //秒
//		var str = year + "-" + month + "-" + day;
//		return str;
//	}
	
	function getDateStr1(date) {
		//2016年5月11日   12:12:00
		var year = date.getFullYear(); //年
		var month = date.getMonth() + 1; //月
		var day = date.getDate(); //日
		var hours = date.getHours(); //时
		var minutes = date.getMinutes(); //分
		var seconds = date.getSeconds(); //秒
		var str1 = year + "-" + month + "-" + day + " " + hours + ":" + minutes + ":" + seconds;
		return str1;
	}
	
	//日期格式 执行
	function change_time_check() {
		var s_time = $.trim($('#startTime_val').val());
		var e_time = $.trim($('#endTime_val').val());
		var re = /^\d{4}-\d{2}-\d{2}$/;
		if(s_time && e_time) {
			seach_check_LL['startTime_'] = s_time;
			seach_check_LL['endTime_'] = e_time;
			seach_check_LL['DATE_'] = 5;
			setCookie("startDay", s_time);
			setCookie("endDay", e_time);
			search_fun_LL_(1);
		}
		setCookie("startDay", s_time);
		setCookie("endDay", e_time);

		if($(".date_box").find("input").eq(1).val() !== "" && $(".date_box").find("input").eq(0).val() !== "") {
			var DAY = getCookie("day");
			setCookie("DAY", DAY);
			var SEL = $(".Select").find("input").attr("value");
			setCookie("day", SEL);
		}
	}
	
	function init_search_fun() {
		var key_word_uri_ = decodeURIComponent(Request_url_fun('keyword'));
		var _state = getCookie('state');
		if(_state == undefined) {
			seach_check_LL['state_'] = 'All';
		} else {
			state = _state;
			seach_check_LL['state_'] = _state;
		}

		seach_check_LL['keyword_'] = ($.trim(key_word_uri_).length > 0) ? key_word_uri_ : ""; //add wjj 2016-04-05 首次进入latest页面时不保留搜索条件
		if(seach_check_LL['keyword_'] != "") {
			$('#subsearch_val').val(decodeURIComponent(seach_check_LL['keyword_']));
		}

		if(seach_check_LL['DATE_']) {
			$('#Date_data_box li input[class="data_item"][value="' + seach_check_LL["DATE_"] + '"]').prop('checked', 'checked');
			$('#Date_data_box li input[class="data_item"]').iCheck('update');
		} else if(seach_check_LL['DATE_'] == undefined) {
			seach_check_LL.DATE_ = 0;
			$('#Date_data_box li input[class="data_item"][value="' + seach_check_LL["DATE_"] + '"]').prop('checked', 'checked');
			$('#Date_data_box li input[class="data_item"]').iCheck('update');
		} else {
			
		}

		if(seach_check_LL['LOCATIONS_']) {
			var g_3 = seach_check_LL['LOCATIONS_'].split(',');
			$('#Locations_data_box input[type="checkbox"][class="data_item"]').each(function() {
				if(jQuery.inArray($(this).val(), g_3) !== -1) {
					$(this).prop('checked', 'checked');
				} else {
					$(this).removeProp('checked');
				}
				$(this).iCheck('update');
			});

			if($('#Locations_data_box input[type="checkbox"][class="data_item"]').not(':checked').length == 0) {
				$('#Locations_data_box input[type="checkbox"][class="data_all"]').prop('checked', 'checked').iCheck('update');
			}
		}

		if(seach_check_LL['CATEGORY_']) {
			var g_4 = seach_check_LL['CATEGORY_'].split(',');
			$('#Category_data_box input[type="checkbox"][class="data_item"]').each(function() {
				if(jQuery.inArray($(this).val(), g_4) !== -1) {
					$(this).prop('checked', 'checked');
				} else {
					$(this).removeProp('checked');
				}
				$(this).iCheck('update');
			});

			if($('#Category_data_box input[type="checkbox"][class="data_item"]').not(':checked').length == 0) {
				$('#Category_data_box input[type="checkbox"][class="data_all"]').prop('checked', 'checked').iCheck('update');
			}

		} //cusmot_alert_fun(seach_check_LL['LANGUAGE_']+'#');
		
		if(seach_check_LL['LANGUAGE_']) {
			$('#Language_data_box li input[class="data_item"][value="' + seach_check_LL["LANGUAGE_"] + '"]').prop('checked', 'checked');
			$('#Language_data_box li input[class="data_item"]').iCheck('update');
		}

		if(seach_check_LL['state_']) {
			$('#Status_data_box li input[class="status_item"][value="' + seach_check_LL["state_"] + '"]').prop('checked', 'checked');
			$('#Status_data_box li input[class="status_item"]').iCheck('update');
		}
	}
	
	//右侧详情
//	function make_detail_box(dcid) {
//		dcidMessage = dcid;					
//		$.ajax({
//			url: "https://secure.cctvplus.com/livenotice/getNotice.do",
//			data: {
//				"DCID": dcid,
//				"Time": '5'
//			},
//			beforeSend: function() {
//				$(".datail_success_box").hide();
//				$(".datail_error_box").show().html('Loading...');
//			},
//			success: function(data) {
//				
//				var arr = JSON.parse(data),
//					str = '';
//				if(arr.PMGGUID == '') {
//					$(".datail_error_box").hide();
//					$(".datail_success_box").show().html("No data");
//				} else {
//					$(".datail_success_box").show();
//					$(".datail_error_box").hide().html('');
//				}
//
//				str += '<div class="detail_Box">' +
//							'<p style="display: none;">' +
//								'<span class="fileID_one">File ID:</span>' +
//								'<span class="fileID_two" DCID="' + arr[0].DCID + '">' + arr[0].PMGGUID + '</span>' +
//							'</p>' +
//							'<p>' +
//								'<span class="fileID_one" style="font-weight:bold;">Start Time:</span>' +
//								'<span class="fileID_two">' + arr[0].LIVETIME.split('-').reverse().join('/') + ' ' + arr[0].STARTTIME + '</span>' +
//							'</p>' +
//							'<p>' +
//								'<span class="fileID_one" style="font-weight:bold;">End Time:</span>' +
//								'<span class="fileID_two">' + arr[0].LIVETIME.split('-').reverse().join('/') + ' ' + arr[0].ENDTIME + '</span>' +
//							'</p>' +	
//							'<p>' +
//								'<span class="fileID_one" style="font-weight:bold;">Slug:</span>' +
//								'<span class="fileID_two">' + arr[0].TITLE + '</span>' +
//							'</p>' + 
//							'<p>' +
//								'<span class="fileID_one" style="font-weight:bold;">Event:</span>' +
//								'<span class="fileID_two">' + arr[0].REMARKS + '</span>' +
//							'</p>' +
//							'<p>' +
//								'<span class="fileID_one" style="font-weight:bold;">Location:</span>' +
//								'<span class="fileID_two">' + arr[0].LOCATION + '</span>' +
//							'</p>' +
//							'<p>' +
//								'<span class="fileID_one" style="font-weight:bold;">Audio/Translation:</span>' +
//								'<span class="fileID_two">' + arr[0].AUDIO.split('，').join(',&nbsp;').split(':').join(':&nbsp;') + '</span>' +
//							'</p>' +
//							'<p>' +
//								'<span class="fileID_one" style="font-weight:bold;">Source:</span>' +
//								'<span class="fileID_two">' + arr[0].SOURCE + '</span>' +
//							'</p>' +
//							'<p>' +
//								'<span class="fileID_one" style="font-weight:bold;">Restrictions:</span>' +
//								'<span class="fileID_two">' + arr[0].RESTRICTIONS + '</span>' +
//							'</p>' +
//							'<p>' +
//								'<span class="fileID_one" style="font-weight:bold;">Channel:</span>'+
//								'<span class="fileID_two" ">' + arr[0].CHANNEL.slice(7) + '</span>'+
//							'</p>' + 
//						'</div>';
//				$(".datail_success_box").html(str);
//				$.each($('.status_'), function(i, item) {
//					if($(item).text().indexOf('Cancelled') > -1) {
//						$(item).siblings('h3').find('a').css({
//							'text-decoration': 'line-through'
//						});
//						if($(item).parents('.clearfix').hasClass('cur')) {
//							$(item).parents('.live_l').siblings('.live_r').find('.datail_success_box').children()[0].remove();
//							$(item).parents('.live_l').siblings('.live_r').find('.datail_success_box').prepend('<a class="title" style="display:block;text-decoration:line-through;">' + arr[0].TITLE + '</a>');
//						}
//					}
//				});
//				getDetailScroll();
//			},
//			error: function(data) {
//				console.log("err")
//			}
//		});
//	}
	
	//判断详情高度 作为滚动依据
//	function getDetailScroll() {
//		var window_width = $(window).width(),
//			w_hei = $(window).height(),
//			live_wid = $('.live_r').width(),
//			live_hei = $('.datail_success_box').height();
//		if(window_width > 1440) {
//			if(live_hei + 40 < w_hei) {
//				$('.live_r').css({
//					'width': live_wid + 'px',
//					'height': (w_hei - 160) + 'px',
//					'overflow-y': 'hidden'
//				});
//				$('.live_l').css({
//					'position': 'relative',
//					'padding-bottom': 600 + 'px'
//				});
//			} else {
//				$('.live_r').css({
//					'height': (w_hei - 90) + 'px',
//					'width': live_wid + 'px',
//					'overflow-y': 'scroll'
//				});
//				$('.live_l').css({
//					'position': 'relative',
//					'padding-bottom': 850 + 'px'
//				});
//			}
//
//		}else{
//			if(live_hei + 40 < w_hei) {
//				$('.live_r_detail').css({
//					'height': (w_hei - 120) + 'px',
//					'overflow-y': 'hidden'
//				});
//
//				$('.live_l').css({
//					'position': 'relative',
//					'padding-bottom': 450 + 'px'
//				});
//
//			}else{
//				$('.live_r_detail').css({
//					'height': (w_hei - 120) + 'px',
//					'overflow-y': 'scroll',
//					'overflow-x': 'hidden'
//				});
//
//				$('.live_l').css({
//					'position': 'relative',
//					'padding-bottom': 450 + 'px'
//				});
//			}
//		}
//	}
	
	function preventDefault(e) {
		e = e || window.event;
		if(e.preventDefault)
			e.preventDefault();
			e.returnValue = false;
	}

	function wheel(e) {
		preventDefault(e);
	}

	function disable_scroll() {
		if(window.addEventListener) {
			window.addEventListener('DOMMouseScroll', wheel, false);
		}
		window.onmousewheel = document.onmousewheel = wheel;
		// document.onkeydown = keydown;
	}
	
	function enable_scroll() {
		if(window.removeEventListener) {
			window.removeEventListener('DOMMouseScroll', wheel, false);
		}
		window.onmousewheel = document.onmousewheel = document.onkeydown = null;
	}
	
	function writeCookie_search() {
		writeCookie_LL('search_codenews_LL', JSON.stringify(seach_check_LL), 24);
	}

	function check_submit() {
		if(seach_check_LL['DATE_'] == '' && (seach_check_LL['startTime_'] == '' || seach_check_LL['endTime_'] == '')) {
			cusmot_alert_fun('Please select at least one DATE');
			return false;
		}

		if(!$.trim(seach_check_LL['LOCATIONS_'])) {
			cusmot_alert_fun('Please select at least one LOCATIONS');
			return false;
		}

		if(!$.trim(seach_check_LL['CATEGORY_'])) {
			cusmot_alert_fun('Please select at least one CATEGORY');
			return false;
		}

		if(!$.trim(seach_check_LL['LANGUAGE_'])) {
			cusmot_alert_fun('Please select at least one language');
			return false;
		}
		return true;
	}
	
	

	
	
	$('#startTime_val, #endTime_val').click(function() {
		//seach_check_LL['DATE_'] ='';
		$('#Date_data_box input[name="Date_radio"][class="data_select"]').iCheck('check');
	});
	
	//按范围筛选
	$('#Date_data_box input[name="Date_radio"]').on('ifChecked ifUnchecked', function(e_) {
//			var inp_data_all_ = $('#Date_data_box input[name="Date_radio"][class="data_all"]');
//			var inp_data_select = $('#Date_data_box input[name="Date_radio"][class="data_select"]');
//			var inp_data_items_ = $('#Date_data_box input[name="Date_radio"][class="data_item"]');
//			console.log(  inp_data_items_ )
//			if($(this).hasClass('data_select')) {
//				seach_check_LL['DATE_'] = '';
//				if(e_.type == 'ifChecked') {
//					inp_data_all_.removeProp('checked').iCheck('update').iCheck('enable');
//					inp_data_items_.removeProp('checked').iCheck('update');
//				} else {
//					if($('#Date_data_box input[name="Date_radio"][class="data_item"]:checked').length == 0) {
//						inp_data_all_.iCheck('check');
//					}
//				}
//			}
	});
		
	//状态筛选数据
	$('#Status_data_box input[name="Status_radio"]').on('ifChecked ifUnchecked', function(e_) {
		var inp_data_all_ = $('#Status_data_box input[name="Status_radio"][class="status_all"]');
		var inp_data_select = $('#Status_data_box input[name="Status_radio"][class="status_select"]');
		var inp_data_items_ = $('#Status_data_box input[name="Status_radio"][class="status_item"]');
		if($(this).hasClass('data_select')) {
			seach_check_LL['state_'] = '';
			if(e_.type == 'ifChecked') {
				inp_data_all_.removeProp('checked').iCheck('update').iCheck('enable');
				inp_data_items_.removeProp('checked').iCheck('update');
			} else {
				if($('#Status_data_box input[name="Status_radio"][class="status_item"]:checked').length == 0) {
					inp_data_all_.iCheck('check');
				}
			}
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

	$('.search_item_left .ser_htit').click(function() {
		$(this).parent('.search_item_left').toggleClass('opened');
	});
	
	$('#Date_data_box input[class="data_item"]').on('ifChecked', function() {						
		seach_check_LL['DATE_'] = $('#Date_data_box input[class="data_item"]:checked').val();
		search_fun_LL(1);
		setCookie('day', seach_check_LL.DATE_);										
		$(".date_box input").val("");
	});

	$('#Language_data_box input[class="data_item"]').on('ifChecked', function() {
		seach_check_LL['LANGUAGE_'] = $('#Language_data_box input[class="data_item"]:checked').val();
		search_fun_LL(1);
	});
	
	//选择状态按钮
	$('#Status_data_box input[class="status_item"]').on('ifChecked', function() {
		seach_check_LL['state_'] = $('#Status_data_box input[class="status_item"]:checked').val();											
		setCookie('state', seach_check_LL.state_);
		if(seach_check_LL['DATE_'] == 5) {
			search_fun_LL_(1);
		} else {
			search_fun_LL(1);
		}
	});
	
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
	
	$('#search_key_close_btn').click(function() {
		$('#search_key_tit').text('');
		$('#search_key_box').css('visibility', 'hidden');
		$('#subsearch_val').val('');
		$('#subsearch_btn').trigger('click');
	});
	
//	$('.live_list_box').on('click', 'tr', function() {
//		$('.live_list_box tr').removeClass('cur');
//		var th_ = $(this);
//		th_.addClass('cur');
//		make_detail_box(th_.attr('dcid'));
//		//获取 dcid						
//	});
	
	$('#username').keydown(function(e) {
		if(e.keyCode == 13) {
			isLogin();
		}
	});

	$('#password').keydown(function(e) {
		if(e.keyCode == 13) {
			isLogin();
		}
	});

	$('#codevalue').keydown(function(e) {
		if(e.keyCode == 13) {
			isLogin();
		}
	});
	
	$("#login_in").click(function() {
		isLogin();
	});
	
	$(".login_btn").click(function() {
		login_bar_fun();
	});
	
	
	//pc数据翻页
	$(".cus_page_btns").on('click','a',function(){
		search_fun_LL($(this).attr('data-page'));
	})
	
	//展开对应详情
	$('.live_list_box').on('click', '.foldbtn', function() {
		if( $(this).parents('.clearfix').hasClass('cur') ){
			$(this).text('+');
			$(this).parents('.clearfix').removeClass('cur');
			$(this).parents('.clearfix').next('.foldDetail').hide();
		}else{
			$(this).text('-');
			$(this).parents('.clearfix').addClass('cur');
			$(this).parents('.clearfix').next('.foldDetail').show();
		}
	});
	
	//点击更多加载数据
//	$(".loadMore_btn").click(function(){
//		count_num_++;
//		search_load_fun(count_num_);
//	})
	
	$(".live_list_main_ul").on('click','span.live_bd_detail',function(){
		if( $(this).hasClass('open') ){
			$(this).removeClass('open white');
			$(this).parent().next().hide();
			$(this).parent().parent().parent().css('background','#f4f4f4');
		}else{
			$(this).addClass('open white');
			$(this).parent().next().show();
			$(this).parent().parent().parent().css('background','#dcdad8');
		}
	})
	
	
	
})



