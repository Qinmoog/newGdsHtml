$(function(){
	
//	!function(){
//		var oHead = document.getElementsByTagName('HEAD').item(0),
//		//  var oScript1= document.createElement("script"),
//	    	oScript2 = document.createElement("script");
//		//  oScript1.type = "text/javascript";
//	  	 	oScript2.type = "text/javascript";
//		//  oScript1.src="./js/radiant_mp4.js";
//		    oScript2.src="/js/rmp.min.js";
//		//  oHead.appendChild( oScript1);
//		    oHead.appendChild( oScript2);
//	    
//	}();
	
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
//			console.log('点击');
			var d_l_ = $(this).children('.d_item_s');
			d_l_.html('Loading...');	
			var format = $(this).attr("format");
			var mid = $("#detail_infotab li.cur").attr("mid");
			var dcid = $("#detail_infotab li.cur").attr("dcid");
			var inp_mid = $("#mid_inp").val();
			var inp_dcid = $("#dcid_inp").val();
			var strHref = location.href;
			var subType = strHref.split('/')[3];
			var type = 'News';
			if(subType == 'exchange'){
				type = 'Exchange';
			}
			if(format!='METADATA'){
				$.getJSON('https://secure.cctvplus.com/interface/downloadUrl.do?callback=?',{"MID":inp_mid,"DCID":inp_dcid,"type":type,"format":format},function(d_){
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
//	$('#ckplayer_a1').remove();

}

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
	 
//  $(".detail_page .f_r").after("<div class='same_news' style='width:348px;float:right;margin-top:50px;'></div>");
	$(".detail_page .f_r").append("<div class='same_news' style='width:348px;margin-top:50px;'></div>");
    //$(".same_news").append("<h2>More</h2>");
	  $.ajax({
	     type: "POST",
		 //url: 'https://secure.cctvplus.com/news/getRelevant.do',
		 //url: 'http://10.0.9.27:8080/GDS_UC/news/getRelevant.do',
		 url: 'https://secure.cctvplus.com/news/getLatestNews.do',
		 data: {DCID:$("#dcid_inp").val(),
		 		Language:1				
		 },
		 dataType:'jsonp',
		 cache: false,
		 crossDomain: true,
		 //async: false,
		 success: function(data){
			 
			 $(".same_news").html("<h2>More</h2><input id='dcidList' type='hidden' value='"+data.numList+"' />");
			 
		    if(null != data.relevantNewList && data.relevantNewList.length>0){
			
		     for(var i = 0;i<data.relevantNewList.length;i++){
                     //alert(data.relevantNewList[i].detailPath);
                     var path = data.relevantNewList[i].imgPathCD;
                     var paths = path.split("/");
                     var snames = paths[3].split("_");
                     //var newpath = "http://www.cctvplus.com/news/"+paths[1]+paths[2]+"/"+snames[0]+".shtml#!language="+data.relevantNewList[i].Language;
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
				 //$(".top_list_box").append($(this).html());
			 }else if(dcids[1]==$(this).find(".dcidyc").val()){
				 newList1.push($(this));
				 //$(".top_list_box").append($(this).html());
			 }else if(dcids[2]==$(this).find(".dcidyc").val()){
				 newList2.push($(this));
				 //$(".top_list_box").append($(this).html());
			 }else if(dcids[3]==$(this).find(".dcidyc").val()){
				 newList3.push($(this));
				 //$(".top_list_box").append($(this).html());
			 }else if(dcids[4]==$(this).find(".dcidyc").val()){
				 newList4.push($(this));
				 //$(".top_list_box").append($(this).html());
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
		 
		 }
	  });
	 
	 
	 
	 $.ajax({
	     type: "POST",
		 url: 'https://secure.cctvplus.com/news/getLatestNews.do',
		 data: {DCID:$("#dcid_inp").val(),
		 		Language:1				
		 },
		 dataType:'jsonp',
		 cache: false,
		 crossDomain: true,
	     success: function(data){
			 $(".md_01_title").html("More<input id='dcidms' type='hidden' value='"+data.numList+"' />");
			 if(null != data.relevantNewList && data.relevantNewList.length>0){
				 for(var i = 0;i<data.relevantNewList.length;i++){
					 var newpath = data.relevantNewList[i].detailPath;
					 var newcontent = "<li class='item_li' style='display:none;' dcid='"+data.relevantNewList[i].DCID+"'>"
					                 +"<a href='"+newpath+"' language='"+data.relevantNewList[i].Language+"'>"
									 +"<dl>"
									 +"<dt><img src='"+data.relevantNewList[i].imgDomainCD+data.relevantNewList[i].imgPathCD+"' /></dt>"
									 +"<dd>"
									 +"<p>"+data.relevantNewList[i].PubTitle+"</p>"
									 +"<p>ID:"+data.relevantNewList[i].DCID+"</p>"
									 +"</dd>"
									 +"</dl>"
									 +"</a>"
					                 +"</li>";
				     $(".top_list_box").find("ul").append(newcontent);					 
				 }
				 var dcids = $("#dcidms").val().split(","); 
				$(".item_li").each(function(){
					if(dcids[0]==$(this).attr("dcid")){
						knewList0.push($(this));
					}else if(dcids[1]==$(this).attr("dcid")){
						knewList1.push($(this));
					}else if(dcids[2]==$(this).attr("dcid")){
						knewList2.push($(this));
					}else if(dcids[3]==$(this).attr("dcid")){
						knewList3.push($(this));
					}else if(dcids[4]==$(this).attr("dcid")){
						knewList4.push($(this));
					}
				}); 
				
				if(null != knewList0 && knewList0.length>0){
			      var flag0 = false;
			      for(var a=0;a<knewList0.length;a++){
				    if(language==$(knewList0[a]).find("a").attr("language")){
					   flag0 = true;
					   $(knewList0[a]).show();
				    }
			      }
			      if(!flag0){
				   for(var aa=0;aa<knewList0.length;aa++){
					   if(1==$(knewList0[aa]).find("a").attr("language")){
						   $(knewList0[aa]).show();
					   }
				   }
			     }
		        }
				if(null != knewList1 && knewList1.length>0){
			      var flag1 = false;
			      for(var b=0;b<knewList1.length;b++){
				     if(language==$(knewList1[b]).find("a").attr("language")){
					   flag1 = true;
					   $(knewList1[b]).show();
				     }
			      }
			      if(!flag1){
				     for(var bb=0;bb<knewList1.length;bb++){
					   if(1==$(knewList1[bb]).find("a").attr("language")){
						   $(knewList1[bb]).show();
					   }
				     }
			      }
		        }
				if(null != knewList2 && knewList2.length>0){
			       var flag2 = false;
			       for(var c=0;c<knewList2.length;c++){
				      if(language==$(knewList2[c]).find("a").attr("language")){
					   flag2 = true;
					   $(knewList2[c]).show();
				      }
			       }
			       if(!flag2){
				      for(var cc=0;cc<knewList2.length;cc++){
					     if(1==$(knewList2[cc]).find("a").attr("language")){
						   $(knewList2[cc]).show();
					     }
				      }
			      }
		        }
				if(null != knewList3 && knewList3.length>0){
			       var flag3 = false;
			       for(var d=0;d<knewList3.length;d++){
				      if(language==$(knewList3[d]).find("a").attr("language")){
					   flag3 = true;
					   $(knewList3[d]).show();
				      }
			       }
			       if(!flag3){
				      for(var dd=0;dd<knewList3.length;dd++){
					      if(1==$(knewList3[dd]).find("a").attr("language")){
						   $(knewList3[dd]).show();
					      }
				     }
			       }
		        }
				if(null != knewList4 && knewList4.length>0){
			       var flag4 = false;
			       for(var e=0;e<knewList4.length;e++){
				      if(language==$(knewList4[e]).find("a").attr("language")){
					   flag4 = true;
					   $(knewList4[e]).show();
				      }
			       }
			       if(!flag4){
				     for(var ee=0;ee<knewList4.length;ee++){
					   if(1==$(knewList4[ee]).find("a").attr("language")){
						   $(knewList4[ee]).show();
					   }
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
					if(lang == $(knewList0[a]).find("a").attr("language")){
						flag0 = true;
						$(knewList0[a]).show();
					}else{
						$(knewList0[a]).hide();
					}
				}
				
				if(!flag0){
					for(var aa=0;aa<knewList0.length;aa++){
						if(1==$(knewList0[aa]).find("a").attr("language")){
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
					if(lang == $(knewList1[b]).find("a").attr("language")){
						flag1 = true;
						$(knewList1[b]).show();
					}else{
						$(knewList1[b]).hide();
					}
				}
				
				if(!flag1){
					for(var bb=0;bb<knewList1.length;bb++){
						if(1==$(knewList1[bb]).find("a").attr("language")){
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
					if(lang == $(knewList2[c]).find("a").attr("language")){
						flag2 = true;
						$(knewList2[c]).show();
					}else{
						$(knewList2[c]).hide();
					}
				}
				
				if(!flag2){
					for(var cc=0;cc<knewList2.length;cc++){
						if(1==$(knewList2[cc]).find("a").attr("language")){
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
					if(lang == $(knewList3[d]).find("a").attr("language")){
						flag3 = true;
						$(knewList3[d]).show();
					}else{
						$(knewList3[d]).hide();
					}
				}
				
				if(!flag3){
					for(var dd=0;dd<knewList3.length;dd++){
						if(1==$(knewList3[dd]).find("a").attr("language")){
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
					if(lang == $(knewList4[e]).find("a").attr("language")){
						flag4 = true;
						$(knewList4[e]).show();
					}else{
						$(knewList4[e]).hide();
					}
				}
				
				if(!flag4){
					for(var ee=0;ee<knewList4.length;ee++){
						if(1==$(knewList4[ee]).find("a").attr("language")){
							$(knewList4[ee]).show();
						}else{
							$(knewList4[ee]).hide();
						}
					}
				}
			}
		
     });
	
   });
   
  





 
 
 


 

