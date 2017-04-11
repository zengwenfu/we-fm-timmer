var request = require('../../util/request2.js');
var app = getApp();
let api = app.api[app.globalData.env];
var common = require('../../util/common2.js');

Page({
  data: {
    typeList: ['重要紧急', '紧急不重要', '重要不紧急', '不重要不紧急'],
    index: 0,
    endTime: '10:00',
    startTime: '09:00',
    title: '',
    discript: '',
    hidden: true
  },
  /**
   * 监听类型选择器
   */
  bindPickerChange: function(e) {
    this.setData({
      index: parseInt(e.detail.value)
    });
  },
  /**
   * 监听开始时间选择器
   */
  bindStartTimeChange: function(e) {
    this.setData({
      startTime: e.detail.value
    });
  },
  /**
   * 监听结束时间选择器
   */
  bindEndTimeChange: function(e) {
    console.log(e.detail.value);
    this.setData({
      endTime: e.detail.value
    });
  },
  /**
   * 监听标题表单域
   */
  bindTitleInput: function(e) {
    this.setData({
      title: e.detail.value
    });
  },
  /**
   * 监听描述表单域
   */
  bindDiscriptInput: function(e) {
    this.setData({
      discript: e.detail.value
    });
  },
  /**
   *  显示loading组件
   */
  showLoading: function() {
    this.setData({
      hidden: false
    });
  },
  /**
   *  隐藏loading
   */
  hideLoading: function() {
    this.setData({
      hidden: true
    })
  },
  /**
   * 增加任务
   */
  addTask: function(e) {
    let self = this;

    //标题必填
    if (this.data.title === '') {
      wx.showToast({
        'title': '请输入任务名称'
      });
      return;
    }

    // 显示loading组件
    self.showLoading();

    //读取参数
    var param = {
      type: (self.data.index + 1) + '',
      title: self.data.title,
      discript: self.data.discript,
      start: self.data.startTime,
      end: self.data.endTime
    }

    //请求
    request({
      url: api.host + api.addTask,
      data: {
        data: JSON.stringify(param)
      },
      method: 'POST',
      success: function(res) {
        self.hideLoading();
        if (res.data.code === '0') {
          app.globalData.updateFlag = true;
          wx.showToast({
            title: '提交成功',
            duration: 800
          });
          setTimeout(function() {
            wx.navigateBack({
              delta: 1
            })
          }, 1200)
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
        self.hideLoading();
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
  onShareAppMessage: function() {
    // return custom share data when user share.
  }
})