$(function(){
	
	var index_1_ = 0;
	var tbox_ = $('#video_list_box'),
		tbox_w = tbox_.width(),
		player_box_ = $('#player_box_2015');
	var over_box_ = tbox_.find('.overflow_box');
	var scroll_box_ = $('#lunbo_listv'),
		items_ = scroll_box_.find('li.item'),
		item_len_ = items_.length;
	var item_w_ = items_.eq(0).outerWidth(true);
	var conts_ = $('div[id^="lunbo_listv_cont_"]');
	var player_info_ =$('#player_box_info');
	var W;
	var H;
	var self_de;
	var elementID;
	var rmp;
	
	
	
	$('#navmain_2015box_1').addClass('cur');
	
	$('input').iCheck({
		radioClass: 'iradio_square',
		checkboxClass: 'icheckbox_square',
		increaseArea: '10%'
	});
	
	Srcoll_indfun();
	$.getJSON('/js/NOTICE.js?'+Math.random(),function(d){
		 if(d && d.msg!=''){
			$('#index_meg_box_over ul').html('<li>'+d.msg+'</li>');
			$('.index_meg_box').show();
			wf_scroll_fun('index_meg_box_over',20);
		 }else{
			$('.index_meg_box').hide();
		 }
	});
	
	
	function Srcoll_indfun(){		
		var show_num = 5;
		
		init();	
		var scroll_num = 1;
		var scroll_w = item_w_*scroll_num;
		if(item_len_ > 8){	
			$.each(items_.slice(0,8),function(i, _item){
				scroll_box_.append($(_item).clone(true));
			});
		}
		var new_items = scroll_box_.find('li.item');
		new_items.click(function(){
			
			if (!$(this).hasClass('cur')){
				index_1_ = new_items.index($(this));
				new_items.removeClass('cur').filter(function(f_ind){return index_1_%item_len_==f_ind%item_len_}).addClass('cur');
				conts_.hide();
				$('#lunbo_listv_cont_'+(1+(index_1_%item_len_))).show();
				$(".item_c").each(function(){
					if( $(this).css("display") != "none" ){
						self_de = $(this).find("a").height();
	//					$(".item_c_").find("a").css({"margin-top":(-self_de/2)+"px"});
	//$(".item_c_").find("a").css({"top":(($('.item_c_').height()-self_de)/2)+"px"});
						$(this).find("h3").css({"height":$(".item_c").height() - $(".item_d").height()+"px"});
						$(this).find("h3").css({'display':'table-cell'});
						$(this).find("h3").css({'vertical-align':'middle'});
						
					}
				})
				change_vurl($(this).attr('play_pram'));//切换播放信号
			
			}
		});
		var next_btn = tbox_.find('.next_btn'), prev_btn = tbox_.find('.prev_btn'), scrolling = false;
		next_btn.click(function(){if(!scrolling){ _next(); return false;}});
		prev_btn.click(function(){if(!scrolling){ _prev(); return false;}});
		var scrollpos={};
		function _next(){
			var _scroll_w = (parseInt(scroll_box_.css('left')) - scroll_w);
			scrolling = true;
			scroll_box_.stop(true,true).animate({'left':_scroll_w +'px'},function(){if(_scroll_w <= -item_len_*item_w_){scroll_box_.css('left','0px');} scrolling = false;});
		}
		function _prev(){
			var _scroll_w = ((parseInt(scroll_box_.css('left'))>=0)&&(scroll_box_.css('left',-item_len_*item_w_+'px'))? (-(item_len_-1)*item_w_) : parseInt(scroll_box_.css('left'))+ scroll_w);
			scrolling = true;
			scroll_box_.stop(true,true).animate({'left':_scroll_w +'px'},function(){ scrolling = false;});
		}
		init_p(items_.eq(0).attr('play_pram'),items_.eq(0).attr('bigimg'));
	
	}
	
	function init(){
		var w_ = $(window).width();				
		var pb_w_ = (w_<=1400)? 860 : (w_>=1900)?1138: 860;
		var vid_w = player_box_.width();
		
		
		player_box_.height(Math.floor(pb_w_/16*9));
		player_info_.height(Math.floor(pb_w_/16*9));
		
		if(w_ > 1400){
			player_info_.width(Math.floor((w_-pb_w_)*0.95));
		}else{
			player_info_.width(Math.floor((w_-pb_w_-1)));
		}
	
		$(".item_c_").css({"height":$(".item_c").height() - $(".item_d").height()+"px"});
		$(".item_c").each(function(){
			if( $(this).css("display") != "none" ){
				self_de = $(this).find("a").height();
				$(this).find("h3").css({"height":$(".item_c").height() - $(".item_d").height()+"px"});
				$(this).find("h3").css({'display':'table-cell'});
				$(this).find("h3").css({'vertical-align':'middle'});
			}
		})

		W = pb_w_;
		H = player_box_.height();
		w_ = ((w_>1920)?1920:(w_<1280?1280:w_))-180;
		show_num = Math.floor((w_+11)/item_w_);
		over_box_.width(show_num*item_w_-11);	
	
		if(1800<=(180+w_)){
			conts_.find('h3').css('font-size','50px');
			conts_.find('p.desc').css('font-size','24px');
//			player_info_.css({'min-height':'550px'});
			if( w_ > 1400 ){//大屏
				if( navigator.userAgent.indexOf('Trident')>-1 || navigator.userAgent.indexOf('Edge')>-1 ){
					//player_info_.css({"min-height":"450px"});
					$(".item_c").css({"overflow":"hidden"});
				}
			}
		}else if(1600<=(180+w_)){
			conts_.find('h3').css('font-size','44px');
			conts_.find('p.desc').css('font-size','22px');
			player_info_.css({"height":Math.floor(pb_w_/16*9)+"px"});
			$(".item_c").css({"overflow":"hidden"});
//			player_info_.attr('style','min-height:520px');
		}else if(1400<=(180+w_)){
			conts_.find('h3').css('font-size','38px'); 
			conts_.find('p.desc').css('font-size','20px');
			player_info_.css({"height":Math.floor(pb_w_/16*9)+"px"});
			$(".item_c").css({"overflow":"hidden"});
//			player_info_.attr('style','min-height:500px');
		}else{
			conts_.find('h3').css('font-size','32px'); 
			conts_.find('p.desc').css('font-size','20px');
		}
	}
	
	
	
	
	
	
	
	
})
