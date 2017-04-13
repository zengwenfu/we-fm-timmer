import {getSessionId, login, regist} from './loginUtil.js';

function request(options) {
    var app = getApp();
    var success = options.success;
    var complete = options.complete;
    if (app.globalData.env == 'mock') {
        var mockData = require(options.url);
        !!success && success(mockData.data);
        !!complete && complete(mockData.data);
        return;
    }
    //获取sessionid
    getSessionId().then(function(sessionid) {
        console.log('ok:' + sessionid);
        //嵌入判断登录的处理
        options.success = function(data) {
            console.log("reqiest:" + JSON.stringify(data));
            if(data.data.code === '0001') {
                
                //登录 如果有必要的话注册
                login().then(function(result) {
                    //请求重发
                    request(options);

                    //服务器会通知这个用户有否注册过
                    if(result.registered === '0') {
                        regist(result.sessionid);
                    }
                });
            } else {
                success(data);
            }
        }


        if(sessionid) {
             options.data = options.data || {};
             options.data.sessionid = sessionid;
             wx.request(options);
        }

    });
}

module.exports = request;
