import { checkSession } from './util/loginUtil.js';
App({
  api: {
    mock: {
      host: '../mock/',
      getToday: 'getToday.js'
    },
    prd: {
      host: 'https://we.facemagic888.com/',
      getToday: 'timer/getToday'
    }
  },
  onLaunch: function () {
    console.log('App Launch');
    checkSession().then(function() {
        console.log('登录成功');
    });
  },
  onShow: function () {
    console.log('App Show')
  },
  onHide: function () {
    console.log('App Hide')
  },
  globalData: {
    hasLogin: false,
    env: 'prd'
  }
})
