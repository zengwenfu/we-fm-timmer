import { checkSession } from './util/loginUtil.js';
App({
  api: {
    mock: {
      host: '../mock/',
      getToday: 'getToday.js',
    },
    prd: {
      host: 'https://we.facemagic888.com/',
      getToday: 'timer/getToday',
      addTask: 'timer/addTask'
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
    //更新标志，新增或修改后要把这个标志置为true
    updateFlag: true,
    getKey: '',
    env: 'prd'
  }
})
