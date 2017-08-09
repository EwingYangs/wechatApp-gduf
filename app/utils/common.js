function showTip(sms, icon, fun, t) {
    if (!t) {
        t = 500;
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
        showCancel:false,
        success: fun
    })
}

function checkLogin(){
    wx.getStorage({
      key: 'jwxtInfo',
      success: function(res) {
        return true;
      },
      fail : function(){
        return false;
      }
    })
}


module.exports.showTip = showTip;
module.exports.showModal = showModal;
module.exports.checkLogin = checkLogin;