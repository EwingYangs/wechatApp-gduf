// page/user/index.js
var Bmob = require("../../utils/bmob.js");
var common = require('../../utils/common.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    islogin : true,
    sno : 0,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 页面初始化 options为页面跳转所带来的参数
    var currentUser = Bmob.User.current();
    var userInfo = currentUser.attributes;
    this.setData({
      userInfo: userInfo,
    })  
    wx.setNavigationBarTitle({ title: userInfo.nickName })
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
    var that = this;
    var isLogin = common.checkLogin();
    this.setData({
      islogin: isLogin,
    })  
    if (isLogin){
      wx.getStorage({
        key: 'jwxtInfo',
        success: function (res) {
          that.setData({
            sno: res.sno,
          }) 
        }
      })
    }
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

  login: function(){
    wx.navigateTo({
      url: '../login/index'
    })
  },

  logout: function(){
    var that = this;
    common.showModal('你确定要退出登录吗？', '提示' , function(res){
      if (res.confirm) {
        console.log('确定退出')
        wx.removeStorageSync('jwxtInfo');//清空缓存
        that.onShow();//刷新页面
      } else {
        console.log('取消')
      }
    });
  },
})