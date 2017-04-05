function ajax(options, success, fail, complete) {
    options.type = options.type ? options.type : 'GET';
    options.header = options.header ? options.header : { 'content-type': 'application/json' };
    options.dataType = options.dataType ? options.dataType : 'json';
    var app = getApp();
    if (app.globalData.env == 'mock') {
        var mockData = require(options.url);
        !!success && success(mockData.data);
        !!complete && complete(mockData.data);
        return;
    }
    wx.request({
        url: options.url,
        method: options.type,
        data: options.data,
        header: options.header,
        dataType: options.dataType,
        success: function(res) {
            !!success && success(res);
        },
        fail: function(res) {
            !!fail && fail(res);
        },
        complete: function(res) {
            !!complete && complete(res);
        }
    });
};

module.exports = {
    ajax: ajax
};