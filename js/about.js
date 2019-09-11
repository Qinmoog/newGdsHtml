$(function(){
	
//	var wrap = document.querySelector('.swiper_main');
//	var wrap_box = document.querySelector('.swiper_box');
//	var aLiWidth = wrap_box.offsetWidth;
//	var index_img = $(".swiper_main ul>li").length;  //图片个数
	// 初始化手指坐标点
    var startPoint = 0;
    var startEle = 0;
	

	//QM--add new 0906
	checkType();
	
//	setImgWidth();
	
	
//	function setImgWidth(){
//		var imgWidth = $(window).innerWidth()-15*2;  //图片宽度
//		$(".swiper_main").css({'width':imgWidth+'px'});
//		$(".swiper_main ul").css({'width':imgWidth*index_img+'px','margin-left':'0px'});
//		$(".swiper_main ul>li").css({'width':imgWidth+'px'});
//		$('.swiper_btn>span').removeClass('act');
//		$(".swiper_btn>span").eq(0).addClass('act');
//	};
	
//	$(window).resize(function(){
//		setImgWidth();
//	})
	
	
//  //手指按下
//  wrap.addEventListener("touchstart",function(e){
//      startPoint = e.changedTouches[0].pageX;
//      startEle = wrap_box.offsetLeft;
//  });
//  //手指滑动
//  wrap.addEventListener("touchmove",function(e){
//      var currPoint = e.changedTouches[0].pageX;
//      var disX = currPoint - startPoint;
//      var left = startEle + disX;
//      wrap_box.style.marginLeft = left + 'px';
//  });
//  //当手指抬起的时候，判断图片滚动离左右的距离，当
//  wrap.addEventListener("touchend",function(e){
//      var left = wrap_box.offsetLeft;
//	// 判断正在滚动的图片距离左右图片的远近，以及是否为最后一张或者第一张
//      var currNum = Math.round(-left/aLiWidth);
//      currNum = currNum>=(index_img-1) ? index_img-1 : currNum;
//      currNum = currNum<=0 ? 0 : currNum;
//      wrap_box.style.marginLeft = -currNum*wrap.offsetWidth + 'px';
//      $('.swiper_btn>span').removeClass('act');
//      $('.swiper_btn>span').eq(currNum).addClass('act');
//  })
    
    
    
    $('#aboutus_img_list li').mouseenter(function(){
		var this_ = $(this), sib_ = this_.siblings().not(this_);
		sib_.animate({
			width:'181px',
		},150,function(){sib_.find('.icon').hide();});
		this_.animate({
			width:'500px',
		},150,function(){this_.find('.icon').show();});
	});
	$('#aboutus_img_list').mouseleave(function(){
		$('#aboutus_img_list li').animate({
			width:'245px',
		},150,function(){$('#aboutus_img_list li').find('.icon').hide();});
	});
	
	$('input').iCheck({
		radioClass: 'iradio_square',
		checkboxClass: 'icheckbox_square',
		increaseArea: '10%'
	});
	
	
})
