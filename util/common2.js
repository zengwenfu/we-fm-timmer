var app = getApp();
var request = require('./request2.js');
let api = app.api[app.globalData.env];
var dateUtil = require('./dateUtil.js');

/**
 * 对返回的结果进行加工处理
 */
function dueResult(res) {
    if(res.data.code === '0') {
        var result = {
            '1': {
                total: 0,
                done: 0,
                list: []
            },
            '2': {
                total: 0,
                done: 0,
                list: []
            },
            '3': {
                total: 0,
                done: 0,
                list: []
            },
            '4': {
                total: 0,
                done: 0,
                list: []
            }
        };
        let list = res.data.data.list;
        for(let i = 0; i < list.length; i++) {
            let item = list[i];
            let quadrant = result[item.type];
            if(!quadrant) {
                quadrant = {
                    total: 0,
                    done: 0,
                    list: []
                };
                result[item.type] = quadrant;
            }
            quadrant.list.push(item);
            quadrant.total++;
            if(item.finished === '1') {
                quadrant.done++;
            }
        }
        console.log(result)
        return result;
    } else {
        console.log(res.msg);
        return;
    }
}

/**
 *  保存当天数据到本地
 */
function saveToLocal(date, result) {
    wx.setStorage({
      key: date,
      data: result,
      success: function(res){
        // success
      },
      fail: function(res) {
        // fail
      },
      complete: function(res) {
        // complete
      }
    })
}

/**
 *  从缓存取值
 */
function getFromLocal(date) {
    return new Promise(function(resolve, reject) {
        wx.getStorage({
          key: date,
          success: function(res){
            resolve(res);
          },
          fail: function(res) {
            resolve(false);
          }
        })
    });
}

/**
 *  到后台查询当天所有任务
 */
function requestToday() {
    return new Promise(function(resolve, reject) {
         request({
            url: api.host + api.getToday,
            data: {},
            method: 'GET',
            success: function(res){
                console.log(res)
                console.log(res.data.data.date);
                app.globalData.getKey = res.data.data.date;
                console.log(app.globalData.getKey)
                var result = dueResult(res);
                saveToLocal(res.data.data.date, result);
                resolve(result);
            },
            fail: function(res) {
                reject(res);
            }
         });
    });
}


/**
 *  获取当天所有任务
 */
function getToday() {
    return new Promise(function(resolve, reject) {
        //强刷的标志
        if(app.globalData.updateFlag) {
            app.globalData.updateFlag = false;
            requestToday().then(function(result) {
                resolve(result);
            });
        } else {
            var currentDate = dateUtil.format(new Date(), 'yyyy/MM/dd');
            getFromLocal(currentDate).then(function(result) {
                if(result) {
                    //从缓存获取成功
                    resolve(result.data);
                } else {
                    requestToday().then(function(result) {
                        resolve(result);
                    });
                }
            });
        }
    });
}

module.exports = {
    getToday: getToday,
    requestToday: requestToday
}