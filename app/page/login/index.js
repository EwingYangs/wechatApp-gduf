// page/login/index.js
var common = require('../../utils/common.js');
var Bmob = require("../../utils/bmob.js");
var config = require("../../utils/config.js");
Page({

  /**
   * 页面的初始数据
   */
  data: {
  
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  },

  //显示模拟登录教务系统
  login: function (event){
    var sno = event.detail.value.usno;
    var pwd = event.detail.value.password;
    var account = common.encodeInp(sno);
    var passwd = common.encodeInp(pwd);
    var encoded = account + "%%%" + passwd;
    console.log(encoded);
    var token = config.token;
    //实现登录请求
    wx.request({
      url: config.gdufLoginUrl, //教务系统登录地址
      data: {
        encoded: encoded,
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded',
        'x-gduf-access-token' : token,
      },
      method: 'POST',
      success: function (res) {
        if (res.data.status.msg == 'success'){
          //保存信息到缓存
          var info = { sno: sno, pwd: pwd, encoded: encoded};
          wx.setStorageSync('jwxtInfo', info);
          common.setFlushMsg(res.data.data);
          wx.navigateTo({
            url: '/page/user/index',
          })
        }else{
          common.showModal('登录失败，账号或密码错误');
        }
      }
    })
  }
})