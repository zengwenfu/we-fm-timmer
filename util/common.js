var app = getApp();
var request = require('./request');
/**
 * 获取本地数据，失败则重新拉取数据
 * @param  {string} user    用户唯一标识
 * @param  {function} success 成功执行函数
 */
function getDataByUser(user, success) {
        wx.getStorage({
            key: user,
            success: function(res) {
                !!success && success(res);
            },
            fail: function() {
                /* 失败的话就请求后台重新获取数据 */
                getAllData();
            },
            complete: function() {
                console.log('获取本地数据结束');
            }
        });
}
/**
 * 把当天所有数据存储在本地
 * @param {string} user 用户唯一标识
 * @param {Object} data 需要存储的数据
 */
function setAllData(user, data) {
    try {
        wx.setStorageSync(user, data);
    } catch (e) {
        // statements
        console.log('数据存储失败');
    }
}

/**
 * 根据type处理数据
 * @param  {String}   user 用户唯一标识
 * @param  {String}   type 类型
 * @param  {Function} fn   处理函数
 */
function getItemByType(user, type, fn) {
    getDataByUser(user, function(res) {
        console.log(res)
        let lists = res.data[type].list;
        let items = [];
        console.log(res.data.list)
        lists.forEach(function(item, index) {
            if (item.type === type) {
                Object.assign(item, { moveX: '0' })
                items.push(item);
            }
        });
        console.log(items);
        !!fn && fn(items);
    });
}
/**
 * 请求后台数据
 */
function getAllData() {
    let api = app.api[app.globalData.env];
    let prodOptions = {
        url: api.host + api.getToday
    }
    return new Promise(function(resolve,reject) {
        request.ajax(prodOptions,
            function(data) {
                // console.log(data);
                if (data.code === '0') {
                    setAllData(data.user, data.data);
                }
                resolve(data);
            },
            function(data) {
                reject(data);
            },
            function(data) {
                console.log('请求结束');
            }
        );
    })
}

module.exports = {
    getAllData: getAllData,
    getItemByType: getItemByType,
    getDataByUser: getDataByUser
}
