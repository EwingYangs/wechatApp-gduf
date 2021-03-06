var config = require("./config.js");

function showTip(sms, icon, fun, t) {
    if (!t) {
        t = 1000;
    }
    wx.showToast({
        title: sms,
        icon: icon,
        duration: t,
        success: fun
    })
}

function showModal(c,t,fun) {
    if(!t)
        t='提示'
    wx.showModal({
        title: t,
        content: c,
        showCancel:true,
        confirmColor: "#6981ea",
        cancelColor: "",
        success: fun
    })
}

/** 检测登录 */
function checkLogin(){
  var jwxt = wx.getStorageSync('jwxtInfo');
  if(jwxt){
    return true;
  }else{
    return false;
  }
}


/** 广金登录加密函数 */
var keyStr = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";

function encodeInp(input) {
  var output = "";
  var chr1, chr2, chr3 = "";
  var enc1, enc2, enc3, enc4 = "";
  var i = 0;
  do {
    chr1 = input.charCodeAt(i++);
    chr2 = input.charCodeAt(i++);
    chr3 = input.charCodeAt(i++);
    enc1 = chr1 >> 2;
    enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
    enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
    enc4 = chr3 & 63;
    if (isNaN(chr2)) {
      enc3 = enc4 = 64
    } else if (isNaN(chr3)) {
      enc4 = 64
    }
    output = output + keyStr.charAt(enc1) + keyStr.charAt(enc2) + keyStr.charAt(enc3) + keyStr.charAt(enc4);
    chr1 = chr2 = chr3 = "";
    enc1 = enc2 = enc3 = enc4 = ""
  } while (i < input.length);
  return output
}


function setFlushMsg(msg){
  wx.setStorageSync('msg', msg);
}

function getFlushMsg() {
  var f = wx.getStorageSync('msg');
  if (f){
      return true;
  }else{
      return false;
  }
}

function showFlushMsg(){
  wx.getStorage({
    key: 'msg',
    success: function (res) {
      showTip(res.data);
      wx.removeStorageSync('msg')
    }
  })
}

//重新登录
function reLoginGduf(){
  let jwxtInfo = wx.getStorageSync('jwxtInfo');
  if (!jwxtInfo){
    return false;
  }
  let sno = jwxtInfo.sno;
  let pwd = jwxtInfo.pwd;
  let encoded = jwxtInfo.encoded;
  let token = config.token;
  //实现登录请求
  wx.request({
    url: config.zgdufLoginUrl, //教务系统登录地址
    data: {
      xh: sno,
      pwd: pwd
    },
    header: {
      'content-type': 'application/x-www-form-urlencoded',
      'x-gduf-access-token': token,
    },
    method: 'POST',
    success: function (res) {
      if (res.data.flag != '1') {
        common.showModal('登录失败，账号或密码错误');
        return false;
      }
      //保存登录信息
      let jwxtInfo = {
        sno: sno,
        pwd: pwd,
        encoded: encoded,
        userrealname: res.data.userrealname,
        userdwmc: res.data.userdwmc,
        token: res.data.token,
      }
      wx.setStorageSync('jwxtInfo', jwxtInfo);
    }
  })
}

function reLogin() {
  let jwxtInfo = wx.getStorageSync('jwxtInfo');
  let encoded = jwxtInfo.encoded;
  let token = config.token;
  //实现登录请求
  wx.request({
    url: config.gdufLoginUrl, //教务系统登录地址
    data: {
      encoded: encoded,
    },
    header: {
      'content-type': 'application/x-www-form-urlencoded',
      'x-gduf-access-token': token,
    },
    method: 'POST',
    success: function (res) {
      if (res.data.status.msg == 'success') {
        //保存信息到缓存
        return true;
      } else {
        return false;
      }
    }
  })
}



module.exports.showTip = showTip;
module.exports.showModal = showModal;
module.exports.checkLogin = checkLogin;
module.exports.encodeInp = encodeInp;
module.exports.setFlushMsg = setFlushMsg;
module.exports.getFlushMsg = getFlushMsg;
module.exports.showFlushMsg = showFlushMsg;
module.exports.reLogin = reLogin;
module.exports.reLoginGduf = reLoginGduf;

