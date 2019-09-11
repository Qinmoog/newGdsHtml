$(function(){
	
	$('input').iCheck({
		radioClass: 'iradio_square',
		checkboxClass: 'icheckbox_square',
		increaseArea: '10%'
	});
	
	$("#col_btn_sub").click(function(){
		var email = "";
		if( $("#inp_email").val()==''){
			login_bar_fun();
		}else{
			if($("#sys_email").is(':checked')){
				email = $("#inp_email").val();
			}else if($("#use_email").is(':checked')){
				email = $("#user_email").val();
			}
		}
		if(email!=''){
		    var pattern = /^([\.a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(\.[a-zA-Z0-9_-])+/;  
		    if (!pattern.test(email)) {  
		        cusmot_alert_fun("Please specify a valid e-mail address.");  
		    }else{
		    	message = $("#message").val();
		    	$.colorbox({html:'<p style="padding:30px; font-size:18px;">Sending...</p>',opacity:'0.5', overlayClose:false,});
				$.ajax({
					url:"https://secure.cctvplus.com/interface/contactus.do",
					data:{message:encodeURIComponent(message),backemail:email},
					dataType:'jsonp',  
					success : function (data){
						if(data.result=='-1'){
							login_bar_fun();
						}else if(data.result=='1'){
							cusmot_alert_fun('Question feedback success');
						}else if(data.result=='-2'){
								cusmot_alert_fun('Email sending failure. (error code:'+data.errCode+')');			//邮件发送失败
						}else if(data.result=='-3'){
								cusmot_alert_fun('Question feedback failure. (error code:'+data.errCode+')');		//问题反馈失败
						}else if(data.result=='-4'){
							login_bar_fun();
						}else if(data.result=='-5'){
								cusmot_alert_fun('Feedback content is empty. (error code:'+data.errCode+')');		//反馈内容为空
						}
					}
				});
		    }  
		}else{
		    //alert('Please specify an e-mail address.');
		}
	});
	
	$("#admin_btn").click(function(){
		alert('Please login to the official website of PC');
//		cusmot_alert_fun('Please login to the official website of PC');
	})
	
	
})
