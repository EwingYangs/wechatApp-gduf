// page/index/index.js
var common = require('../../utils/common.js');
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


  //***********************自定义函数 **************************//
  score: function () {
    //如果没有登录跳到登录界面
    var isLogin = common.checkLogin();
    if (!isLogin) {
      wx.navigateTo({
        url: '../login/index'
      })
    } else {
      wx.navigateTo({
        url: '../score/index'
      })
    }
  },
  servicePhone: function () {
    //如果没有登录跳到登录界面
    // var isLogin = common.checkLogin();
    // if (!isLogin) {
    //   wx.navigateTo({
    //     url: '../login/index'
    //   })
    // } else {
    //   wx.navigateTo({
    //     url: '../servicePhone/index'
    //   })
    // }
    wx.navigateTo({
      url: '../servicePhone/index'
    })
  }
})