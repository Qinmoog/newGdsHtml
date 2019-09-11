

	// window.onload = function(){
	$(function(){
		right_resize();
		var window_width = $(window).width();
		var index = 20;
		var left_width;
		function right_resize() {
       		var win_width_ = $(window).width()-50,  //去除padding值
       			win_left = $("#f_left").width();
			if( $(".f_l_fix").length == 0 ){  //左侧没有筛选功能
				left_width = 0;
				if( win_width_-win_left-30 >= 0 ){
					if(win_width_-win_left-30 > 500) {
						$('#f_right').css({
							'width':10.2+'rem'
						});						
					}else {
						$('#f_right').css({
							'width':7.5+'rem'
						});							
					}
				}
			}else{
				
				left_width = 202;
				if( win_width_-win_left-40-190 >= 0 ){
					if (win_width_-win_left-40-190 > 500) {
						$('#f_right').css({
							'width':7.5+'rem'
						});						
					} else {
						$('#f_right').css({
							'width':7.5+'rem'
						});								
					}
					
				}
			}			
		}
		
		
		$(window).resize(function(){
			right_resize();
			win_scroll();
    	});
		

		if(window_width > 1440){
			$('#f_left').css({
				'position':'relative'
			});
			$('.f_left_top p').css({
				'font-size':14+'px',
				'padding':'8px 0px'
			});
		}else{
			$('#f_left').css({
				'position':'relative'
			});
		}
		

		var w_wid = $(window).height()-140,
			f_wid = $('#f_right').width();

		$('#f_right').css({
			'height':7.2+'rem',
			'overflow-y':'scroll'
		});

		$(window).scroll(function(){
			win_scroll();
    	});

		function win_scroll(){
			
			var w_top=$(window).scrollTop();
				w_wid = $(window).height()-90,
				f_wid = $('#f_right').width(),
				window_width = $(window).width(),				
				w_comp = f_wid/window_width,
				win_left = $("#f_left").width();
				index = $('#search_list_box>li').length;
				
				
			if(w_top >= 60){
				if( navigator.userAgent.indexOf("Mac")>-1&&navigator.userAgent.indexOf("Chrome")>-1 ){
					$('.sub_nav_box').css({
						'position': 'fixed',
						'top': 0 + 'px',
						'left': -14 + 'px',
						'-webkit-transition': 'top .5s',
						'width': 100 + '%'
					});
				}else{
					$('.sub_nav_box').css({
						'position': 'fixed',
						'top': 0 + 'px',
						'left': 0 + 'px',
						'-webkit-transition': 'top .5s',
						'width': 100 + '%'
					});
				}
					
					
				
					
				if(w_top > index*60) {
					if(window_width > 1440) {
						if(f_wid > 500){
								$('#f_right').css({
									'position':'absolute',
//									'left':9.6+'rem',
									'right':1.6+'rem',
									'top':index*60+'px'
								});
						}else{
								$('#f_right').css({
									'position':'absolute',
//									'left':9.6+'rem',
									'right':1.6+'rem',
									'top':index*60+'px'
								});
						}
						
					}else {
						if(f_wid > 500){
								$('#f_right').css({
									'position':'absolute',
//									'left':9.6+'rem',
									'right':1.6+'rem',
									'top':index*60+'px'
								});
						}else{
								$('#f_right').css({							
									'position':'absolute',
//									'left':9.6+'rem',
									'right':1.6+'rem',
									'top':index*60+'px'
								});
						}
						
					}				
				} else {
					if(window_width > 1440) {
						
						if($(".f_l_fix").length == 0){
							$('#f_right').css({							
								'position':'fixed',
								'right':1.6+'rem',
								'top':1+'rem'
							});						
						}else{
							$('#f_right').css({
								'position':'fixed',
//								'left':9.6+'rem',
								'right':1.6+'rem',
								'top':1+'rem'
							});
						}
//						if(f_wid > 500){
//							$('#f_right').css({
//								'position':'fixed',
//								'left':9.6+'rem',
//								'top':1+'rem'
//							});
//						}else{
//							$('#f_right').css({
//								'position':'fixed',
//								'left':9.6+'rem',
//								'top':1+'rem'
//							});
//						}
						
					}else {
						
						if(f_wid > 500){
							if($(".f_l_fix").length == 0){
								$('#f_right').css({							
									'position':'fixed',
									'right':1.6+'rem',
									'top':1+'rem'
								});
							}else{
								$('#f_right').css({
									'position':'fixed',
//									'left':9.6+'rem',
									'right':1.6+'rem',
									'top':1+'rem'
								});
							}
							
						}else{
							if( navigator.userAgent.indexOf("Mac")>-1&&navigator.userAgent.indexOf("Chrome")>-1 ){
								
								$('#f_right').css({
									'position':'fixed',
//									'left':9.6+'rem',
									'right':1.6+'rem',
									'top':1+'rem'
								});
							}else{
//								$('#f_right').css({
//									'position':'fixed',
//									'left':9.6+'rem',
//									'top':1+'rem'
//								});
								
								if($(".f_l_fix").length == 0){
									$('#f_right').css({							
										'position':'fixed',
										'right':1.6+'rem',
										'top':1+'rem'
									});						
								}else{
									$('#f_right').css({
										'position':'fixed',
//										'left':9.6+'rem',
										'right':1.6+'rem',
										'top':1+'rem'
									});
								}
							}
							
						}
						
					}
									
				}
				
				
			}else{
				$('#f_right').css({
					'position':'relative',
//					'left':0+'px',
					'right':0+'px',
					'top':0+'px'
				});

				$('.sub_nav_box').css({
					'position': 'relative',
					'top': 0 + 'px',
//					'left': 0 + 'px',
					'right': 0 + 'px',
					'-webkit-transition': 'top .5s',
					'width':'initial'
				});
				
			}



		}



		// $('.f_r').on("mousewheel DOMMouseScroll", function (e) {
	 //        var delta = (e.originalEvent.wheelDelta && (e.originalEvent.wheelDelta > 0 ? 1 : -1)) ||  // chrome & ie
	 //                (e.originalEvent.detail && (e.originalEvent.detail > 0 ? -1 : 1));              // firefox

		// 	var dis = $('#detail_box_').height() - $('.f_r').height();
	 //        if (delta < 0 ) {// ���¹�
	 //        	if($(this).scrollTop() >= dis){
	 //        		disable_scroll();
	 //        	}else{
	 //        		enable_scroll();
	 //        	}
	 //        }
	 //        if (delta > 0 ) {// ���Ϲ�
	 //        	if($(this).scrollTop() > 0){
	 //        		enable_scroll();
	 //        	}else if($(this).scrollTop() == 0){
	 //        		disable_scroll();
	 //        	}
	 //        }
	    
	 //    });

		function preventDefault(e) {
		  e = e || window.event;
		  if (e.preventDefault)
		      e.preventDefault();
		  e.returnValue = false;  
		}
		function wheel(e) {
		    preventDefault(e);
		}
		function disable_scroll() {
		  if (window.addEventListener) {
		      window.addEventListener('DOMMouseScroll', wheel, false);
		  }
		  window.onmousewheel = document.onmousewheel = wheel;
		  // document.onkeydown = keydown;
		}

		function enable_scroll() {
		    if (window.removeEventListener) {
		        window.removeEventListener('DOMMouseScroll', wheel, false);
		    }
		    window.onmousewheel = document.onmousewheel = null;
		    // document.onkeydown = null;
		}

		$('#f_right').hover(function(){  //����div
			
			$('#f_right').on("mousewheel DOMMouseScroll", function (e) {

				var delta = (e.originalEvent.wheelDelta && (e.originalEvent.wheelDelta > 0 ? 1 : -1)) ||  // chrome & ie
					(e.originalEvent.detail && (e.originalEvent.detail > 0 ? -1 : 1));              // firefox

				var dis = $('#detail_box_').height() - $('#f_right').height();
				
				if (delta < 0 ) {// ���¹�
					
					if($(this).scrollTop() >= dis){
						disable_scroll();
					}else{
						enable_scroll();
					}
				}
				if (delta > 0 ) {// ���Ϲ�
					if($(this).scrollTop() > 0){
						enable_scroll();
					}else if($(this).scrollTop() == 0){
						disable_scroll();
					}
				}

			});

		},function(){    //�뿪div
			enable_scroll();
		})

	// };
	}) 
		
	



















 






