$(function(){

	var screenWidth=$(this).innerWidth();  //获取当前屏幕宽度
	var count_num = 1;
	var seach_check_LL ={"keyword_":""};
	var key_word_uri_ = decodeURIComponent(Request_url_fun('keyword'));
	seach_check_LL['keyword_']=($.trim(key_word_uri_).length>0)?key_word_uri_:seach_check_LL['keyword_'];
	
	$('input').iCheck({
		radioClass: 'iradio_square',
		checkboxClass: 'icheckbox_square',
		increaseArea: '10%'
	});
	$('#navmain_2015box_2').addClass('cur');
	search_fun_LL(1);
	search_load_fun(1);

	$(".subsearch_btn").click(function(){
		var ss = $("#custom_sel_val").val();
		if(ss=='ord11111'){
			window.location.href="/news/latest.shtml#!keyword="+encodeURIComponent($.trim((($('#subsearch_val').val()==$('#subsearch_val').prop('defaultValue'))?'':$('#subsearch_val').val())));
		}else if(ss=='ord22222'){
			window.location.href="/archive/allArchive.shtml#!keyword="+encodeURIComponent($.trim((($('#subsearch_val').val()==$('#subsearch_val').prop('defaultValue'))?'':$('#subsearch_val').val())));
		}else if(ss=='ord33333'){
			window.location.href="/exchange/allExchange.shtml#!keyword="+encodeURIComponent($.trim((($('#subsearch_val').val()==$('#subsearch_val').prop('defaultValue'))?'':$('#subsearch_val').val())));
		}else{			
			seach_check_LL['keyword_'] = encodeURIComponent($.trim((($('#subsearch_val').val()==$('#subsearch_val').prop('defaultValue'))?'':$('#subsearch_val').val())));
			search_fun_LL(1);
		}
		
		var searchType = 'multiMedia';
		if(ss=='ord11111'){
			searchType = 'News';
		}else if(ss=='ord22222'){
			searchType = 'archive';
		}else if(ss=='ord33333'){
			searchType = 'exchange';
		}else if(ss=='ord44444'){
			searchType = 'multiMedia';
		}
		$.getJSON('https://secure.cctvplus.com/interface/searchRecord.do?callback=?',{"keyword":$.trim($('#subsearch_val').val()),"type":searchType},function(d_){
		});
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
	
	//pc数据翻页
	$("#search_list_box").on('click','.cus_page_btns>a',function(){
		search_fun_LL($(this).attr('data-page'));
	})
	
	//点击加载更多
	$(".loadMore_btn").click(function(){
		count_num++;
		search_load_fun(count_num,'more');
	})
	
	
	$(window).resize(function(){
		changeImgSize();
	});
	
	function changeImgSize(){
		$(".big_item").each(function(){
			$(this).find('img').css({'height':Math.round($(this).width()/16*9)+'px'});
		})
		$(".small_item").each(function(){
			$(this).find('img').css({'height':Math.round($(this).width()/16*9)+'px'});
		})
	}
	
	$("#subsearch_val_box_btn").click(function(){
		var ss = $(".custom_sel_text_s").attr('ord_id');
		if(ss=='ord11111'){
			window.location.href="/news/latest.shtml#!keyword="+encodeURIComponent($.trim((($('#subsearch_val_s').val()==$('#subsearch_val_s').prop('defaultValue'))?'':$('#subsearch_val_s').val())));
		}else if(ss=='ord22222'){
			window.location.href="/archive/allArchive.shtml#!keyword="+encodeURIComponent($.trim((($('#subsearch_val_s').val()==$('#subsearch_val_s').prop('defaultValue'))?'':$('#subsearch_val_s').val())));
		}else if(ss=='ord33333'){
			window.location.href="/exchange/allExchange.shtml#!keyword="+encodeURIComponent($.trim((($('#subsearch_val_s').val()==$('#subsearch_val_s').prop('defaultValue'))?'':$('#subsearch_val_s').val())));
		}else{			
			seach_check_LL['keyword_'] = encodeURIComponent($.trim((($('#subsearch_val_s').val()==$('#subsearch_val_s').prop('defaultValue'))?'':$('#subsearch_val_s').val())));
			search_load_fun(1);
		}
	
		var searchType = 'multiMedia';
		if(ss=='ord11111'){
			searchType = 'News';
		}else if(ss=='ord22222'){
			searchType = 'archive';
		}else if(ss=='ord33333'){
			searchType = 'exchange';
		}else if(ss=='ord44444'){
			searchType = 'multiMedia';
		}
		$.getJSON('https://secure.cctvplus.com/interface/searchRecord.do?callback=?',{"keyword":$.trim($('#subsearch_val_s').val()),"type":searchType},function(d_){
		});
	});		
		
	$('#subsearch_val_s').keypress(function(e){
		if(e.keyCode==13){$('#subsearch_val_box_btn').click();}
	}).blur(function(){
		var this_ = $(this);
		if(!$.trim(this_.val())){this_.val(this_.prop('defaultValue'));}
	}).focus(function(){
		var this_ = $(this);
		if(this_.val()==this_.prop('defaultValue')){this_.val('');}
	});
	
	//PC端
	function search_fun_LL(curpage){
		var channel_code = $("#channel_code").val();
		var search_list_box = $("#search_list_box");
		var pagesize = 16;
		search_list_box.html('<p style="text-align:center; padding:10px;">Loading...</p>');
		$.getJSON('https://secure.cctvplus.com/searchInterface/multiMedia.do?callback=?',
//		$.getJSON('http://localhost:8080/GDS_UC/searchInterface/multiMedia.do?callback=?',
		{
			'pageSize':pagesize,
			'pageNo':curpage,
			'channel':channel_code,
			'searchTitle':encodeURIComponent(decodeURIComponent(seach_check_LL.keyword_))
		},
		function(data){
			if(!data || !data.categorys || !data.categorys.length){
				search_list_box.html('<p style="text-align:center; padding:10px;">No data</p>'); 
				return;
			}
			var lis=data.categorys;	
			var itemsum=data.numFound;			
			if(itemsum<=0){
				search_list_box.html('<p style="text-align:center; padding:10px;">No data</p>'); 
				return;
			}
			pagesum=Math.ceil(itemsum/pagesize);
			var html_arr = [],len_ = lis.length,j_ = 0;  
			for(var i = 0; i <=Math.floor((len_-1)/4); i++){
				html_arr.push('<ul class="custom_list_box3">');
				for(var j=0; j<4; j++){
					html_arr.push('<li>');
					html_arr.push('<a href="',lis[j_].detailPath,'" target="_blank"><img src="',lis[j_].spic,'" height="164" width="292" /></a>');
					html_arr.push('<h3><a href="',lis[j_].detailPath,'" target="_blank">',lis[j_].pubtitle,'</a></h3>');
					html_arr.push('</li>');
					j_++;
					if(j_>=len_){break;}
				}
				html_arr.push('</ul>');
			}
			html_arr.push('<div class="vspace"></div>');
			var textArr = new Array();	
			textArr.push('<div class="cus_page_btns">');		
			if(curpage>1){		
				textArr.push('<a onselectstart="return false;" data-page="',curpage-1,'" class="prev">Prev</a>');
				textArr.push('<a onselectstart="return false;" data-page="',curpage-1,'" class="prev_btn">&nbsp;</a>');			
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
						textArr.push('<a onselectstart="return false;" class="" data-page="',i,'" >',i,'</a>');
					}
				}
			}
			if(pagesum<=5){
				beginpage=1;
				endpage=pagesum;
				set_page_fun();
			}else{//如果显示最前面的四页
				if(curpage<5&&curpage>0){
					beginpage=1;
					endpage=5;
					set_page_fun();
					textArr.push('<a onselectstart="return false;" style="cursor:default;" data-page="',endpage+1,'">...</a>');
					textArr.push('<a onselectstart="return false;" data-page="',pagesum,'">',pagesum,'</a>');
				}else if(curpage<=pagesum&&curpage>=(pagesum-4)){//如果显示最后面的五页
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
					textArr.push('<a onselectstart="return false;" style="cursor:default;"  data-page="',endpage+1,'">...</a>');
					textArr.push('<a onselectstart="return false;" data-page="',pagesum,'">',pagesum,'</a>');
				}
			}
			
			if(curpage<pagesum){
				textArr.push('<a onselectstart="return false;" data-page="',1+Number(curpage),'" class="next_btn">&nbsp;</a>');
				textArr.push('<a onselectstart="return false;" data-page="',1+Number(curpage),'" class="next">Next</a>');
			}else{
				textArr.push('<a style="cursor:default;" onselectstart="return false;" class="next_btn">&nbsp;</a>');
				textArr.push('<a style="cursor:default;" onselectstart="return false;" class="next">Next</a>');
			}
			textArr.push('<div class="clear"></div></div><div class="clear"></div>');
			search_list_box.html(html_arr.join('')+'<div class="custom_page_box">'+textArr.join('')+'</div><div class="vspace"></div>')
		});
	}
	
	//移动端
	function search_load_fun(curpage,type_){
		var channel_code = $("#channel_code").val(),
			search_list_big = $("#search_list_big"),
			search_list_small = $("#search_list_small"),
			searchTitle_s = $("#subsearch_val_s").val();
		var pagesize = 16;

//		$.getJSON('http://localhost:8080/GDS_UC/searchInterface/multiMedia.do?callback=?',
		$.getJSON('https://secure.cctvplus.com/searchInterface/multiMedia.do?callback=?',
		{
			'pageSize':pagesize,
			'pageNo':curpage,
			'channel':channel_code,
			'searchTitle':encodeURIComponent(decodeURIComponent(seach_check_LL.keyword_))
		},
		function(data){
			if( data.numFound <= pagesize*curpage ){
				$(".loadMore_btn").hide();
			}else{
				$(".loadMore_btn").show();
			}
			if(!data || !data.categorys.length || data.categorys.length == 0 ){
				search_list_big.html('<p style="text-align:center; padding:10px;">No data</p>');
				search_list_small.html('');
				return;
			}
			
			var lis=data.categorys;
			var html_arr = [],
				html_arr_ = [],
				len_ = lis.length
				init_num = 2;
			if( type_ != 'more' ){//加载更多，append
				search_list_big.html('');
				search_list_small.html('');
			}
			if( len_ <= init_num ){
				init_num = len_
			}
			if( curpage == 1 ){
				for( var i=0;i<init_num;i++ ){
					html_arr_.push('<li class="big_item"><a href="',lis[i].detailPath,'">');
					html_arr_.push('<div class="item_img"><img src="',lis[i].spic,'"/></div>');
					html_arr_.push('<div class="item_text"><h1>',lis[i].pubtitle,'</h1></div>');
					html_arr_.push('</a></li>');
				}
				html_arr.push('<div class="clear"></div>');
				search_list_big.append(html_arr.join(''));
				for( var j=1;j<=len_-init_num;j++ ){
					html_arr_.push('<li class="small_item"><a href="',lis[j].detailPath,'">');
					html_arr_.push('<div class="item_img"><img src="',lis[j].spic,'"/></div>');
					html_arr_.push('<div class="item_text"><h1>',lis[j].pubtitle,'</h1></div>');
					html_arr_.push('</a></li>');
				}
				search_list_small.append(html_arr_.join(''));
			}else{
				for( var m=0;m<len_;m++ ){
					html_arr_.push('<li class="small_item"><a href="',lis[m].detailPath,'">');
					html_arr_.push('<div class="item_img"><img src="',lis[m].spic,'"/></div>');
					html_arr_.push('<div class="item_text"><h1>',lis[m].pubtitle,'</h1></div>');
					html_arr_.push('</a></li>');
				}
				search_list_small.append(html_arr_.join(''));
			}				
			changeImgSize();
		});
	}
	
	$(window).resize(function(){
		changeImgSize();
	});
	
	function changeImgSize(){
		$(".big_item").each(function(){
			$(this).find('img').css({'height':($(this).width()/16*9)+'px'});
		})
		$(".small_item").each(function(){
			$(this).find('img').css({'height':($(this).width()/16*9)+'px'});
		})	
	}
		
})