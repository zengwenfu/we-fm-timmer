var common = require('../../util/common.js');
var app = getApp();
Page({
  data: {
    list: [],
    delBtnWidth: 120,
    total: 0,
    index: 0
  },
  touchS: function(e) {
    let _this = this;
    //判断是否只有一个触摸点
    let len = this.data.total;
    let curIndex = e.currentTarget.dataset.index;
    console.log(len);
    let item = {};
    if(this.data.index !== curIndex){
      let preItem = 'list[' + this.data.index + '].moveX';
      item[preItem] = 0;
    }
    this.setData(item);
    if (e.touches.length == 1) {
      this.setData({
        //记录触摸起始位置的X坐标
        startX: e.touches[0].clientX,
        index: curIndex
      });
    }
  },
  // 触摸时触发，手指在屏幕上每移动一次，触发一次
  touchM: function(e) {
    let curIndex = e.currentTarget.dataset.index;
    let _this = this;
    if (e.touches.length == 1) {
      //记录触摸点位置的X坐标
      let moveX = e.touches[0].clientX;
      //计算手指起始点的X坐标与当前触摸点的X坐标的差值
      let disX = _this.data.startX - moveX;
      //delBtnWidth 为右侧按钮区域的宽度
      let delBtnWidth = _this.data.delBtnWidth;
      let txtStyle = "";

      if (disX > 0 && disX <= delBtnWidth) { //移动距离大于0，文本层left值等于手指移动距离
        let item = {};
        let curItem = 'list[' + curIndex + '].moveX';
        item[curItem] = -disX;
        this.setData(item);
      }
      // //获取手指触摸的是哪一个item
      // var index = e.currentTarget.dataset.index;
      // var list = _this.data.addressList;
      // //将拼接好的样式设置到当前item中
      // list[index].txtStyle = txtStyle;
      // //更新列表的状态
      // this.setData({
      //   addressList: list
      // });
    }
  },
  touchE: function(e) {
    let curIndex = e.currentTarget.dataset.index;
    let _this = this;
    if (e.changedTouches.length == 1) {
      //手指移动结束后触摸点位置的X坐标
      let endX = e.changedTouches[0].clientX;
      //触摸开始与结束，手指移动的距离
      let disX = _this.data.startX - endX;
      let delBtnWidth = _this.data.delBtnWidth;
      let movx = disX > delBtnWidth / 2 ? delBtnWidth : 0;
      //如果距离小于删除按钮的1/2，不显示删除按钮
      let item = {};
      let curItem = 'list[' + curIndex + '].moveX';
      item[curItem] = -movx;
      this.setData(item);
    }
  },
  delItem: function(e) {
    console.log(e)
    let _this = this;
    let curIndex = e.currentTarget.dataset.index;
    let preList = _this.data.list;
    console.log(preList)
    let curList = [];
    let param = {
      id: e.currentTarget.dataset.id
    }
    self.showLoading();
    //请求
    request({
      url: api.host + api.deleteTast,
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
          curList = preList.remove(curIndex);
          this.setData({
            list: curList
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
    let _this = this;
    console.log(options.type);
    _this.setData({
      total: options.total
    })
    console.log(app.globalData.getKey)
    common.getItemByType(app.globalData.getKey, options.type, function(res) {
      console.log(res)
        _this.setData({
          list: res
        })
      })
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