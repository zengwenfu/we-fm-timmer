var request = require('../../util/request2.js');
var app = getApp();
let api = app.api[app.globalData.env];
var common = require('../../util/common2.js');

Page({
  data: {
    typeList: ['重要紧急','紧急不重要','重要不紧急','不重要不紧急'],
    index: 0,
    endTime: '10:00',
    startTime: '09:00',
    title: '',
    discript: ''
  },
  bindPickerChange: function(e) {
    this.setData({
      index: parseInt(e.detail.value)
    });
  },
  bindStartTimeChange: function(e) {
    this.setData({
      startTime: e.detail.value
    });
  },
  bindEndTimeChange: function(e) {
    console.log(e.detail.value);
    this.setData({
      endTime: e.detail.value
    });
  },
  bindTitleInput: function(e) {
    this.setData({
      title: e.detail.value
    });
  },
  bindDiscriptInput: function(e) {
    this.setData({
      discript: e.detail.value
    });
  },
  addTask: function(e) {
    let self = this;
    if(this.data.title === '') {
      wx.showToast({
        'title': '请输入任务名称'
      });
      return;
    }




    var param = {
      type: (self.data.index + 1) + '',
      title: self.data.title,
      discript: self.data.discript,
      start: self.data.startTime,
      end: self.data.endTime
    }

    request({
      url: api.host + api.addTask,
      data: {
        data: JSON.stringify(param)
      },
      method: 'POST', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      // header: {}, // 设置请求的 header
      success: function(res){
       
        if(res.data.code === '0') {
            app.globalData.updateFlag = true;
            wx.showToast({
              title: '提交成功'
            });
            self.setData({
              index: 0,
              title: '',
              discript: ''
            });
        } else {
           wx.showToast({
             title: '提交失败'
           });
        }
        
      },
      fail: function(res) {
        
      }
    })
  },
  onLoad: function(options) {
    // Do some initialize when page load.
  },
  onReady: function() {
    // Do something when page ready.
  },
  onShow: function() {
    // Do something when page show.
  },
  onHide: function() {
    // Do something when page hide.
  },
  onUnload: function() {
    // Do something when page close.
  },
  onPullDownRefresh: function() {
    // Do something when pull down.
  },
  onReachBottom: function() {
    // Do something when page reach bottom.
  },
  onShareAppMessage: function () {
   // return custom share data when user share.
  }
})