$(function(){
	
	
	$('div[id^=detail_infotab_cont3_]').each(function(){
		var t_ = $(this).find(' li ').eq(1);
	    var d_ = $(this).find(' li ').eq(2);
	    var t1_ = t_.text().trim();
	    var d1_ = d_.text().trim();
	    var pu = 'Published : ';
	    var la = 'Last Modified : ';
		  if(t1_.indexOf(pu) >=0 ){
				t_.html('<span class="lab">Published : '+getTimeString(t1_.substr(pu.length))+'</sapn>');
		  }
		  if(d1_.indexOf(la) >=0){
		  	d_.html('<span class="lab">Last Modified : '+getTimeString(d1_.substr(la.length))+'</sapn>');
		  }
	});
	
//	$('div[id^=detail_InfoTab_Cont4_]').each(function(){
//		var t_ = $(this).find(' li ').eq(1);
//	    var d_ = $(this).find(' li ').eq(2);
//	    var t1_ = t_.text().trim();
//	    var d1_ = d_.text().trim();
//	    var pu = 'Published : ';
//	    var la = 'Last Modified : ';
//		  if(t1_.indexOf(pu) >=0 ){
//				t_.html('<span class="lab">Published : '+getTimeString(t1_.substr(pu.length))+'</sapn>');
//		  }
//		  if(d1_.indexOf(la) >=0){
//		  	d_.html('<span class="lab">Last Modified : '+getTimeString(d1_.substr(la.length))+'</sapn>');
//		  }
//	});
	
	//大屏(切换语言)
	tab_md_fun2('detail_infotab','language');
	
	//小屏(切换语言)
	tab_md_fun3('detail_Info_Tab','language');
	
	
	
	
	var mid = $("#detail_infotab li.cur").attr("mid");
	var dcid = $("#detail_infotab li.cur").attr("dcid");
	var inp_mid1 = $("#mid_inp").val();
	var inp_dcid1 = $("#dcid_inp").val();
	$.getJSON('https://secure.cctvplus.com/interface/topicBrowseRecord.do?callback=?',{"MID":inp_mid1,"DCID":inp_dcid1,"browse_source":document.referrer,"type":"News"},function(d_){
		//alert(d_.result);
	});
	
	$('#download_box_').on('click','li',function(){	
		var this_f = $(this);
		if(!this_f.hasClass('opened')){
			$('#download_box_ li').removeClass('opened');
			this_f.addClass('opened');
			console.log('点击');
			var d_l_ = $(this).children('.d_item_s');
			d_l_.html('Loading...');	
			var format = $(this).attr("format");
			var mid = $("#detail_infotab li.cur").attr("mid");
			var dcid = $("#detail_infotab li.cur").attr("dcid");
			var inp_mid = $("#mid_inp").val();
			var inp_dcid = $("#dcid_inp").val();
			if(format!='METADATA'){
				var htmlType='News';
				var wwwPath=window.document.location.href;
				if(wwwPath.indexOf('exchange')>0){
					htmlType='Exchange';
				}
				$.getJSON('https://secure.cctvplus.com/interface/downloadUrl.do?callback=?',{"MID":inp_mid,"DCID":inp_dcid,"type":htmlType,"format":format},function(d_){
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
						//cusmot_alert_fun('no login');
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
							cusmot_alert_fun('Not found this video, please contact the administrator. (error code:'+d_.errCode+')');  	//æ æ­¤è§é¢
						}else{
							cusmot_alert_fun('Not found this video, please contact the administrator.');  	//æ æ­¤è§é¢
						}
					}
				});
				}else{
			}
		}else{
			this_f.removeClass('opened');
		}
	});
	
})


function alert_msg(){
	cusmot_alert_fun('Server internal error, please contact the administrator');
}

function downloadUrl(url,type,downloadId){
	var mid = $("#detail_infotab li.cur").attr("mid");
	var dcid = $("#detail_infotab li.cur").attr("dcidd");
	$.ajax({
		url:"https://secure.cctvplus.com/interface/downloadMedia.do",
		dataType:'jsonp',
		data:{ DCID:dcid,downloadID:downloadId,url:url, urltype :type},
		success : function (data){
			/*if(data.result=='0'){
				cusmot_alert_fun('Download success');
			}else if(data.result=='1'){
				cusmot_alert_fun('Download failed');
			}*/
		}
	});
}

function _facebook(){
	var detailPath = $("#detailPath").val();
	var pubTitle = $("#pubTitle").val();
	var url = 'http://www.facebook.com/share.php?u='+detailPath+'&t='+pubTitle;
	window.open (url,'','height=300,width=700,top=100,left=400,toolbar=no,menubar=no,scrollbars=no, resizable=no,location=no, status=no');
	var mid = $("#detail_infotab li.cur").attr("mid");
	var dcid = $("#detail_infotab li.cur").attr("dcidd");
	$.getJSON('https://secure.cctvplus.com/interface/shareRecord.do?callback=?',{"MID":mid,"DCID":dcid,"shareType":"2","type":"News"},function(d_){
	});
}
function _twitter(){
	var detailPath = $("#detailPath").val();
	var pubTitle = $("#pubTitle").val();
	//var url = 'http://twitter.com/home/?status=Currentlyreading?&u='+detailPath+'&t='+pubTitle;
	var url = 'http://twitter.com/share?&text='+pubTitle+'&url='+detailPath;
	window.open (url,'','height=430,width=700,top=100,left=400,toolbar=no,menubar=no,scrollbars=no, resizable=no,location=no, status=no');
	var mid = $("#detail_infotab li.cur").attr("mid");
	var dcid = $("#detail_infotab li.cur").attr("dcidd");
	$.getJSON('https://secure.cctvplus.com/interface/shareRecord.do?callback=?',{"MID":mid,"DCID":dcid,"shareType":"1","type":"News"},function(d_){
	});
}
function _linkedin(){
	var detailPath = $("#detailPath").val();
	var pubTitle = $("#pubTitle").val();
	var url = 'http://www.linkedin.com/shareArticle?mini=true&url='+detailPath+'&title='+pubTitle;
	window.open (url,'','height=550,width=750,top=100,left=400,toolbar=no,menubar=no,scrollbars=no, resizable=no,location=no, status=no');
	var mid = $("#detail_infotab li.cur").attr("mid");
	var dcid = $("#detail_infotab li.cur").attr("dcidd");
	$.getJSON('https://secure.cctvplus.com/interface/shareRecord.do?callback=?',{"MID":mid,"DCID":dcid,"shareType":"3","type":"News"},function(d_){
	});
}

