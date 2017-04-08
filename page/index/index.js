var common = require('../../util/common2.js');
Page({
  data: {
    userinfo: {
      avatarUrl: '',
      nickName: ''
    },
    importUrgency: {
      all: 0,
      done: 0
    },
    importNoUrgency: {
      all: 0,
      done: 0
    },
    noImportUrgency: {
      all: 0,
      done: 0
    },
    noImportNoUrgency: {
      all: 0,
      done: 0
    }
  },
  addItem: function(e) {
    wx.navigateTo({
        url: '../additem/additem'
    });
  },
  toDetail: function(e) {
    wx.navigateTo({
        url: '../detail/detail?type='+ e.currentTarget.dataset.type
    });
  },
  /**
   * 加载用户信息
   */
  loadUser: function() {
    let _this = this;
    wx.getUserInfo({
      success: function(res){
        _this.setData({
          userinfo: {
            avatarUrl: res.userInfo.avatarUrl,
            nickName: res.userInfo.nickName
          }
        })
      }
    });
  },
  loadTaskData: function() {
    let _this = this;
    common.getToday().then(function(result) {
      console.log(result);
      _this.setData({
        importUrgency: {
          all: result['1'].total,
          done: result['1'].done
        },
        noImportUrgency: {
          all: result['2'].total,
          done: result['2'].done
        },
        importNoUrgency: {
          all: result['3'].total,
          done: result['3'].done
        },
        noImportNoUrgency: {
          all: result['4'].total,
          done: result['4'].done
        }
      })
    });
  },
  onLoad: function(options) {
    let _this = this;
    //加载用户信息
    _this.loadUser();
    //加载任务数据
    _this.loadTaskData();
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
});