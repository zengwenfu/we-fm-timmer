App({
  api: {
    mock: {
      host: '../mock/',
      getToday: 'getToday.js'
    },
    prd: {
      host: 'http://we.facemagic888.com/',
      getToday: 'timer/getToday'
    }
  },
  onLaunch: function () {
    console.log('App Launch')
  },
  onShow: function () {
    console.log('App Show')
  },
  onHide: function () {
    console.log('App Hide')
  },
  globalData: {
    hasLogin: false,
    env: 'mock'
  }
})
