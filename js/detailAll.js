$(function(){
	 
	var mid_str = Request_url_fun('mid'),
		dcid_str = Request_url_fun('dcid'),
		elementID,
		rmp;
	
	get_Detail_fun();
	
	
	function get_Detail_fun(){
//		var ;
		$.getJSON('https://secure.cctvplus.com/searchInterface/newsSearch.do?callback=?',
			{'dcid':dcid_str,'mid':mid_str},
			function(d){
				console.log(d);
				if(d && d.items && d.items.length){
					var item_list = d.item,
						item_path = d.videoUrl,
						item_arr = [];
						
//					for( var i=0;i<item.list.length;i++ ){
//						item_arr.push('');
//					}
					if( item_path ){
						init_video(item_path);
					}
					
					
				}else{
					console.log('报错');
				}
			}
		);
	}
	
	function init_video(u){
		var video_content = $('#video_box_s'),
			vid_f_bod_ = $('.detail_data_box'),
			window_width = $(window).width();
		var hh = Math.ceil(vid_f_bod_.width()/16*9),
			ww = vid_f_bod_.width();
			
		if( rmp ){rmp.destroy();}
		$('#video_box_s').html('');
		var bitrates = {
			mp4: [
				u
			  ]
		};
		var settings = {
		    licenseKey: 'Kl8leXk3OWdjODAyeWVpP3JvbTVkYXNpczMwZGIwQSVfKg==',
		    bitrates: bitrates,
		    delayToFade: 3000,
//		    width:'100%',
//		    height:auto,
//		    height:'100%',
//		    width: 661,
//		    height: 372,
			width: ww,
			height:hh,
		    preload: 'auto',
			skin: 's4',
			skinBackgroundColor: 'rgba(0, 0, 0, 0.45)',
			skinButtonColor: 'FFFFFF',
			skinAccentColor: '000000'
		};
		elementID = 'video_box_s';
		rmp = new RadiantMP(elementID);
		var rmpContainer = document.getElementById(elementID);
		
		rmp.init(settings);
	}
	
	
	
	
	
})



