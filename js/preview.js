$(function(){ //该页面(preview)PC端没有筛选功能，下面很多关于选择时间，日期，语言的方法其实都没有用到
	var STR;
	var target;
	var value;
	var Audio_;
	var id;
	var dcidone;  //没用到
	var val;
	var dcid;
	var startDay = getCookie("startDay");
	var endDay = getCookie("endDay");
	var day = getCookie("day");
	var REDindex;
	var user;
	var dcidMessage;
	var date = new Date();
	var mindate = getDateStr(date);
	var L = getDateStr1(date);
	var key_word_uri_ = decodeURIComponent(Request_url_fun('keyword'));
	var hash_ = ''; // decodeURIComponent(window.location.hash);
	var state = 'All';
	var window_width = $(window).width();
	var w_hei = $(window).height();
	var count_num_ = 1;
//	var screenWidth=$(this).innerWidth();  //获取当前屏幕宽度
	
	//邮箱正则
	var Regs = {
			emailReg: /^\w+@\w+(\.\w+)+$/, 
			mobileReg: /^[1-3]\d{10}$/,
			webReg: /^([r][t][m][p]:\/\/)((?:(?:25[0-5]|2[0-4]\d|((1\d{2})|([1-9]?\d)))\.){3}(?:25[0-5]|2[0-4]\d|((1\d{2})|([1-9]?\d))))(:([0-9]|[1-9]\d{1,3}|[1-5]\d{4}|6[0-5]{2}[0-3][0-5])\/)([A-Za-z0-9-~]+\/)([A-Za-z0-9-~]+(\/)*)+$/
	}
	
	if(day == '') {
		day = 0;
	}
	
	var seach_check_LL = {
		"keyword_": "",
		"DATE_": day,
		"state_": state
	};
	seach_check_LL['keyword_'] = ($.trim(key_word_uri_).length > 0) ? key_word_uri_ : seach_check_LL['keyword_'];
	
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
	} else {
		search_fun_LL(1);
	}
	
	$('#navmain_2015box_3').addClass('cur');
	//QM--add new 0906
	checkType();
	init_search_fun();
//	search_load_fun(1);
	init();
	cusmot_select_fun('subsearch_sel_box');
	cusmot_select_fun('uscenter_sel_box');
	init_check_status();
	
	$(".page_topbar_nav_s").hide();
	//初始化选项
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
			//
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
		}
		if(seach_check_LL['LANGUAGE_']) {
			$('#Language_data_box li input[class="data_item"][value="' + seach_check_LL["LANGUAGE_"] + '"]').prop('checked', 'checked');
			$('#Language_data_box li input[class="data_item"]').iCheck('update');
		}

		if(seach_check_LL['state_']) {
			$('#Status_data_box li input[class="status_item"][value="' + seach_check_LL["state_"] + '"]').prop('checked', 'checked');
			$('#Status_data_box li input[class="status_item"]').iCheck('update');
		}
	}
	
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
		$.getJSON('https://secure.cctvplus.com/livenotice/getNotice.do?', {
			'pageSize': pagesize,
			'pageNo': curpage,
			'Time': 0,
			'Live_Status': 'All'
		}, function(data) {
//			console.log(data);
			setCookie('day', seach_check_LL.DATE_)
			setCookie('state', seach_check_LL.state_)
			var lis = data;
			if(lis.length == 0 || lis.PMGGUID == '') {
				search_load_box.show();
				search_load_box.find('td').html("No data");
				$(".datail_success_box").hide();
				$(".datail_error_box").show().html('No data');
				return;
			}
			search_load_box.hide();
			var itemsum = lis[0].SUM;
			var textArr = [];
			pagesum = Math.ceil(itemsum / pagesize);
			var str = '';

			for(var i = 0; i < lis.length; i++) {
				/**
				 * 直播状态STATUS: TBC时 
				 * StartTime/EndTime显示为TBC
				 * StartTime/EndTime:进行时间格式转换(Yyyy-Mm-Dd Hh:Min) ——> (Dd/Mm/Yyyy Hh:Min) 
				 */
				if(lis[i].STATUS == 'TBC') {
					str += '<tr class="clearfix" dcid="' + lis[i].DCID + '">' +
						'<td><span class="foldbtn">+</span><p>' + lis[i].TITLE + '</p></td>' +
						'<td><p>TBC</p></td>' +
						'<td><p>TBC</p></td>';
				} else if(lis[i].STATUS == 'TBC1'){
					str += '<tr class="clearfix" dcid="' + lis[i].DCID + '">' +
						'<td><span class="foldbtn">+</span><p>' + lis[i].TITLE + '</p></td>' +
						'<td><p>' + lis[i].LIVETIME.split('-').reverse().join('/') + '</p></td>' +
						'<td><p>' + lis[i].ENDDATE.split('-').reverse().join('/')+ '</p></td>';
				} else {
					str += '<tr class="clearfix" dcid="' + lis[i].DCID + '">' +
						'<td><span class="foldbtn">+</span><p>' + lis[i].TITLE + '</p></td>' +
						'<td><p>' + lis[i].LIVETIME.split('-').reverse().join('/') + ' ' + lis[i].STARTTIME + '</p></td>' +
						'<td><p>' + lis[i].ENDDATE.split('-').reverse().join('/') + ' ' + lis[i].ENDTIME + '</p></td>';
				}
				/**
				 * 直播状态处理
				 * STATUS: Live in  ——>  Live
				 * STATUS: TBC  ——>  Scheduled
				 * STATUS: Ended  ——>  Completed
				 * 其他状态正常显示
				 */
				if(lis[i].STATUS == 'Live in') {
					str += '<td class="tr_status"><p>Live</p></td></tr>';
				} else if(lis[i].STATUS == 'TBC') {
					str += '<td class="status_"><p>Scheduled</p></td></tr>';
				} else if(lis[i].STATUS == 'TBC1'){
					str += '<td class="status_"><p>Scheduled</p></td></tr>';
				} else if(lis[i].STATUS == 'Ended') {
					str += '<td class="status_"><p>Completed</p></td></tr>';
				} else {
					str += '<td class="status_"><p>' + lis[i].STATUS + '</p></td></tr>';
				}
				
				
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
//				str += '</table></td></tr>';
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
						textArr.push('<a onselectstart="return false;" class="" data-page="',i,'">',i,'</a>');
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
//			search_list_pagebox.html(textArr.join(''));

		});
	}
	


	//选择日期后 执行
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
	
	//获取当前时间
	function getDateStr(date) {
		//2016年5月11日   12:12:00
		var year = date.getFullYear(); //年
		var month = date.getMonth() + 1; //月
		var day = date.getDate(); //日
		var hours = date.getHours(); //时
		var minutes = date.getMinutes(); //分
		var seconds = date.getSeconds(); //秒
		var str = year + "-" + month + "-" + day;
		return str;
	}
	//获取当前时间
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
	
	function writeCookie_search() {
		writeCookie_LL('search_codenews_LL', JSON.stringify(seach_check_LL), 24);
	}
	
	/*用于禁止鼠标滚动 ----  start*/
	function enable_scroll() {
		if(window.removeEventListener) {
			window.removeEventListener('DOMMouseScroll', wheel, false);
		}
		window.onmousewheel = document.onmousewheel = document.onkeydown = null;
	}
	
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
	
	/*用于禁止鼠标滚动 ----  end*/
	
	
	//点击订阅
	btn = function(n) {
	   
	    user = $('#uscenter_sel_box .custom_sel_text').text();
		dcid = $(n).parents(".datail_success_box").find(".detail_Box>p").eq(0).find(".fileID_two").attr("DCID");
//		$('.Submit').attr('dcid',dcid);
	    /**
		 * 填写配置信息时，自动加载历史信息。加载用户历史订阅配置信息（time：2017/08/22 By WanGcz）
		 */
		$.ajax({
			type: "get",
			url: "https://secure.cctvplus.com/review/getIsExist.do",
			data: {
				USERNAME: user
			},
			success: function(data) {
			    var arr = JSON.parse(data);
				var spass1 = arr[0].TARGET_PASSWORD1,
					spass2 = arr[0].TARGET_PASSWORD2,
					sname1 = arr[0].TARGET_USERNAME1,
					sname2 = arr[0].TARGET_USERNAME2,
					surl1 = arr[0].TARGET_URL1,
					surl2 = arr[0].TARGET_URL2,
					//stel = arr[0].TELEPHONE,
					//semail = arr[0].EMAIL,
					contact = arr[0].CLIENTNAME;

				$("#contact").val(contact);
				$("#name1").val(sname1);
				$("#name2").val(sname2);
				//$("#tel").val(stel);
				//$("#email").val(semail);
				$('#Pass1').val(spass1);
				$('#Pass2').val(spass2);
				$('#surl1').val(surl1);
				$('#surl2').val(surl2);
				
				$("#email").blur(function() {
					checkemail1();
				})
			},
			error: function() {
				$("#email").blur(function() {
					checkemail1();
				})
			}
		});
		// Audio下拉框初始化
		$.ajax({
			type:'post',
			url:'https://secure.cctvplus.com/subscribe/audioSelect.do',
			data:{
				DCID: dcid,
			},
			dataType:'json',
			success:function(data){
				$("#audio").html("");
				$("#audio").append($("<option  value=''>Please select audio</option>"));
				for(var i = 0 ; i < data.length; i++){
					var option = $("<option value="+ data[i].value +">"+ data[i].name +"</option>");
					$("#audio").append(option);
				}
			},
			error:function(data){
				
			}
		})
		
		if($("tr.cur").find(".status_").text() == "Completed") {
			cusmot_alert_fun("The program is over");
		} else if($("tr.cur").find(".tr_status").text() == "Live") {
			cusmot_alert_fun("Being broadcast live");
		} else {
			if(user == 'George') {
				login_bar_fun();
				$(".colorbox").css({
					display: "block"
				});
			} else {
				L = getDateStr1(date);
				$.ajax({
					type: "get",
					url: "https://secure.cctvplus.com/subscribe/gdsChecks.do",
					data: {
						DCID: dcid,
						//	CUSTID:"li575757",
						CUSTID: user,
						type: "subCheck",
					},
					success: function(data) {
						if(data == "ok") {
							$("#model").css({
								display: "block"
							});
							var window_height = $(window).height();
							var top = ($(window).height() - $("#smallmodel").height()) / 2;
							var left = ($(window).width() - $("#smallmodel").width()) / 2;
							$('.page_body').css({
								'height': window_height + 'px',
								'overflow': 'hidden'
							});
							//$('#model_con').width($("#smallmodel").width()+20);//add xyt 表单滚动条						
							$("#smallmodel").css({
								display: "block",
								top: top,
								left: left
							});
							onPrevClick();
							//getIscroll();//调用滚动条 add xyt  (页面没找到该方法)							
							//dcid = $(n).parents(".datail_success_box").find(".fileID_two").attr("DCID");
							
						} else if(data == "denied") {
							cusmot_alert_fun("Already subscribed");
						}
					},
					error: function() {
						console.log('err')
					}
				});
			}
		}
	}
	
	//清空表单
	function emptyForm() {

		$("#name1").val("");
		$("#name2").val("");
		$("#tel").val("");
		$("#email").val("");
		$(".web").val("");
		$(".web2").val("");
		$(".Red_error_contact").css({
			display: "none"
		});
		$(".Red_error_email").css({
			display: "none"
		});
		$(".Red_error_name1").css({
			display: "none"
		});
		$(".Red_error_name2").css({
			display: "none"
		});
		$(".Red_error_tel").css({
			display: "none"
		});
		$(".Red_error_ul").css({
			display: "none"
		});
		$(".Red_error_web1").css({
			display: "none"
		});
		$(".Red_error_ul2").css({
			display: "none"
		});
		$(".Red_error_web2").css({
			display: "none"
		});
		//$("#email,#tel,#name,#organization,.web,.web2,#write>textarea").removeClass("Error");
		$("#contact,#email,#tel,#name,#organization").removeClass("Error");
		STR = '';
		enable_scroll();
		$('.add-wp>.TDIV').remove(); //
		$("#model").css({
			display: "none"
		});
		$("#smallmodel").css({
			display: "none"
		});
		$('.web').css({
			'border': '1px solid #7c7c7c'
		})
		$('.web2').css({
			'border': '1px solid #7c7c7c'
		})
	}
	
	
	//check日期开始结时间
	$('#startTime_val, #endTime_val').click(function() {
		$('#Date_data_box input[name="Date_radio"][class="data_select"]').iCheck('check');
	});
	
	$('#Date_data_box input[name="Date_radio"]').on('ifChecked ifUnchecked', function(e_) {
		var inp_data_all_ = $('#Date_data_box input[name="Date_radio"][class="data_all"]');
		var inp_data_select = $('#Date_data_box input[name="Date_radio"][class="data_select"]');
		var inp_data_items_ = $('#Date_data_box input[name="Date_radio"][class="data_item"]');
		if($(this).hasClass('data_select')) {
			seach_check_LL['DATE_'] = '';
			if(e_.type == 'ifChecked') {
				inp_data_all_.removeProp('checked').iCheck('update').iCheck('enable');
				inp_data_items_.removeProp('checked').iCheck('update');
			} else {
				if($('#Date_data_box input[name="Date_radio"][class="data_item"]:checked').length == 0) {
					inp_data_all_.iCheck('check');
				}
			}
		}
	});
	//check时间长度
	$('#Date_data_box input[class="data_item"]').on('ifChecked', function() {
		seach_check_LL['DATE_'] = $('#Date_data_box input[class="data_item"]:checked').val();
		search_fun_LL(1);
		setCookie('day', seach_check_LL.DATE_);
		$(".date_box input").val("");
	});
	//check语言
	$('#Language_data_box input[class="data_item"]').on('ifChecked', function() {
		seach_check_LL['LANGUAGE_'] = $('#Language_data_box input[class="data_item"]:checked').val();
		search_fun_LL(1);
	});
	
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
	//check状态(live,completed)
	$('#Status_data_box input[class="status_item"]').on('ifChecked', function() {
		seach_check_LL['state_'] = $('#Status_data_box input[class="status_item"]:checked').val();
		setCookie('state', seach_check_LL.state_);
		if(seach_check_LL['DATE_'] == 5) {
			search_fun_LL_(1);
		} else {
			search_fun_LL(1);
		}
	});
	
	function checkaudio(){
		var audio = $("#audio").val();
		if(""==audio){
			$(".Red_error_audio span").html('please select audio');
			$(".Red_error_audio").css({
				display: "block"
			});
			$("#audio").addClass("Error");
			return false;
		}
		return true;
	}
	
	function audioOnChange(){
		//var select = $(that).parent().find(".Red_error_audio")[0]
		$(".Red_error_audio").css({
			display: "none"
		});
	}
	
	function checkcontact(){
		var username1 = $("#contact").val();
		if(username1.replace(/\s/g, "").length <= 0) {
			$(".Red_error_contact span").html('please enter a message'); //html('name error,please re-enter')
			$(".Red_error_contact").css({
				display: "block"
			});
			$("#contact").addClass("Error");
			return false;
		} else {
			if(username1.length > 65) {
				$(".Red_error_contact span").html('The length should not be greater than sixty-five ')
				$(".Red_error_contact").css({
					display: "block"
				});
				$("#contact").addClass("Error");
				return false;
			} else {
				$(".Red_error_contact").css({
					display: "none"
				});
				$("#contact").removeClass("Error");
				return true;
			}
		}
	}
	
	function checkemail1() {
		var v = $("#email").val();
		if(v.length == 0) {
			$(".Red_error_email span").html('please enter a message'); //html('email error,please re-enter')
			$(".Red_error_email").css({
				display: "block"
			});
			$("#email").addClass("Error");
			return false;
		} else {
			if(!Regs.emailReg.test(v)) {
				$(".Red_error_email span").html('email error,please re-enter'); //html('email error,please re-enter')
				$(".Red_error_email").css({
					display: "block"
				});
				$("#email").addClass("Error");
				return false;
			} else {
				if(v.length > 65) {
					$(".Red_error_email span").html('The length should not be greater than sixty-five ')
					$(".Red_error_email").css({
						display: "block"
					});
					$("#email").addClass("Error");
					return false;
				} else {
					$(".Red_error_email").css({
						display: "none"
					});
					$("#email").removeClass("Error");
					return true;
				}
			}
		}

	}
	
	function username1() {
		var username1 = $("#name1").val();
		if(username1.replace(/\s/g, "").length <= 0) {
			$(".Red_error_name1 span").html('please enter a message'); //html('name error,please re-enter')
			$(".Red_error_name1").css({
				display: "block"
			});
			$("#name1").addClass("Error");
			return false;
		} else {
			if(username1.length > 65) {
				$(".Red_error_name1 span").html('The length should not be greater than sixty-five ')
				$(".Red_error_name1").css({
					display: "block"
				});
				$("#name1").addClass("Error");
				return false;
			} else {
				$(".Red_error_name1").css({
					display: "none"
				});
				$("#name1").removeClass("Error");
				return true;
			}
		}
	}


	function username2() {
		var username2 = $("#name2").val();
		if(username2.replace(/\s/g, "").length <= 0) {
			$(".Red_error_name2 span").html('please enter a message'); //html('name error,please re-enter')
			$(".Red_error_name2").css({
				display: "block"
			});
			$("#name2").addClass("Error");
			return false;
		} else {
			if(username2.length > 65) {
				$(".Red_error_name2 span").html('The length should not be greater than sixty-five ')
				$(".Red_error_name2").css({
					display: "block"
				});
				$("#name2").addClass("Error");
				return false;
			} else {
				$(".Red_error_name2").css({
					display: "none"
				});
				$("#name2").removeClass("Error");
				return true;
			}
		}
	}
	
	function phone() {
		var v = $("#tel").val();
		if(v.replace(/\s/g, "").length <= 0) {
			$(".Red_error_tel span").html('please enter a message'); //html('tel error,please re-enter')
			$(".Red_error_tel").css({
				display: "block"
			});
			$("#tel").addClass("Error");
			return false;
		} else {
			if(v.length > 12) {
				$(".Red_error_tel span").html('The length should not be greater than twelve')
				$(".Red_error_tel").css({
					display: "block"
				});
				$("#tel").addClass("Error");
				return false;
			} else {
				$(".Red_error_tel").css({
					display: "none"
				});
				$("#tel").removeClass("Error");
				return true;
			}
		}
	}
	
	function URL1(){
		var url1=$('#surl1').val();
		if(url1.length<=0){
			$(".Red_error_web1 span").html('please enter a message'); //html('please enter a message')
				$(".Red_error_web1").css({
					display: "block"
				});
				$(".web").addClass("Error");
			return false;
		}else{
			if(!Regs.webReg.test(url1)) {
				$(".Red_error_web1 span").html('url error,please re-enter'); //html('email error,please re-enter')
				$(".Red_error_web1").css({
					display: "block"
				});
				$(".web").addClass("Error");
				return false;
			}else{
				$(".Red_error_web1").css({
					display: "none"
				});
				$(".web").removeClass("Error");
				return true;
			}
		}
	}
	
	function URL2(){
		var url2=$('#surl2').val();
		var url1=$('#surl1').val();
		if(url2.length<=0){
			$(".Red_error_web2").css({
					display: "none"
				});
				$(".web2").removeClass("Error");
			return true;
		}else{
			if(url1 == url2){
				$(".Red_error_web2 span").html('url repeat,please re-enter'); //html('email error,please re-enter')
				$(".Red_error_web2").css({
					display: "block"
				});
				$(".web2").addClass("Error");
				return false;
			}
			if(!Regs.webReg.test(url2)) {
				$(".Red_error_web2 span").html('url error,please re-enter'); //html('email error,please re-enter')
				$(".Red_error_web2").css({
					display: "block"
				});
				$(".web2").addClass("Error");
				return false;
			}else{
				$(".Red_error_web2").css({
					display: "none"
				});
				$(".web2").removeClass("Error");
				return true;
			}
		}
	}
	
	function jian(k) {
		var INDEX = $(k).index();
		var Ll = $(".Choose").length;
		
		$(k).parents(".TDIV").remove();
	}
	
	//订阅提交信息
	function Info(contact,audio,audio_name,name1,name2, tel, email, dcid,target1,target2,outpass1,outpass2) {
		L = getDateStr1(date);
		user = $('#uscenter_sel_box .custom_sel_text').text();
		
		/**
		 * 填写配置信息时，自动加载历史信息。保存用户历史订阅配置信息（time：2017/08/22 By WanGcz）
		 */
		var info_target = $(".web").val();
		
		$.ajax({
			type: "get",
//			url: "https://secure.cctvplus.com/subscribe/saveOrder",
			url:"https://secure.cctvplus.com/subscribe/saveOrder",
			data: {
				"contact":contact,
				"audio":audio,
				"audio_name":audio_name,
				"outname1": name1,
				"outname2": name2,
				"mobile": tel,
				"email": email,
				"outpass1":outpass1,
				"outpass2":outpass2,
				//"username":"li575757",
				"target1": target1,
				"target2": target2,
				"USERNAME": user,
				"DCID": dcid
			},
			success: function(data) {
				cusmot_alert_fun("Subscription Received")
				$("#model").css({
					display: "none"
				});
				$("#smallmodel").css({
					display: "none"
				});
				
				enable_scroll();
				$("#name1").val("");
				$("#name2").val("");
				$("#Pass1").val("");
				$("#Pass2").val("");
				$('#surl1').val("");
				$('#surl2').val("");
				$("#tel").val("");
				$("#email").val("");
				
				$(".Red_error_contact").css({
					display: "none"
				});
				$(".Red_error_name").css({
					display: "none"
				});
				$(".Red_error_email").css({
					display: "none"
				});
				$(".Red_error_tel").css({
					display: "none"
				});
				$(".Red_error_ora").css({
					display: "none"
				});
				$(".Red_error_audio").css({
					display: "none"
				});
				$(".Red_error_ul").css({
					display: "none"
				});
				$(".Red_error_web").css({
					display: "none"
				});
				$(".Red_error_audio2").css({
					display: "none"
				});
				$(".Red_error_ul2").css({
					display: "none"
				});
				$(".Red_error_web2").css({
					display: "none"
				});
				$("#email,#tel,#name,#organization,.web,.web2").removeClass("Error");
				$("#OK").on("click", function() {
						$("#model").css({
							display: "none"
						});
						$("#success").css({
							display: "none"
						});
					})
					//$("#btn").attr("dcid",dcid);
			},
			error: function(data) {
				console.log("error");
			}
		});
	}

	
	//表单下一页按钮
	function init() {
		$('.next-btn').on('click', onNextClick);
		$('.prev-btn').on('click', onPrevClick);
		$('.last-btn').on('click', onLastClick);
	}
	
	function onNextClick() {

		if(organization() && phone() && username() && checkemail1()) {
			$('.first-page').animate({
				right: '600px',
				opacity: 'hide'
			}, 'fast');
			$('.next-page').animate({
				left: '0px',
				opacity: 'show'
			}, 'fast');

			$('.last-page').animate({
				left: '600px',
				opacity: 'hide'
			}, 'fast');
		} else {
			username();
			phone();
			checkemail1();
//			organization();
		}
	}
	
	function onLastClick() {

		$('.last-page').animate({
			left: '0px',
			opacity: 'show'
		}, 'fast');
		$('.next-page').animate({
			left: '-600px',
			opacity: 'hide'
		}, 'fast');
	}

	function onPrevClick() {
		$('.next-page').animate({
			left: '600px',
			opacity: 'hide'
		}, 'fast');

		$('.first-page').animate({
			right: '0px',
			opacity: 'show'
		}, 'fast');

	}
	
	$(".date_box input").val("");
	$("#footer").css({
		bottom: "-1"
	});
	$("#UL li .iradio_square").eq(0).addClass("checked");
	
	
	
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
	
	//add wjj 2016-02-03
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
	//add wjj 2016-02-03
	
	$("#contact").blur(function(){
		checkcontact();
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
	
	//表单右上角关闭按钮 表单底部取消按钮
	$(".closeBtn").on("click", function() {
		$('.page_body').css({
			'height': 'initial',
			'overflow': 'auto'
		});
		emptyForm();
		$('.TDIV').remove();
		$('#select').removeClass('on');
		$('#Fselect').removeClass('on');				
	})
	
	//点击提交按钮时 验证格式
	$(".Submit").on("click", function() {
		var contact = $("#contact").val(),
			audio = $("#audio").val(),
			audio_name = $("#audio").find("option:selected").text();
			name1 = $("#name1").val(),
			name2 = $("#name2").val(),
			tel = $("#tel").val(),
			email = $("#email").val(),
			target1=$('#surl1').val(),
			target2=$('#surl2').val(),
			outpass1=$('#Pass1').val(),
			outpass2=$('#Pass2').val(),
//			ora = $("#organization").val(),
//			txt = $("#write textarea").val(),
			Audio_ = '', //所有的频道
			value = '', //所有的码率
			target = ''; //所有的内容，频道，码率

		$('.page_body').css({
			'height': 'initial',
			'overflow': 'auto'
		});
		if(checkaudio()&&checkcontact()&&phone()&&checkemail1()&&URL1()&&URL2()){
			//Info(name1,name2, tel, email, dcid,target1,target2,outpass1,outpass2);
			Info(contact,audio,audio_name,name1,name2, tel, email, dcid,target1,target2,outpass1,outpass2);
		}
		var val;
		var userNAME = $("#uscenter_sel_box .custom_sel_text").html();

	})
	
	
	$("#tel").blur(function() {
		phone();
	})
	
	$('#surl1').blur(function() {
		URL1();
	})
	
	$('#surl2').blur(function() {
		URL2();
	})
	
	
	
	//xyt 20170809 留言板点击功能
	$('#messageBtn').on('click', function() {				
		var W = $(window).width() *0.4 ,
		    H = $(window).height() * 0.9;
		    user = $('#uscenter_sel_box .custom_sel_text').text();	
		    					    
		if( user == 'George' || user == ''){
			login_bar_fun();
			$(".colorbox").css({
				display: "block"
			});
			return;
		}

		window.open('message.html','one','modal=yes,width='+W+',height='+H+',top=70');

	});
	
	
	
	//pc数据翻页
//	$(".live_l").on('click','.cus_page_btns>a',function(){
//		search_fun_LL($(this).attr('data-page'));
//	})
	
})



