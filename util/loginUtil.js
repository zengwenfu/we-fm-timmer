/**
 * create by zengwenfu
 */


/**
 *  登录
 */
function login() {
    return new Promise(function(resolve, reject) {
        //读取本地session_id
        getSessionId().then(function(sessionid) {
            wx.login({
                success: function(res) {
                    var param = {
                        code: res.code
                    };
                    if(sessionid) {
                        param.sessionid = sessionid;
                    }

                    console.log(param);
                    //发起网络请求
                    wx.request({
                        url: 'https://we.facemagic888.com/user/login',
                        method: 'POST',
                        data: param,
                        success: function(result) {
                            result = result.data;
                            if(result.code === '0') {
                                wx.setStorage({
                                    key: 'sessionid',
                                    data: result.data.sessionid,
                                    success: function(res){
                                        // success
                                    },
                                    fail: function() {
                                        // fail
                                    },
                                    complete: function() {
                                        // complete
                                    }
                                });
                                resolve(result.data);
                            }
                            resolve();
                        }
                    });
                }
            });
        })
    });
}

/**
 *  本地是否保存过session_id，如果有的话，即使会话过期，也不为用户重新注册了
 *  autoLogin，拿不到session的时候是否需要自动登录
 */
function getSessionId() {
    return new Promise(function(resolve, reject) {
        wx.getStorage({
          key: 'sessionid',
          success: function(res){
                resolve(res.data);
          },
          fail: function() {
            resolve(false);
          }
        })
    });
}

/**
 *  注册
 */
function regist(sessionid) {
    wx.getUserInfo({
      success: function(res){
        var data = {
            data: JSON.stringify(res.userInfo),
            sessionid: sessionid
        };
        wx.request({
          url: 'https://we.facemagic888.com/user/register',
          data: data,
          method: 'POST', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
          success: function(res){
            if(res.data.code === '0') {
                console.log('注册成功');
            }
          },
          fail: function() {
             console.log('注册失败');
          },
          complete: function() {
            // complete
          }
        });
      },
      fail: function() {
        // fail
      },
      complete: function() {
        // complete
      }
    })
}

/**
 *  判断登录态是否过期
 */
function checkSession() {
    return new Promise(function(resolve, reject) {
         wx.checkSession({
            success: function() {
                //登录态不过期
                console.log('已登录');
                resolve();
            },
            fail: function() {
                //登录 如果有必要的话注册
                login().then(function(data) {
                    //服务器会通知这个用户有否注册过
                    if(data.registered === '0') {
                        regist(data.sessionid);
                    }
                    resolve();
                });
            }
        });
    });
};


module.exports = {
    checkSession: checkSession,
    getSessionId: getSessionId,
    login: login,
    regist: regist
}
