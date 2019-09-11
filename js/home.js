var thisINdex = 0;
var swiper;

getT();

//第一屏轮播动画
function getT(){
	var interleaveOffset = 1; //控制里面图片变化位置和外层变化位置的比例
	swiper = new Swiper('.swiper-container', {
		autoplay : {
			delay:7000
		},
//		autoplay:true,
//		autoplay:2000,
		speed:1000, /*滑动时间*/
		loop:true,
		slideToClickedSlide:true,
		grabCursor: true,//指针成手掌形状
		watchSlidesProgress: true, //计算slide的progress(进度、进程)
//		mousewheel: true, 鼠标滚动控制
		keyboard: true,//开启键盘控制
//		runCallbacksOnInit:true,
//		slidesPerView: 'auto',
      	pagination: {
       		el: '.swiper-pagination',
      	},
      	on:{
	      	init: function(){
//	      		swiperAnimateCache(this);  //隐藏动画元素 
//	      		swiperAnimate(this); 
		    },
			transitionEnd: function(){  //从一个slide过渡到另一个slide结束时执行
				const that = this;
				
				$('.swiperImg').removeClass('animateImg').css({'transform':'scale(1.2)'});;
				$('.swiperlogo').removeClass('animateLogo').css({'opacity':0});
				$('.swiper_play').removeClass('animatePlay');
				$('.swiper_play').css({'background':'rgba(255,255,255,.88)'});
				$('.swiper_play>img').css({'opacity':0});
				$('.swiper_play>img').removeClass('imgMask');
//				$('.swiper_play>img').css({'opacity':0});
//				$('.swiper_play>img').removeClass('imgMask').css({'opacity':0});
//				$('.swiper_c>img').removeClass('img_cMask').css({'opacity':0});
				$('.swiper_txt').removeClass('animateTitle').css({'opacity':0});
				$('.nowPlaybtn').fadeIn(2000);
				$('.swiper_play').fadeIn();
				$('.swiper_c').fadeOut();
				
				this.slides.eq(this.activeIndex).find('.swiperImg').addClass('animateImg').css({'transform':'scale(1)'});  //当前banner大图缩放
				this.slides.eq(this.activeIndex).find('.swiperlogo').addClass('animateLogo');  //红色CCTV+图片渐显
				this.slides.eq(this.activeIndex).find('.swiper_play').addClass('animatePlay'); //渐隐白色透明背景
				this.slides.eq(this.activeIndex).find('.swiper_play>img').addClass('imgMask'); //镂空播放按钮白色半透明图缩放
				this.slides.eq(this.activeIndex).find('.swiper_c>img').addClass('img_cMask');  //切换显示镂空C白色半透明图显示
				this.slides.eq(this.activeIndex).find('.swiper_txt').addClass('animateTitle'); //标题渐显
				$('.swiper-pagination-bullet').addClass('animatepage');
				
				setTimeout(function(){
					
					that.slides.eq(that.activeIndex).find('.swiperlogo').css({'opacity':1});
					that.slides.eq(that.activeIndex).find('.swiper_play').css({'background':'rgba(255,255,255,.12)'});
					that.slides.eq(that.activeIndex).find('.swiper_play>img').css({'opacity':1});
					
					that.slides.eq(that.activeIndex).find('.swiper_txt').css({'opacity':1});
				},2000);
//				
				setTimeout(function(){
					
					const elePlay = that.slides.eq(that.activeIndex).find('.swiper_play')[0];
					const eleC = that.slides.eq(that.activeIndex).find('.swiper_c')[0];
					$(elePlay).fadeOut(4000);
					$(eleC).fadeIn(200);
					$('.nowPlaybtn').fadeOut(4000);
				},4000)
//				swiperAnimate(this); 
			},
			progress: function() { //当Swiper的progress被改变时执行
//		      var swiper = this;
//		      for (var i = 0; i < swiper.slides.length; i++) {
//		      	if(i!=thisINdex){ //除了当前模块的其他模块都变化位置
//		      		var slideProgress = swiper.slides[i].progress;
//			        var innerOffset = swiper.width * interleaveOffset;
//			        var innerTranslate = (slideProgress) * innerOffset;
//			        swiper.slides[i].querySelector(".slide-inner").style.transform =
//			          "translate3d(" + innerTranslate + "px, 0, 0)";
//		      	}
//		      } 
		    },
		    touchStart: function() { // 当碰触到slider时执行
		    	
		      var swiper = this;
		      thisINdex = this.activeIndex;
		      for (var i = 0; i < swiper.slides.length; i++) {
		        swiper.slides[i].style.transition = "";
		      }
		    },
		    setTransition: function(speed) { //过渡动画执行时
		      var swiper = this;
		      for (var i = 0; i < swiper.slides.length; i++) {
		        swiper.slides[i].style.transition = speed + "ms";
		        swiper.slides[i].querySelector(".slide-inner").style.transition =
		          speed + "ms";
		      }
		    }
		    //结束
		}
   });
}


function initplay(){
	$('#swiperV').append('<video id="player" class="video-js vjs-big-play-centered vjs-fluid"></video>');
	var uu_ = 'http://pv.news.cctvplus.com/2019/0903/8120715_Preview_1077.mp4';
	player = createVideo(uu_, "player");
    myplay = videojs('player');
	myplay.src(uu_);
	myplay.load(uu_);
	myplay.play();
	
	//监听播放结束
	myplay.on("ended", function(){
	    $('.swiper-container').show();
	    swiper.autoplay.start();
		$('.swiperVideo').hide();
		myplay.dispose(); //销毁播放器实例
	});
	
				
	function createVideo(src, id) {
		return videojs(id, {
	//		poster: img,
		    controls: true,
		    preload: true,
		    width:1000,
		    height:600,
		    sources:[src]
	  	});
	}
}

	
//首页第一屏点击播放视频
$('.nowPlaybtn').click(function(){
	swiper.autoplay.stop();
	$('.swiper-container').hide();
	$('.swiperVideo').show();
	initplay();
	
	$('.swiper_txt1').addClass('animateTitle1');
	$('.swiper_txt1>p').addClass('animateColor');
	$('.swiper_time1>span').addClass('animateColor')
	setTimeout(function(){
		$('.swiper_txt1').css({'top':5.45+'rem'})
		$('.swiper_txt1>p').css({'color':'#ffffff'});
		$('.swiper_time1>span').css({'color':'#ffffff'});
	},1800)
})




$('.md_bd').mCustomScrollbar({
	theme:"dark", //主题颜色
	scrollButtons:{
		enable:false //是否使用上下滚动按钮
	},
	autoHideScrollbar: false, //是否自动隐藏滚动条
	scrollInertia :0,//滚动延迟
	horizontalScroll : true,//水平滚动条
	callbacks:{
		onScroll: function(){console.log(1);} //滚动完成后触发事件
	}	
});


function borderLong(){
	$('.com_box01 .com_date').eq(0).addClass('myWidthLong');
	$('.com_box01').find('.com_text').eq(0).addClass('myfadeInUpOne');
	$('.com_box01 .com_cont').eq(0).addClass("myheight250");
	setTimeout(function(){
		$('.com_box01').find('.com_text').eq(1).addClass('myfadeInUpOne');
		$('.com_box01 .com_cont').eq(1).addClass("myheight250");
		/*第二段*/
		$('.com_box02 .com_cont').eq(0).find("img").addClass('marginTopIn');
		$('.com_box02 .com_text').eq(0).addClass('myfadeInDown');
	},300)
	setTimeout(function(){
		$('.com_box01').find('.com_text').eq(2).addClass('myfadeInUpOne');
		$('.com_box01 .com_cont').eq(2).addClass("myheight250");
		$('.com_box02 .com_date').eq(0).addClass('myWidthLong');
		/*第二段*/
		$('.com_box02 .com_cont').eq(1).find("img").addClass('marginTopIn');
		$('.com_box02 .com_text').eq(1).addClass('myfadeInDown');
	},600)
	setTimeout(function(){
		/*第二段*/
		$('.com_box02 .com_cont').eq(2).find("img").addClass('marginTopIn');
		$('.com_box02 .com_text').eq(2).addClass('myfadeInDown');
	},600)
}
	
			
			
$('.com_cont').on('mouseover',function(){
	$(this).find('img').css({"-o-transform":"scale(1.1)","-ms-transform":"scale(1.1)" ,"transform":"scale(1.1)","-moz-transform":"scale(1.1)" ,"-webkit-transform":"scale(1.1)"});
	$(this).siblings('p').css("padding-top","15px")
})
$('.com_cont').on('mouseout',function(){
	$(this).find('img').css({"-o-transform":"scale(1)","-ms-transform":"scale(1)" ,"transform":"scale(1)","-moz-transform":"scale(1)" ,"-webkit-transform":"scale(1)"});
	$(this).siblings('p').css("padding-top","0px")
})
			
			
/*3D*/	
var isChangePa = true;		
var swiper1 = new Swiper('.dim_container_one', {
	speed:1000, /*滑动时间*/
	loop:true,
    effect: 'flip',
    grabCursor: true,
    direction: 'vertical',
    watchSlidesProgress:true,
    on:{
	    progress: function(progress){
	    	if(isChangePa){
	    		isChangePa = false;
	    		$('.three-pag-bullet-active').removeClass('three-pag-bullet-active').siblings().addClass('three-pag-bullet-active');	 
				setTimeout(function(){isChangePa = true;},300);
	    	}
	    }
	}

});
var swiper2 = new Swiper('.dim_container_two', {
	speed:1000, /*滑动时间*/
	loop:true,
    effect: 'flip',
    grabCursor: true,
    direction: 'vertical'
});
var swiper3 = new Swiper('.dim_container_three', {
	speed:1000, /*滑动时间*/
	loop:true,
    effect: 'flip',
    grabCursor: true,
    direction: 'vertical'
});
var swiper4 = new Swiper('.dim_container_four', {
	speed:1000, /*滑动时间*/
	loop:true,
    effect: 'flip',
    grabCursor: true,
    direction: 'vertical'
    
});


function fourImgSize(){
	$('.dimension_one .dimension_box').addClass("marginTop3D");
	$('.dimension_two .dimension_box').addClass("myWidth3D");
	$('.dimension_three .dimension_box').addClass("marginLeft3D");
	$('.dimension_four .dimension_box').addClass("myheight3D");
	setTimeout(function(){
		$('.dimension_box .dimension_item img').css({"-o-transform":"scale(1)","-ms-transform":"scale(1)" ,"transform":"scale(1)","-moz-transform":"scale(1)" ,"-webkit-transform":"scale(1)"});
	},500);
}

function fourImgPlay(){
	setTimeout(function(){
		swiper1.autoplay.start();
		swiper2.autoplay.start();
		swiper3.autoplay.start();
		swiper4.autoplay.start();
	},300)
}

   
$('.dimension_box').on('mouseover' ,function(){
	swiper1.autoplay.stop();
	swiper2.autoplay.stop();
	swiper3.autoplay.stop();
	swiper4.autoplay.stop();   
})
$('.dimension_box').on('mouseout' ,function(){
	swiper1.autoplay.start();
	swiper2.autoplay.start();
	swiper3.autoplay.start();
	swiper4.autoplay.start();   
})
/*3D*/	
	
/*上拉*/
//$('.flash_btn').on('click', '.isup' ,function(){
$('.flash_btn').on('click',function(){
	if( $(this).hasClass('on') ){
		$('.flash_btn').removeClass("on");
		$('.flash_btn').addClass("myFlashOn").removeClass('myFlashDown');
		$('.flash_con').removeClass("animated myheigthshow").addClass("animated myheighthide");
		$('.flash_test').removeClass('myfadeOut').addClass('myfadeIn');
	}else{
		$('.flash_btn').addClass("on");
		$('.flash_btn').addClass("myFlashOn").removeClass("myFlashDown");
		$('.flash_con').css("display" , "block");
		$('.flash_con').removeClass("animated myheighthide").addClass("animated myheigthshow");
		$('.flash_test').addClass('myfadeOut').removeClass('myfadeIn');
		setTimeout(function(){
			$('.flash_btn').addClass("myFlashDown").removeClass('myFlashOn');
		},1000);
		
		setTimeout(function(){
			$('.flash_con').children("p").css({"transition":"all 0.35s ease-in-out" ,"transform":"scale(1.2)"});
		},500)
	}
	
//	setTimeout(function(){
////		$('.isup').removeClass("on").siblings().addClass("on");
////		$('.isup').removeClass("on")
//		$('.flash_btn').addClass("myFlashDown").removeClass('myFlashOn');
//	},1000);
//	
//	setTimeout(function(){
//		$('.flash_con').children("p").css({"transition":"all 0.35s ease-in-out" ,"transform":"scale(1.2)"});
//	},500)
})
//$('.flash_btn').on('click', '.isdown' ,function(){
//	$('.flash_btn').addClass("myFlashOn").removeClass('myFlashDown');
//	$('.flash_con').removeClass("animated myheigthshow").addClass("animated myheighthide");
//	$('.flash_test').removeClass('myfadeOut').addClass('myfadeIn');
//	setTimeout(function(){
//		$('.isdown').removeClass("on").siblings().addClass("on");
//		$('.flash_btn').removeClass('myFlashOn');
//		$('.flash_con').children("p").css("transform","scale(1)");
//	},1000)
//})
			

    



//第二屏扇形切换
var moveTime = null;
var oPic=document.getElementById('user_pic');
var aLi=oPic.getElementsByTagName('li');
var curtain=document.getElementById('curtain');
//var curtain=$('.curtain');
var arr=[];
	
//arcSlip();
function arcSlip(){
	
	for(var i=0;i<aLi.length;i++){
	   	var oImg=aLi[i].getElementsByTagName('img')[0],
	   		omask=aLi[i].getElementsByClassName('imgmask')[0];

	 	arr.push([parseInt(getStyle(aLi[i],'left')),parseInt(getStyle(aLi[i],'top')),
				   getStyle(aLi[i],'zIndex'),oImg.width,parseFloat(getStyle(aLi[i],'opacity')*100),
				   getStyle(aLi[i],'transform'),getStyle(aLi[i],'width'),getStyle(omask,'background-color')]);
	}
//	 console.log(arr);
	
    var moveTime = setInterval (function(){
		moveTN();
	},5000);
	
	clearInterval(moveTime);


	function getStyle(obj,name){
	    if(obj.currentStyle){ 
	       	return obj.currentStyle[name];
	    }else{
	    	return getComputedStyle(obj,false)[name];
	    }
	}
	
}


function moveTN(){
    arr.unshift(arr[arr.length-1]);
	arr.pop();
	for(var i=0;i<aLi.length;i++){
		var oImg=aLi[i].getElementsByTagName('img')[0],
		    omask = aLi[i].getElementsByClassName('imgmask')[0];
				
		aLi[i].style.zIndex=arr[i][2];
		aLi[i].style.transform=arr[i][5];
		aLi[i].style.width=arr[i][6];

		if( arr[i][7].split(')')[0].split(',')[3] == 0 ){
			curtain.src=$('#user_call img')[i].src
		}

		startMove(aLi[i],{left:arr[i][0],top:arr[i][1],opacity:arr[i][4],transform:arr[i][5],width:arr[i][6]});
		startMove(omask,{background:arr[i][7]});
		startMove(oImg,{width:arr[i][3]});
	}
}

//function getByClass(oParent,sClass){
//  var aResult=[];
//	var aEle=oParent.getElementsByTagName('*');
//	for(var i=0;i<aEle.length;i++){
//		if(aEle[i].className==sClass){
//			aResult.push(aEle[i]);
//		}
//	}
//	return aResult;
//}

function getStyle(obj,name){
    if(obj.currentStyle){
	    return obj.currentStyle[name];
	}else{
	    return getComputedStyle(obj,false)[name];
	}
}

function startMove(obj,json,fnEnd){
    clearInterval(obj.timer);
    obj.timer=setInterval(function(){
		var bStop=true;
		for(var attr in json){	
			var cur=0;
	
			if(attr=='opacity'){
				cur=Math.round(parseFloat(getStyle(obj,attr))*100);
			}else{
				cur=parseInt(getStyle(obj,attr));
			}
		  
			var  speed=(json[attr]-cur)/6;
			speed=speed>0?Math.ceil(speed):Math.floor(speed);
		   
			if(cur!=json[attr]){
				bStop=false;	
			}
			
			if(attr=='opacity'){
			   obj.style.filter='alpha(opacity:'+(cur+speed)+')';
			   obj.style.opacity=(cur+speed)/100;
			}else{
				obj.style[attr]=cur+speed+'px';
				if( attr == 'background' ){
					obj.style[attr]=json[attr];
				}
			}
		}
		 
		if(bStop){
		    clearInterval(obj.timer);
			if(fnEnd) fnEnd();
		}
		 
	},30) 
}

function moveTP(){
    arr.push(arr[0]);
	arr.shift();
	for(var i=0;i<aLi.length;i++){
	    var oImg=aLi[i].getElementsByTagName('img')[0],
	    	omask=aLi[i].getElementsByClassName('imgmask')[0];
			
		aLi[i].style.zIndex=arr[i][2];
		aLi[i].style.transform=arr[i][5];
		aLi[i].style.width=arr[i][6];

		if( arr[i][7].split(')')[0].split(',')[3] == 0 ){
			curtain.src=$('#user_call img')[i].src
		}

		startMove(aLi[i],{left:arr[i][0],top:arr[i][1],opacity:arr[i][4],transform:arr[i][5],width:arr[i][6]});
		startMove(omask,{background:arr[i][7]});
		startMove(oImg,{width:arr[i][3]});
	}
		
}

$('#user_pic li').hover(function(){
    clearInterval(moveTime);
},function(){
    moveTime=setInterval(function(){	
		moveTN();		
	},5000);
});


$('#user_pic li').click(function(){
	var num=Number($(this).attr('class').slice(-1));
	for(var i=0;i<arr.length;i++){
		if(arr[i][2]==6){
			var y = i+1;
			if(num>y){
				for(var j=0;j<num-y;j++){
					moveTN();
				}
			}else{

				for(var j=0;j<y-num;j++){
					moveTP();
				}
			}
		}
	}
})



$(window).scroll(function() {
	var Height = $(window).height();
    var scroll = $(document).scrollTop(); //滚动高度

    if( scroll < Height){ //第一屏
    	
    	swiper.autoplay.start();
    	
		clearInterval(moveTime);
    	$('.xuanzhuan').removeClass('rotate-scale-Updown');
    	$('#curtain').removeClass('trans-img');
    	
    	
		
    }else if( scroll < Height*1.5 ){//第二屏
    	
    	swiper.autoplay.stop();
    	
    	$('.xuanzhuan').addClass('rotate-scale-Updown');
    	$('#curtain').addClass('trans-img');
    	$('.sector_box').addClass('rotatetitle').css({'opacity':1});
    	arcSlip();
    	
    	

    }else if( scroll < Height*2.5 ){//第三屏
    	
    	swiper.autoplay.stop();
    	
    	clearInterval(moveTime);
    	$('.xuanzhuan').removeClass('rotate-scale-Updown');
    	$('#curtain').removeClass('trans-img');
    	
    	borderLong();
    	
    }else{

    	swiper.autoplay.stop();
    	
    	clearInterval(moveTime);
    	$('.xuanzhuan').removeClass('rotate-scale-Updown');
    	$('#curtain').removeClass('trans-img');
		
		fourImgSize();
		fourImgPlay();
    }
})


