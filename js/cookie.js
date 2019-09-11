//获取cookie值
var cookie_val = getCookie ("loginUserName");
var cookie_val_ = hexToString (cookie_val);
console.log(cookie_val_); 

if(cookie_val_ != ''){
    logout_status_box(cookie_val_);
}

function getCookie(cookie_name){
    var allcookies = document.cookie;
    var cookie_pos = allcookies.indexOf(cookie_name);

    if( cookie_pos != -1 ){
        cookie_pos += cookie_name.length + 1;
        var cookie_end = allcookies.indexOf(";", cookie_pos);

        if( cookie_end == -1 ){
            cookie_end = allcookies.length;
        }
        var value = unescape(allcookies.substring(cookie_pos, cookie_end)); //这里就可以得到你想要的cookie的值了
    }
    return value;
}

//用户名解密
function hexToString (h) {
  var r = "";
  for (var i= (h.substr(0, 2)=="0x")?2:0; i<h.length; i+=2) {r += String.fromCharCode (parseInt (h.substr (i, 2), 16));}
  return r;
}

