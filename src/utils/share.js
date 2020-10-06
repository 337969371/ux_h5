//记录分享信息

//根据QueryString参数名称获取值
function getQueryStringByName(name) {
    var result = location.search.match(new RegExp("[\?\&]" + name + "=([^\&]+)", "i"));
    if (result == null || result.length < 1) {
        return "";
    }
    return result[1];
}
//记录pv
function _AddPageView(App, OpenID, Remark) {
    var url = "https://wx.fractalist.com.cn/fractalist/systemcommon/pageview";
    var params ={
        App: App,
        OpenID: OpenID,
        GUID: _GUID,
        URL: document.URL,
        UrlReferrer: document.referrer,
        Src: getQueryStringByName("src"),
        Remark: Remark
    };
    $.ajax({
        type: "post",
        url: url,
        data: params,
        dataType: "json",
        success: function (data) {
            if (data.Success) {
                console.log(true);
            } else {
                console.log(false);
            }
        },
        error: function (xhr, textStatus) {
            console.log(xhr);
        }
    });
}
//JS操作cookies方法!
//写cookies
function setCookie(name, value) {
    var Days = 1;
    var exp = new Date();
    exp.setTime(exp.getTime() + Days * 24 * 60 * 60 * 1000);
    document.cookie = name + "=" + escape(value) + ";expires=" + exp.toGMTString();
}
//获取cookies
function getCookie(name) {
    var arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
    if (arr = document.cookie.match(reg))
        return unescape(arr[2]);
    else
        return "";
}
//生成guid
function CreateGUID() {
    var guid = "";
    for (var i = 1; i <= 32; i++) {
        var n = Math.floor(Math.random() * 16.0).toString(16);
        guid += n;
        if ((i == 8) || (i == 12) || (i == 16) || (i == 20))
            guid += "-";
    }
    return guid;
}

//日志系统
function _Log(App, OpenID, Mobile, Type, SubType, Method, Parameter, Content, Remark) {

    var url = "https://wx.fractalist.com.cn/fractalist/systemcommon/log"
    var params = {
        App: App,
        OpenID: OpenID,
        Guid: _GUID,
        Mobile: Mobile,
        Type: Type,
        SubType: SubType,
        Method: Method,
        Parameter: Parameter,
        Content: Content,
        Remark: Remark
    };
    $.ajax({
        type: "post",
        url: url,
        data: params,
        dataType: "json",
        success: function (data) {
            if (data.Success) {
                console.log(true);
            } else {
                console.log(false);
            }
        },
        error: function (xhr, textStatus) {
            console.log(xhr);
        }
    });
}
//分享后记录数据
function RecordShare(type, remark) {
    _SubType = type;
    _Remark = remark;
    _Log(_App, _OpenID, _Mobile, "分享", _SubType, _Method, _Parameter, _Content, _Remark);
}

//朋友圈分享
function share(pengyouquanTitle, wxtitle, wxdesc, wxlink, wximgUrl) {
	if(pengyouquanTitle!=""){
	    _pengyouquanTitle = pengyouquanTitle;
	}
    if(wxtitle!=""){
    	_wxtitle = wxtitle;
    }
    if(wxdesc!=""){
    	_wxdesc = wxdesc;
    }
    if(wxlink!=""){
        _wxlink = wxlink;
    }
    if(wximgUrl!=""){
    	_wximgUrl = wximgUrl;
    }
    //配置微信分享文案
    onloadFun();
}

//配置微信分享文案
function onloadFun() {
    $.ajax({
        async: false,
        url: 'https://wx.fractalist.com.cn/fractalist/systemcommon/wechatshare?url=' + encodeURIComponent(window.location.href.split('#')[0]),
        type: "GET",
        dataType: 'json',
        timeout: 5000,
        beforeSend: function () {
        },
        success: function (json) {
            console.log(json);
            wx.config({
                debug: false,
                appId: json["appId"],
                timestamp: json["timestamp"],
                nonceStr: json["nonceStr"],
                signature: json["signature"],
                jsApiList: [
                       'checkJsApi',
                       'onMenuShareTimeline',
                       'onMenuShareAppMessage',
                       'scanQRCode'
                ]
            });

            wx.ready(function () {
            	//ready 里可以配置音频自动播放
                wx.onMenuShareAppMessage({
                    title: _wxtitle,
                    desc: _wxdesc,
                    link: _wxlink,
                    imgUrl: _wximgUrl,
                    trigger: function (res) {

                    },
                    success: function (res) {
						console.log("分享好友")
                        RecordShare("好友", JSON.stringify(res));

                    },
                    cancel: function (res) {
						console.log("share:cancel")
                    },
                    fail: function (res) {
						console.log("share:fail")
                    }
                });

                wx.onMenuShareTimeline({
                    title: _pengyouquanTitle,
                    link: _wxlink,
                    desc: _wxdesc,
                    imgUrl: _wximgUrl,
                    trigger: function (res) {
                    },
                    success: function (res) {
						console.log("分享朋友圈")
                        RecordShare("朋友圈", JSON.stringify(res));
                    },
                    cancel: function (res) {
						console.log("share:cancel")
                    },
                    fail: function (res) {
						console.log("share:fail")
                    }
                });


            });
        },
        complete: function (XMLHttpRequest, textStatus) {

        },
        error: function (xhr, textStatus) {
            console.info(xhr);
        }
    });
}
$(function () {

      //记录日志的URL
      _GUID = getCookie("_GUID");
      console.log("_GUID:" + _GUID);
      if (_GUID == "" || _GUID == null) {
       //生成一个guid
       _GUID = CreateGUID();
       //保存到cookie中
       setCookie("_GUID", _GUID);
      }
      //没有openid 的时可以使用guid 作为用户id 统计uv
      _OpenID = getCookie("_OpenID");
      //其他参数默认值，可根据需求进行赋值
      _Mobile = "",_Type = "";_SubType = "";_Method = "";_Parameter = document.URL;_Content = "";_Remark = "";

      _App = "idhub_0902";
     //记录pv_uv
     _AddPageView(_App, _OpenID, _Remark);

    //////////-----配置分享------////////
    // 以_开头的变量为全局变量
    _pengyouquanTitle = "连线ID.";
    _wxtitle = "连线ID.";
    _wxdesc = "改变玩法 自我而始";
    //分享出去的链接
    _wxlink = "https://id.vw.com.cn";
    //分享图片
    _wximgUrl = "https://id-oss.vw.com.cn/img/wlogo1.jpg";

   //使配置生效
    share(_pengyouquanTitle, _wxtitle, _wxdesc, _wxlink, _wximgUrl);
});
