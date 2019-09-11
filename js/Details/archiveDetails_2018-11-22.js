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
	
	//大屏(切换语言)
	tab_md_fun2('detail_infotab','language');
	
	//小屏(切换语言)
	tab_md_fun3('detail_Info_Tab','language');
	
	$('input').iCheck({
		radioClass: 'radio_input',
		checkboxClass: 'icheckbox_square',
		increaseArea: '10%' // optional
	});
	cusmot_select_fun('order_sel_box');
	$('#add_to_order').on('ifChecked',function(e_){				
		$('#neworder_val_box').hide();
		$('#order_sel_box').show();
	});
	$('#cre_new_order').on('ifChecked',function(e_){				
		$('#order_sel_box').hide();
		$('#neworder_val_box').show();
	});
	var synchronizing = 'false';
	
	var mid = $("#detail_infotab li.cur").attr("midd");
	var dcid = $("#detail_infotab li.cur").attr("dcidd");
	$.getJSON('https://secure.cctvplus.com/interface/topicBrowseRecord.do?callback=?',{"MID":mid,"DCID":dcid,"browse_source":document.referrer,"type":"archive"},function(d_){
			//alert(d_.result);
	});
	
	$("#addArchive").click(function(){
		//var dcid = $("#dcid").val();
		//var mid = $("#mid").val();
		var mid = $("#detail_infotab li.cur").attr("midd");
		var dcid = $("#detail_infotab li.cur").attr("dcidd");
		var order = $("#orderID").val();
		
		if($("#add_to_order").is(':checked')){
			//$("#addArchive").unbind( "click" )
			//alert("äºä»¶åæ¶ç»å®");
			if(!order){cusmot_alert_fun('please check one!'); return;}
			if(synchronizing == 'false'){
				synchronizing = 'true';
				$.ajax({
					url:"https://secure.cctvplus.com/interface/addToOrder.do",
					dataType:'jsonp',  
					data:{orderID:order,DCID:dcid,MID:mid},
					success : function (data){
						if(data.result=='-1'){
							synchronizing = 'false';
							login_bar_fun();
						}
						else if(data.result=='0'){
								cusmot_alert_fun('Order Failed. (error code:'+data.errCode+')');				//æ·»å è®¢åå¤±è´¥
						}
						else if(data.result=='1'){	
							synchronizing = 'false';	
							cusmot_alert_fun('Order success.');			//æ·»å è®¢åæå
						}
						else if(data.result=='-2'){	
							synchronizing = 'false';	
								cusmot_alert_fun('Video already exists. (error code:'+data.errCode+')');			//è®¢åä¸­å·²ææ­¤é¡¹
						}
						else if(data.result=='-3'){	
							synchronizing = 'false';	
								cusmot_alert_fun('No choice has been available. (error code:'+data.errCode+')');			//æ²¡æéæ©å·²æè®¢å
						}
						else if(data.result=='-4'){	
							synchronizing = 'false';	
								cusmot_alert_fun('You have just encountered a technical failure (#'+data.errCode+'). Please report it to our customer service representative if possible, thank you.');			//midæèdcidä¸ºç©º
						}
						else if(data.result=='-5'){		
							synchronizing = 'false';
								cusmot_alert_fun('You have just encountered a technical failure (#'+data.errCode+'). Please report it to our customer service representative if possible, thank you.');			//æ²¡æè¿ä¸ªè§é¢
						}
						//$("#addArchive").bind("click", foo);
						//alert("äºä»¶æ¢å¤ç»å®");
					}
				});
			}
		}
		if($("#cre_new_order").is(':checked')){
			var inp = $.trim($("#neworder_val").val());
			if(!inp){cusmot_alert_fun('name not null'); return;}
			//$("#addArchive").unbind( "click" )
			//alert("äºä»¶åæ¶ç»å®");
			if(synchronizing == 'false'){
				synchronizing = 'true';
				$.ajax({
					url:"https://secure.cctvplus.com/interface/newOrder.do",
					dataType:'jsonp',  
					data:{ordername:encodeURIComponent(inp),DCID:dcid,MID:mid},
					success : function (data){
						if(data.result=='-1'){
							synchronizing = 'false';
							login_bar_fun();				//æªç»å½
						}
						else if(data.result=='0'){
							synchronizing = 'false';
								cusmot_alert_fun('Order Failed. (error code:'+data.errCode+')');				//æ·»å è®¢åå¤±è´¥
						}
						else if(data.result=='-2'){
							synchronizing = 'false';
								cusmot_alert_fun('Please specify an order name. (error code:'+errCode+')');//è®¢ååç§°ä¸ºç©º
						}
						else if(data.result=='1'){
							synchronizing = 'false';
							cusmot_alert_fun('Order Success');			//æ·»å è®¢åæå
						}
						else if(data.result=='-3'){
							synchronizing = 'false';
								cusmot_alert_fun('You have just encountered a technical failure ('+data.errCode+'). Please report it to our customer service representative if possible, thank you.');			//midæèdcidä¸ºç©º
						}
						else if(data.result=='-4'){
							synchronizing = 'false';
								cusmot_alert_fun('You have just encountered a technical failure ('+data.errCode+'). Please report it to our customer service representative if possible, thank you.');			//æ²¡æè¿ä¸ªè§é¢
						}
						else if(data.result=='-5'){
								msg_.show().html('Order already exists');
						}
					}
				});
			}
		}
	});
})

function login_callback_(n,m){	
	$.ajax({
		url:"https://secure.cctvplus.com/interface/selOrder.do",
		dataType:'jsonp',  
		data:{ORDER_STATE:0},
		success : function (data){
			var ord_ = [];
			if(data && data.result==1 && data.list){
				var list = data.list;
				for(var i = 0; i < list.length ; i++) {
					ord_.push('<li class="option" ord_id="',list[i].orderID,'">',list[i].ordername,'</li>');  
				}
			}
			$("#order_sel_box .custom_sel_list").html(ord_.join(''));
		}
	});
}




 
function _facebook(){
	var detailBuyPath = $("#detailBuyPath").val();
	var pubTitle = $("#pubTitle").val();
	var url = 'http://www.facebook.com/share.php?u='+detailBuyPath+'&t='+pubTitle;
	window.open (url,'','height=300,width=700,top=100,left=400,toolbar=no,menubar=no,scrollbars=no, resizable=no,location=no, status=no');
	var mid = $("#detail_infotab li.cur").attr("midd");
	var dcid = $("#detail_infotab li.cur").attr("dcidd");
	$.getJSON('https://secure.cctvplus.com/interface/shareRecord.do?callback=?',{"MID":mid,"DCID":dcid,"shareType":"2","type":"archive"},function(d_){
	});
}
function _twitter(){
	var detailBuyPath = $("#detailBuyPath").val();
	var pubTitle = $("#pubTitle").val();
	var url = 'http://twitter.com/share?&text='+pubTitle+'&url='+detailBuyPath;
	window.open (url,'','height=430,width=700,top=100,left=400,toolbar=no,menubar=no,scrollbars=no, resizable=no,location=no, status=no');
	var mid = $("#detail_infotab li.cur").attr("midd");
	var dcid = $("#detail_infotab li.cur").attr("dcidd");
	$.getJSON('https://secure.cctvplus.com/interface/shareRecord.do?callback=?',{"MID":mid,"DCID":dcid,"shareType":"1","type":"archive"},function(d_){
	});
}
function _linkedin(){
	var detailBuyPath = $("#detailBuyPath").val();
	var pubTitle = $("#pubTitle").val();
	var url = 'http://www.linkedin.com/shareArticle?mini=true&url='+detailBuyPath+'&title='+pubTitle;
	window.open (url,'','height=550,width=750,top=100,left=400,toolbar=no,menubar=no,scrollbars=no, resizable=no,location=no, status=no');
	var mid = $("#detail_infotab li.cur").attr("midd");
	var dcid = $("#detail_infotab li.cur").attr("dcidd");
	$.getJSON('https://secure.cctvplus.com/interface/shareRecord.do?callback=?',{"MID":mid,"DCID":dcid,"shareType":"3","type":"archive"},function(d_){
	});
}
