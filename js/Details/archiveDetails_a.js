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
	
	tab_md_fun2('detail_infotab','language');
	
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
							synchronizing = 'false';
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
							synchronizing = 'false';
							cusmot_alert_fun('Order already exists');
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

function init_p(uu_){ 
	var bitrates = {
			mp4: [
				uu_				
			  ]

		};
		var settings = {
		    licenseKey: 'Kl8leXk3OWdjODAyeWVpP3JvbTVkYXNpczMwZGIwQSVfKg==',
		    bitrates: bitrates,
		    delayToFade: 3000,
		    width:'100%',
		    height:'100%',
//		    width: 820,
//		    height: 460,
		    preload: 'auto',
			skin: 's4',
			skinBackgroundColor: 'rgba(0, 0, 0, 0.45)',
			skinButtonColor: 'FFFFFF',
			skinAccentColor: '000000'
		};
	
	$('#video_box').html('');
	
	var elementID = 'video_box';
	var rmp = new RadiantMP(elementID);	
	rmp.init(settings);
//	$('#ckplayer_a1').remove();

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



$(function(){
	 var newList0=[];
	 var newList1=[];
	 var newList2=[];
	 var newList3=[];
	 var newList4=[];
	 
	 var knewList0=[];
	 var knewList1=[];
	 var knewList2=[];
	 var knewList3=[];
	 var knewList4=[];
	 var strUrl = window.location.href;
     var language = strUrl[strUrl.length-1];
	 
	$(".detail_page .f_r").after("<div class='same_news' style='width:348px;float:right;margin-top:50px;'></div>");
	$.ajax({
		type: "POST",
		
		 //url: 'http://10.0.9.27:8080/GDS_UC/news/getRelevant.do',
		 url: 'http://172.20.1.9:8890/news/getRelevant.do',
		 data: {DCID:$(".info_list").children().eq(0).text().substring(4,$(".info_list").children().eq(0).text().length).trim(),
		 		Language:1				
		 },
		 dataType:'jsonp',
		 cache: false,
		 crossDomain: true,
		 success: function(data){
			$(".same_news").html("<h2>More</h2><input id='dcidList' type='hidden' value='"+data.numList+"' />"); 
			if(null != data.relevantNewList && data.relevantNewList.length>0){
			   for(var i = 0;i<data.relevantNewList.length;i++){
                     //alert(data.relevantNewList[i].detailPath);
                     var path = data.relevantNewList[i].imgPathCD;
                     var paths = path.split("/");
                     var snames = paths[3].split("_");
                     //var newpath = "http://172.20.1.9/news/"+paths[1]+paths[2]+"/"+snames[0]+".shtml#!language="+data.relevantNewList[i].Language;
					 var newpath = data.relevantNewList[i].detailPath;
                     var newcontent = "<div class='same_news_num' style='display:none;' language='"+data.relevantNewList[i].Language+"'>"
					       +"<a href='"+newpath+"'><div class='rele_new' language='"+data.relevantNewList[i].Language+"' style='position: relative;text-align:center;margin-top:20px;padding-bottom: 10px;border:1px solid #E9E9E9;width:292px;height:250px;'>"
                           +"<img src='"+data.relevantNewList[i].imgDomainCD+data.relevantNewList[i].imgPathCD+"' /><br/>"
                           +"<h3 style='font-size:20px;line-height:25px;font-weight:bold;min-height:50px;height:50px;overflow:hidden;text-align:left;margin-left:15px;'>"+data.relevantNewList[i].PubTitle+"</h3>"
                           +"<span style='font-size:14px;left:20px;position: absolute;top:230px;'>ID:"+data.relevantNewList[i].DCID+"</span>"
						   +"<input class='dcidyc' type='hidden' value='"+data.relevantNewList[i].DCID+"' />"
                           +"</div></a></div>";
                    $(".same_news").append(newcontent);
               }

			   
			  var dcids = $("#dcidList").val().split(",");
			  $(".same_news_num").each(function(){
			     if(dcids[0]==$(this).find(".dcidyc").val()){
				    newList0.push($(this));
					$(".top_list_box").append($(this).html());
			     }else if(dcids[1]==$(this).find(".dcidyc").val()){
				    newList1.push($(this));
					$(".top_list_box").append($(this).html());
			     }else if(dcids[2]==$(this).find(".dcidyc").val()){
				    newList2.push($(this));
					$(".top_list_box").append($(this).html());
			     }else if(dcids[3]==$(this).find(".dcidyc").val()){
				    newList3.push($(this));
					$(".top_list_box").append($(this).html());
			     }else if(dcids[4]==$(this).find(".dcidyc").val()){
				    newList4.push($(this));
					$(".top_list_box").append($(this).html());
			     }
	          });
			  
			  if(null != newList0 && newList0.length>0){
			     var flag0 = false;
			     for(var a=0;a<newList0.length;a++){
				    if(language==$(newList0[a]).attr("language")){
					   flag0 = true;
					   $(newList0[a]).show();
				    }
			     }
			   if(!flag0){
				   for(var aa=0;aa<newList0.length;aa++){
					   if(1==$(newList0[aa]).attr("language")){
						   $(newList0[aa]).show();
					   }
				   }
			   }
		     }
			 
			 if(null != newList1 && newList1.length>0){
			   var flag1 = false;
			   for(var b=0;b<newList1.length;b++){
				   if(language==$(newList1[b]).attr("language")){
					  flag1 = true; 
					  $(newList1[b]).show();
				   }
			   }
			   if(!flag1){
				   for(var bb=0;bb<newList1.length;bb++){
					 if(1==$(newList1[bb]).attr("language")){
						 $(newList1[bb]).show();
					 }  
				   }
			   }
		     }
			 
			 if(null != newList2 && newList2.length>0){
			   var flag2 = false;
			   for(var c=0;c<newList2.length;c++){
				   if(language==$(newList2[c]).attr("language")){
					   flag2 = true;
					   $(newList2[c]).show();
				   }
			   }
			   if(!flag2){
				   for(var cc=0;cc<newList2.length;cc++){
					   if(1==$(newList2[cc]).attr("language")){
						   $(newList2[cc]).show();
					   }
				   }
			   }
		     }
			 if(null != newList3 && newList3.length>0){
			   var flag3 = false;
			   for(var d=0;d<newList3.length;d++){
				   if(language==$(newList3[d]).attr("language")){
					   flag3 = true;
					   $(newList3[d]).show();
				   }
			   }
			   if(!flag3){
				   for(var dd=0;dd<newList3.length;dd++){
					   if(1==$(newList3[dd]).attr("language")){
						   $(newList3[dd]).show();
					   }
				   }
			   }
		     }
			 
			 if(null != newList4 && newList4.length>0){
			   var flag4 = false;
			   for(var e=0;e<newList4.length;e++){
				   if(language==$(newList4[e]).attr("language")){
					 flag4 = true;
					 $(newList4[e]).show();
				   }
			   }
			   if(!flag4){
				   for(var ee=0;ee<newList4.length;ee++){
					   if(1==$(newList4[ee]).attr("language")){
						   $(newList4[ee]).show();
					   }
				   }
			   }
		     }
			 
			  
			} 
			
			$(".top_list_box").find("a").each(function(){
			   $(this).hide();
			   if(dcids[0]==$(this).find(".dcidyc").val()){
				  knewList0.push($(this));
			   }else if(dcids[1]==$(this).find(".dcidyc").val()){
				  knewList1.push($(this));
			   }else if(dcids[2]==$(this).find(".dcidyc").val()){
				  knewList2.push($(this));
			   }else if(dcids[3]==$(this).find(".dcidyc").val()){
				  knewList3.push($(this));
			   }else if(dcids[4]==$(this).find(".dcidyc").val()){
				  knewList4.push($(this));
			   }
		  });
		  
		  if(null != knewList0 && knewList0.length>0){
			   var flag0 = false;
			   for(var a=0;a<knewList0.length;a++){
				   if(language==$(knewList0[a]).find(".rele_new").attr("language")){
					   flag0 = true;
					   $(knewList0[a]).show();
				   }
			   }
			   if(!flag0){
				   for(var aa=0;aa<knewList0.length;aa++){
					   if(1==$(knewList0[aa]).find(".rele_new").attr("language")){
						   $(knewList0[aa]).show();
					   }
				   }
			   }
		   }
		   
		   if(null != knewList1 && knewList1.length>0){
			   var flag1 = false;
			   for(var b=0;b<knewList1.length;b++){
				   if(language==$(knewList1[b]).find(".rele_new").attr("language")){
					   flag1 = true;
					   $(knewList1[b]).show();
				   }
			   }
			   if(!flag1){
				   for(var bb=0;bb<knewList1.length;bb++){
					   if(1==$(knewList1[bb]).find(".rele_new").attr("language")){
						   $(knewList1[bb]).show();
					   }
				   }
			   }
		   }
		   
		   if(null != knewList2 && knewList2.length>0){
			   var flag2 = false;
			   for(var c=0;c<knewList2.length;c++){
				   if(language==$(knewList2[c]).find(".rele_new").attr("language")){
					   flag2 = true;
					   $(knewList2[c]).show();
				   }
			   }
			   if(!flag2){
				   for(var cc=0;cc<knewList2.length;cc++){
					   if(1==$(knewList2[cc]).find(".rele_new").attr("language")){
						   $(knewList2[cc]).show();
					   }
				   }
			   }
		   }
		   
		   if(null != knewList3 && knewList3.length>0){
			   var flag3 = false;
			   for(var d=0;d<knewList3.length;d++){
				   if(language==$(knewList3[d]).find(".rele_new").attr("language")){
					   flag3 = true;
					   $(knewList3[d]).show();
				   }
			   }
			   if(!flag3){
				   for(var dd=0;dd<knewList3.length;dd++){
					   if(1==$(knewList3[dd]).find(".rele_new").attr("language")){
						   $(knewList3[dd]).show();
					   }
				   }
			   }
		   }
		   
		   if(null != knewList4 && knewList4.length>0){
			   var flag4 = false;
			   for(var e=0;e<knewList4.length;e++){
				   if(language==$(knewList4[e]).find(".rele_new").attr("language")){
					   flag4 = true;
					   $(knewList4[e]).show();
				   }
			   }
			   if(!flag4){
				   for(var ee=0;ee<knewList4.length;ee++){
					   if(1==$(knewList4[ee]).find(".rele_new").attr("language")){
						   $(knewList4[ee]).show();
					   }
				   }
			   }
		   }
		  
		  
		 }
	});
	
	
	$("#detail_infotab").on('click','li',function(){
		var lang = $(this).attr("hashash").split("=")[1];
		if(null != newList0 && newList0.length>0){
			var flag0 = false;
			for(var a=0;a<newList0.length;a++){
				if(lang==$(newList0[a]).attr("language")){
					flag0 = true;
					$(newList0[a]).show();
				}else{
					$(newList0[a]).hide();
				}
			}
			
			if(!flag0){
				for(var aa=0;aa<newList0.length;aa++){
					if(1==$(newList0[aa]).attr("language")){
						$(newList0[aa]).show();
					}else{
						$(newList0[aa]).hide();
					}
				}
			}
		}
		
		if(null != newList1 && newList1.length>0){
			var flag1 = false;
			for(var b=0;b<newList1.length;b++){
				if(lang==$(newList1[b]).attr("language")){
					flag1 = true;
					$(newList1[b]).show();
				}else{
					$(newList1[b]).hide();
				}
			}
			
			if(!flag1){
				for(var bb=0;bb<newList1.length;bb++){
					if(1==$(newList1[bb]).attr("language")){
						$(newList1[bb]).show();
					}else{
						$(newList1[bb]).hide();
					}
				}
			}
		}
		
		if(null != newList2 && newList2.length>0){
			var flag2 = false;
			for(var c=0;c<newList2.length;c++){
				if(lang==$(newList2[c]).attr("language")){
					flag2 = true;
					$(newList2[c]).show();
				}else{
					$(newList2[c]).hide();
				}
			}
			
			
			if(!flag2){
				for(var cc=0;cc<newList2.length;cc++){
					if(1==$(newList2[cc]).attr("language")){
						$(newList2[cc]).show();
					}else{
						$(newList2[cc]).hide();
					}
				}
			}
		}
		
		if(null != newList3 && newList3.length>0){
			var flag3 = false;
			for(var d=0;d<newList3.length;d++){
				if(lang==$(newList3[d]).attr("language")){
					flag3 = true;
					$(newList3[d]).show();
				}else{
					$(newList3[d]).hide();
				}
			}
			
			if(!flag3){
				for(var dd=0;dd<newList3.length;dd++){
					if(1==$(newList3[dd]).attr("language")){
						$(newList3[dd]).show();
					}else{
						$(newList3[dd]).hide();
					}
				}
			}
		}
		
		if(null != newList4 && newList4.length>0){
			var flag4 = false;
			for(var e=0;e<newList4.length;e++){
				if(lang==$(newList4[e]).attr("language")){
					flag4 = true;
					$(newList4[e]).show();
				}else{
					$(newList4[e]).hide();
				}
			}
			
			if(!flag4){
				for(var ee=0;ee<newList4.length;ee++){
					if(1==$(newList4[ee]).attr("language")){
						$(newList4[ee]).show();
					}else{
						$(newList4[ee]).hide();
					}
				}
			}
		}
		
		
		    if(null != knewList0 && knewList0.length>0){
				var flag0 = false;
				for(var a=0;a<knewList0.length;a++){
					if(lang == $(knewList0[a]).find(".rele_new").attr("language")){
						flag0 = true;
						$(knewList0[a]).show();
					}else{
						$(knewList0[a]).hide();
					}
				}
				
				if(!flag0){
					for(var aa=0;aa<knewList0.length;aa++){
						if(1==$(knewList0[aa]).find(".rele_new").attr("language")){
							$(knewList0[aa]).show();
						}else{
							$(knewList0[aa]).hide();
						}
					}
				}
			}
			
			if(null != knewList1 && knewList1.length>0){
				var flag1 = false;
				for(var b=0;b<knewList1.length;b++){
					if(lang == $(knewList1[b]).find(".rele_new").attr("language")){
						flag1 = true;
						$(knewList1[b]).show();
					}else{
						$(knewList1[b]).hide();
					}
				}
				
				if(!flag1){
					for(var bb=0;bb<knewList1.length;bb++){
						if(1==$(knewList1[bb]).find(".rele_new").attr("language")){
							$(knewList1[bb]).show();
						}else{
							$(knewList1[bb]).hide();
						}
					}
				}
			}
			
			if(null != knewList2 && knewList2.length>0){
				var flag2 = false;
				for(var c=0;c<knewList2.length;c++){
					if(lang == $(knewList2[c]).find(".rele_new").attr("language")){
						flag2 = true;
						$(knewList2[c]).show();
					}else{
						$(knewList2[c]).hide();
					}
				}
				
				if(!flag2){
					for(var cc=0;cc<knewList2.length;cc++){
						if(1==$(knewList2[cc]).find(".rele_new").attr("language")){
							$(knewList2[cc]).show();
						}else{
							$(knewList2[cc]).hide();
						}
					}
				}
			}
		
		
		    if(null != knewList3 && knewList3.length>0){
				var flag3 = false;
				for(var d=0;d<knewList3.length;d++){
					if(lang == $(knewList3[d]).find(".rele_new").attr("language")){
						flag3 = true;
						$(knewList3[d]).show();
					}else{
						$(knewList3[d]).hide();
					}
				}
				
				if(!flag3){
					for(var dd=0;dd<knewList3.length;dd++){
						if(1==$(knewList3[dd]).find(".rele_new").attr("language")){
							$(knewList3[dd]).show();
						}else{
							$(knewList3[dd]).hide();
						}
					}
				}
			}
			
			if(null != knewList4 && knewList4.length>0){
				var flag4 = false;
				for(var e=0;e<knewList4.length;e++){
					if(lang == $(knewList4[e]).find(".rele_new").attr("language")){
						flag4 = true;
						$(knewList4[e]).show();
					}else{
						$(knewList4[e]).hide();
					}
				}
				
				if(!flag4){
					for(var ee=0;ee<knewList4.length;ee++){
						if(1==$(knewList4[ee]).find(".rele_new").attr("language")){
							$(knewList4[ee]).show();
						}else{
							$(knewList4[ee]).hide();
						}
					}
				}
			}
		
		
		
	});

});
