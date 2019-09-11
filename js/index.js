// JavaScript Document
//控制一级导航样式和logo
function checkType(){
//	$('.page_topbar').removeClass('home_topbar');
//	$('.page_bottom').removeClass('home_bottom');
	$('.bottom_img').attr('src','/style/img/topLogo.png');
	$('.logo').attr('src','/style/img/logo.png');
}

$('.choice_plate').on('click' ,'span',function(){
	if(!$(this).hasClass('on')){
		var changeLink=$(".changeLink"),
			detailPath = $('.lastest_page .list_box li').attr('detailpath');
		if($(this).index()==0){
			$('.lastest_page .list_box li>a').attr('href','javascript:void(0)');
			changeLink.attr('href','../style/latest.css');
		}else{
			$('.lastest_page .list_box li>a').attr('href',detailPath);
			changeLink.attr('href','../style/archive.css');
		}
		$(this).addClass('on').siblings().removeClass('on');
	}
})




function tab_md_fun(o){
	var obj= $("#"+o),
	conts_ = $('div[id^="'+o+'_cont_"]'),
	item_ = obj.find('.item');
	item_.click(function(){
		if (!$(this).hasClass('cur')){
			var in_ = item_.index($(this));
			item_.removeClass('cur');
			$(this).addClass('cur');
			conts_.hide();
			$('#'+o+'_cont_'+(1+in_)).show();
		}
	});
}
function Request_url_fun(strName){
	var strHref = location.href ;
	var intPos = strHref.indexOf('#!');
	var strRight = strHref.substr(intPos + 2);
	var arrTmp = strRight.split('&');
	for(var i = 0; i < arrTmp.length; i ++ ){
		var arrTemp = arrTmp[i].split('=');
		if(arrTemp[0].toUpperCase() == strName.toUpperCase()){ 
			if(i===arrTmp.length-1){
				var sIndex = arrTemp[1].indexOf('#');
				if(sIndex!==-1){arr[1] = arrTemp[1].substring(0,sIndex);}
			}
			return arrTemp[1];
		}
	}
	return '';
}
function tab_md_fun2(o,hashash){
	var obj= $("#"+o),
	conts_ = $('div[id^="'+o+'_cont_"]'),
	conts2_ = $('div[id^="'+o+'_cont2_"]'),
	conts3_ = $('div[id^="'+o+'_cont3_"]'),
	item_ = obj.find('.item');
	item_.click(function(){
		if (!$(this).hasClass('cur')){
			var in_ = item_.index($(this));
			item_.removeClass('cur');
			$(this).addClass('cur');
			conts_.hide();
			conts2_.hide();
			conts3_.hide();
			$('#'+o+'_cont_'+(1+in_)).show();
			$('#'+o+'_cont2_'+(1+in_)).show();
			$('#'+o+'_cont3_'+(1+in_)).show();
			if(hashash){window.location.hash = '#!'+$(this).attr('hashash');}
		}
	});
	if(hashash){
		var change_tab = Request_url_fun(hashash);
		if(change_tab){
			item_.each(function(i_,n_){
				if($(n_).attr('hashash')==hashash+'='+change_tab){
					$(n_).trigger('click');
					return false;
				}
			});
		}
	}
}


function tab_md_fun3(o,hashash){
	var obj= $("#"+o),
	conts1_ = $('div[id^="'+o+'_cout1_"]'),  //标题
	conts2_ = $('div[id^="'+o+'_cout2_"]'),  //日期
	conts3_ = $('div[id^="'+o+'_cout3_"]'),  //文字内容
	conts4_ = $('div[id^="'+o+'_cout4_"]'),  //ID信息
	item_ = obj.find('.item');
	item_.click(function(){
		if (!$(this).hasClass('cur')){
			var in_ = item_.index($(this));
			item_.removeClass('cur');
			$(this).addClass('cur');
			conts1_.hide();
			conts2_.hide();
			conts3_.hide();
			conts4_.hide();
			$('#'+o+'_cout1_'+(1+in_)).show();
			$('#'+o+'_cout2_'+(1+in_)).show();
			$('#'+o+'_cout3_'+(1+in_)).show();
			$('#'+o+'_cout4_'+(1+in_)).show();
			if(hashash){window.location.hash = '#!'+$(this).attr('hashash');}
		}
	});
	if(hashash){
		var change_tab = Request_url_fun(hashash);
		if(change_tab){
			item_.each(function(i_,n_){
				if($(n_).attr('hashash')==hashash+'='+change_tab){
					$(n_).trigger('click');
					return false;
				}
			});
		}
	}
}
function cusmot_select_fun(obj,callback){
	var cus_sel_box = (typeof(obj)=='string')?$('#'+obj):obj,
	cus_sel_list = cus_sel_box.find('ul.custom_sel_list'),
	cus_sel_val = cus_sel_box.find('input.custom_sel_val'),
	cus_sel_text = cus_sel_box.find('.custom_sel_text');
	cus_sel_val.val('');
	cus_sel_list.on('click','li.option',function(){
		cus_sel_text.text($(this).text());
		cus_sel_val.val($(this).attr('ord_id'));
		if(callback && typeof(callback)=='function'){callback($(this).attr('ord_id'),cus_sel_box);}
	});
	cus_sel_box.on('click',function(){
		if(cus_sel_list.is(':hidden')){
			$(document).one('mousedown.order',function(e){
				var sel_cur_box = $(e.target).closest(cus_sel_box); 
				if(sel_cur_box.length>0){return;}
				cus_sel_list.hide();
			});
			cus_sel_list.show();
		}else{
			$(document).off('mousedown.order');
			cus_sel_list.hide();
		}
	});
}
function writeCookie_LL(name, value, hours)
{
  var expire = "";
  if(hours != null)
  {
	expire = new Date((new Date()).getTime() + hours * 3600000);
	expire = "; expires=" + expire.toGMTString();
  }
  document.cookie = name + "=" + escape(value) + expire;
}
function readCookie_LL(name)
{
  var cookieValue = "";
  var search = name + "=";
  if(document.cookie.length > 0)
  { 
	offset = document.cookie.indexOf(search);
	if (offset != -1)
	{ 
	  offset += search.length;
	  end = document.cookie.indexOf(";", offset);
	  if (end == -1) end = document.cookie.length;
	  cookieValue = unescape(document.cookie.substring(offset, end))
	}
  }
  return cookieValue;
}
function login_bar_fun(){
	$.colorbox({innerWidth:"690px", opacity:'0.6', overlayClose:false, inline:true, href:'#login_box_win'});	
}
function init_check_status(){
	$.getJSON('https://secure.cctvplus.com/interface/isLogin.do?callback=?',function(d){
		if(d && d.result==1){
			logout_status_box(d.username,d.email);
		}else{
			login_status_box();
		}
	});
}
function login_status_box(){	
	$('#bar_login_box').show();
	$('#bar_uc_box').hide();
	$('#uscenter_sel_box .custom_sel_text').text('George');
	if(typeof(logout_callback_)=='function'){logout_callback_();}
}
function logout_status_box(cname,cemail){
	$('#uscenter_sel_box .custom_sel_text').text(cname);
	$('#bar_login_box').hide();
	$('#bar_uc_box').show();
	if(typeof(login_callback_)=='function'){login_callback_(cname,cemail);}
}
//弹框提示插件
function cusmot_alert_fun(msg){
	$('#modul_alert_box .message_box').text(msg);
	$.colorbox({width:'30%', opacity:'0.3', overlayClose:false, inline:true, href:'#modul_alert_box'});	
}


//preview,history页面
function setCookie(name, value) {
	expires = new Date();
	expires.setTime(expires.getTime() + (1000 * 86400 * 365));
	document.cookie = name + "=" + escape(value) + "; expires=" + expires.toGMTString() + "; path=/";
}

function getCookie(cookie_name) {
	var allcookies = document.cookie;
	var cookie_pos = allcookies.indexOf(cookie_name);
	if(cookie_pos != -1) {
		cookie_pos += cookie_name.length + 1;
		var cookie_end = allcookies.indexOf(";", cookie_pos);
		if(cookie_end == -1) {
			cookie_end = allcookies.length;
		}
		var value = unescape(allcookies.substring(cookie_pos, cookie_end)); //这里就可以得到你想要的cookie的值了
	}
	return value;
}


