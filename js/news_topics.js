window.onload = function(){
		changeImgSize();
		function changeImgSize(){
		
			$(".big_item").each(function(){
				$(this).find('img').css({'height':($(this).width()/16*9)+'px'});
			})
			$(".small_item").each(function(){
				$(this).find('img').css({'height':($(this).width()/16*9)+'px'});
			})
			
		}
	}
$(function(){

	var screenWidth=$(this).innerWidth();  //获取当前屏幕宽度
	var count_num = 1;
	var this_tid_ = Request_url_fun('tid');
	var elementID;
	var rmp;
	var first_times = 0;
	var videoEl;
	
	$('#navmain_2015box_2').addClass('cur');
	$('input').iCheck({
		radioClass: 'iradio_square',
		checkboxClass: 'icheckbox_square',
		increaseArea: '10%'
	});
	
	$(".subsearch_btn").click(function(){
		var ss = $("#custom_sel_val").val();
		if($('#custom_sel_val').val()=='ord22222'){			
			window.location.href="/archive/allArchive.shtml#!keyword="+encodeURIComponent($.trim((($('#subsearch_val').val()==$('#subsearch_val').prop('defaultValue'))?'':$('#subsearch_val').val())));
		}else if($('#custom_sel_val').val()=='ord33333'){
			window.location.href="/exchange/allExchange.shtml#!keyword="+encodeURIComponent($.trim((($('#subsearch_val').val()==$('#subsearch_val').prop('defaultValue'))?'':$('#subsearch_val').val())));
		}else{
			window.location.href="/news/latest.shtml#!keyword="+encodeURIComponent($.trim((($('#subsearch_val').val()==$('#subsearch_val').prop('defaultValue'))?'':$('#subsearch_val').val())));
		}
		//=========add wjj 搜索记录
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
		if(e.keyCode==13){
			if($('#subsearch_val').val()!=''){
				$(".subsearch_btn").click();
			}else{
				$('#subsearch_val').val('Search');
			}
		}
	});
	
	$("#subsearch_val_box_btn").click(function(){
		var ss = $(".custom_sel_text_s").attr('ord_id');
		if($(".custom_sel_text_s").attr('ord_id')=='ord22222'){			
			window.location.href="/archive/allArchive.shtml#!keyword="+encodeURIComponent($.trim((($('#subsearch_val_s').val()==$('#subsearch_val_s').prop('defaultValue'))?'':$('#subsearch_val_s').val())));
		}else if($(".custom_sel_text_s").attr('ord_id')=='ord33333'){
			window.location.href="/exchange/allExchange.shtml#!keyword="+encodeURIComponent($.trim((($('#subsearch_val_s').val()==$('#subsearch_val_s').prop('defaultValue'))?'':$('#subsearch_val_s').val())));
		}else{
			window.location.href="/news/latest.shtml?!keyword="+encodeURIComponent($.trim((($('#subsearch_val_s').val()==$('#subsearch_val_s').prop('defaultValue'))?'':$('#subsearch_val_s').val())));
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
		$.getJSON('https://secure.cctvplus.com/interface/searchRecord.do?callback=?',{"keyword":$.trim($('#subsearch_val_s').val()),"type":searchType},function(d_){
		});
	})
	
	$('#subsearch_val_s').keypress(function(e){
		if(e.keyCode==13){$('#subsearch_val_box_btn').click();}
	}).blur(function(){
		var this_ = $(this);
		if(!$.trim(this_.val())){this_.val(this_.prop('defaultValue'));}
	}).focus(function(){
		var this_ = $(this);
		if(this_.val()==this_.prop('defaultValue')){this_.val('');}
	});
	
	
	$(window).resize(function(){
		changeImgSize();
	});
	
	function changeImgSize(){
		
		$(".big_item").each(function(){
//				console.log( $(this) );
//				console.log( $(this).width()/16*9 );
			$(this).find('img').css({'height':($(this).width()/16*9)+'px'});
		})
		$(".small_item").each(function(){
			$(this).find('img').css({'height':($(this).width()/16*9)+'px'});
		})
		
	}
	
})