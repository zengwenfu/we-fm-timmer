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
    console.log(this.data);
    let url = ''
    if (e.currentTarget.dataset.total > 0) {
      url = '../detail/detail?type=' + e.currentTarget.dataset.type;
    } else {
      wx.showToast({
        title: '请添加相应类型任务！',
        icon: 'success',
        duration: 800
      })
      url = '../additem/additem';
    }
    setTimeout(function() {
      wx.navigateTo({
        url: url
      });
    }, 1000)
  },
  /**
   * 加载用户信息
   */
  loadUser: function() {
    let _this = this;
    wx.getUserInfo({
      success: function(res) {
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
          all: result['1'] ? result['1'].total : 0,
          done: result['1'] ? result['1'].done : 0
        },
        noImportUrgency: {
          all: result['2'] ? result['2'].total : 0,
          done: result['2'] ? result['2'].done : 0
        },
        importNoUrgency: {
          all: result['3'] ? result['3'].total : 0,
          done: result['3'] ? result['3'].done : 0
        },
        noImportNoUrgency: {
          all: result['4'] ? result['4'].total : 0,
          done: result['4'] ? result['4'].done : 0
        }
      })
    });
  },
  onLoad: function(options) {
    let _this = this;
    //加载用户信息
    _this.loadUser();
    //加载任务数据
    // _this.loadTaskData();
  },
  onReady: function() {
    // Do something when page ready.
  },
  onShow: function() {
    this.loadTaskData();
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