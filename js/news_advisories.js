$(function(){
		 
		$('#navmain_2015box_2').addClass('cur');
		tab_md_fun('comming_infotab');
		tab_md_fun('sub_infotab');
		 
		$("#sub_infotab>li").click(function(){
			$(".sub_nav_s_val").text( $(this).text() ).removeClass('open');
			$("#sub_infotab").hide();
		})
		 
		$('input').iCheck({
			radioClass: 'iradio_square',
			checkboxClass: 'icheckbox_square',
			increaseArea: '10%'
		});
		 
		 $('#24hosers_box li input[type="checkbox"]').on('ifChecked ifUnchecked',function(e_){
			var inp_data_all_ = $('#24hosers_box li input[type="checkbox"][class="data_all"]');
			var inp_data_items_ = $('#24hosers_box li input[type="checkbox"][class="data_item"]');	
			if($(this).hasClass('data_all')){//点击全选					
				if(e_.type == 'ifChecked'){
					inp_data_items_.prop('checked','checked');
				}else{
					inp_data_items_.removeProp('checked');
				}
				inp_data_items_.iCheck('update');
			}
			var che_1=[];
			$('#24hosers_box li input[type="checkbox"][class="data_item"]:checked').each(function(){
				che_1.push($(this).val());															   
			});
			if(che_1.length>0){
				if(che_1.length == inp_data_items_.length){
					inp_data_all_.prop('checked','checked').iCheck('update');
				}else{
					inp_data_all_.removeProp('checked').iCheck('update');
				}
			}else{
				cusmot_alert_fun('Please select at least one');
			}
			$('#comming_infotab_cont_1 li').each(function(index, element) {
	            var this_ = $(element);
				if($.inArray(this_.attr('class'), che_1)!==-1){
					this_.show();
				}else{
					this_.hide();
				}
	        });
			var th_ = $(e_.target).closest('div.left_items');
			if(!th_.hasClass('cur')){th_.click();}
		});
		
		$(".subsearch_btn").click(function(){
			var ss = $("#custom_sel_val").val();
			
			if(ss=='ord22222'){			
				window.location.href="/archive/allArchive.shtml#!keyword="+encodeURIComponent($.trim((($('#subsearch_val').val()==$('#subsearch_val').prop('defaultValue'))?'':$('#subsearch_val').val())));
			}else if(ss=='ord33333'){
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
		
	})

