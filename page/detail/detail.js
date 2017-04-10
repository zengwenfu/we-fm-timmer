var common = require('../../util/common.js')
Page({
  data: {
    list: [],
    delBtnWidth: 120
  },
  touchS: function(e) {
    console.log("touchS" + e);
    //判断是否只有一个触摸点
    if (e.touches.length == 1) {
      this.setData({
        //记录触摸起始位置的X坐标
        startX: e.touches[0].clientX
      });
    }
  },
  // 触摸时触发，手指在屏幕上每移动一次，触发一次
  touchM: function(e) {
    console.log("touchM:" + e.touches);
    var _this = this;
    if (e.touches.length == 1) {
      //记录触摸点位置的X坐标
      let moveX = e.touches[0].clientX;
      //计算手指起始点的X坐标与当前触摸点的X坐标的差值
      let disX = _this.data.startX - moveX;
      //delBtnWidth 为右侧按钮区域的宽度
      let delBtnWidth = _this.data.delBtnWidth;
      let txtStyle = "";
      // let item = {};
      if (disX > 0 && disX <= delBtnWidth) { //移动距离大于0，文本层left值等于手指移动距离
        this.setData({
          'list[0].moveX': -disX
        })
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
    console.log("touchE" + e);
    let _this = this;
    if (e.changedTouches.length == 1) {
      //手指移动结束后触摸点位置的X坐标
      let endX = e.changedTouches[0].clientX;
      //触摸开始与结束，手指移动的距离
      let disX = _this.data.startX - endX;
      let delBtnWidth = _this.data.delBtnWidth;
      let movx = disX > delBtnWidth / 2 ? delBtnWidth : 0;
      //如果距离小于删除按钮的1/2，不显示删除按钮
      this.setData({
        'list[0].moveX': -movx
      })
    }
  },
  onLoad: function(options) {
    let _this = this;
    console.log(options.type);
    common.getItemByType('2017/04/10',options.type,function(res){
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
  onShareAppMessage: function () {
   // return custom share data when user share.
  }
})