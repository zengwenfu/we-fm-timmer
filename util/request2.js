import {getSessionId} from './loginUtil.js';

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
        if(sessionid) {
             options.data = options.data || {};
             options.data.sessionid = sessionid;
             wx.request(options);
        }
    });
}

module.exports = request;
