var common = require('../../util/common.js');
Page({
  data: {
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
  onLoad: function(options) {
    let _this = this;
    // Do some initialize when page load.
    common.getAllData().then(res => {
      let lists = res.data.list;
      let doneImportUrgency = '';
      let doneImportNoUrgency = '';
      let doneNoImportUrgency = '';
      let doneNoImportNoUrgency = '';
      let allImportUrgency = '';
      let allImportNoUrgency = '';
      let allNoImportUrgency = '';
      let allNoImportNoUrgency = '';
      lists.forEach(function(item, index) {
        switch (item.type) {
          case '1':
            allImportUrgency++;
            if (item.finished === '0') {
              doneImportUrgency++;
            }
            break;
          case '2':
            allImportNoUrgency++;
            if (item.finished === '0') {
              doneImportNoUrgency++;
            }
            break;
          case '3':
            allNoImportUrgency++;
            if (item.finished === '0') {
              doneNoImportUrgency++;
            }
            break;
          case '4':
            allNoImportNoUrgency++;
            if (item.finished === '0') {
              doneNoImportNoUrgency++;
            }
            break;
          default:
            break;
        }
        _this.setData({
          importUrgency: {
            all: allImportUrgency,
            done: doneImportUrgency,
            type: '1'
          },
          importNoUrgency: {
            all: allImportNoUrgency,
            done: doneImportNoUrgency,
            type: '2'
          },
          noImportUrgency: {
            all: allNoImportUrgency,
            done: doneNoImportUrgency,
            type: '3'
          },
          noImportNoUrgency: {
            all: allNoImportNoUrgency,
            done: doneNoImportNoUrgency,
            type: '4'
          }
        })
      });
    });
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