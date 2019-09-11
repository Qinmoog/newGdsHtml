/*
* 根据日期写入时所在的时区号,传化为客户端所在时区的时间
*  东:负数,西:正数
*  Create Date:2016-01-27 By Harry  
*/
Date.prototype.ToLocalTimeByZoneNum = function (zoneNum) {
    if (isNaN(zoneNum))
        zoneNum = 0;
    //this.setHours(this.getHours() + zoneNum);//转化时间为UTC时间
    var clientTime = new Date();//客户端当前时间
    var offset = Math.floor(clientTime.getTimezoneOffset() * 60000);//客户端时间与UTC时间的偏移量(毫秒)
    //this.setTime(this.getTime() - offset);//根据偏移量计算传入时间在客户端所在时区的对应时间
    var timeOff = clientTime.getTimezoneOffset();
    var m = 1;
    if(timeOff>0){
    	m = -1;
    	}
    this.setTime(this.getTime() + m*offset + m*zoneNum*3600000);
    return this;
}
//默认传入东八区toLocaleString()
Date.prototype.ToLocalTime = function () {
	  var d = new Date();
    this.ToLocalTimeByZoneNum(8);
    //this.ToLocalTimeByZoneNum(0)
    //alert("beijing:"+d.Format("yyyy-MM-dd HH:mm:ss")+" # London:"+this.Format("yyyy-MM-dd HH:mm:ss"));
    return this;
}
/*
*  转化成国外常用显示格式
*  1:Mon Feb 01 2016 12:00:00
*  2:Mon Feb 01 2016
*  3:Feb 01 2016
*  4:Feb 01,2016
*  Create Date:2016-01-28 By Harry 
*/
Date.prototype.ToGlobalTime = function (type) {
    var _date = this.ToLocalTime().toString();
    switch (type) {
        case 1:
            return _date.substring(0, 25); //_date.indexOf('G')
            break;
        case 2:
            return _date.substring(0, 16);
            break;
        case 3:
            return _date.substring(3, 16);
            break;
        case 4:
            return _date.substring(3, 16).replace(/(.{7})/, "$1\n,");
            break;
        default:
            return this;
            break;
    }
}

//附加两个拓展方法，网上搜来的
// 对Date的扩展，将 Date 转化为指定格式的String 
// 月(M)、日(d)、小时(h)、分(m)、秒(s)、季度(q) 可以用 1-2 个占位符， 
// 年(y)可以用 1-4 个占位符，毫秒(S)只能用 1 个占位符(是 1-3 位的数字) 
// Example： (new Date()).Format("yyyy-MM-dd hh:mm:ss.S") ==> 2006-07-02 08:09:04.423 
Date.prototype.Format = function (fmt) {
    var o = {
        "M+": this.getMonth() + 1,                 //月份 
        "d+": this.getDate(),                    //日 
        "H+": this.getHours(),                   //小时 
        "m+": this.getMinutes(),                 //分 
        "s+": this.getSeconds(),                 //秒 
        "q+": Math.floor((this.getMonth() + 3) / 3), //季度 
        "S": this.getMilliseconds()             //毫秒 
    };
    if (/(y+)/.test(fmt))
        fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
        if (new RegExp("(" + k + ")").test(fmt))
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
}
/**
* 更改日期 
* y年， m月， d日， h小时， n分钟，s秒 
* Example: new Date().Add("d",-1)
*/
Date.prototype.Add = function (part, value) {
    value *= 1;
    if (isNaN(value)) {
        value = 0;
    }
    switch (part) {
        case "y":
            this.setFullYear(this.getFullYear() + value);
            break;
        case "m":
            this.setMonth(this.getMonth() + value);
            break;
        case "d":
            this.setDate(this.getDate() + value);
            break;
        case "h":
            this.setHours(this.getHours() + value);
            break;
        case "n":
            this.setMinutes(this.getMinutes() + value);
            break;
        case "s":
            this.setSeconds(this.getSeconds() + value);
            break;
        default:
    }
}

function getTimeString(str){
		str = str.replace(/-/g,"/");
		var dat = new Date(str);
		return dat.ToLocalTime().Format("yyyy-MM-dd HH:mm");
}

function getTimeString1(str){
    str = getDate(str);
    var dat = new Date(str);
    return dat.ToLocalTime().Format("dd/MM/yyyy HH:mm");
}

function getDate(strDate) {
    var st = strDate;
    var a = st.split(" ");
    var b = a[0].split("/");
    if (typeof(a[1]) == "undefined") {
       return strDate;
		}   
    var c = a[1].split(":");
//  var date = new Date(b[2], b[1], b[0], c[0], c[1]);
    var date = b[2]+"/"+b[1]+"/"+b[0]+" "+a[1];
    return date;
}