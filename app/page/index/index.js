// page/index/index.js
var common = require('../../utils/common.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isBind: false,
    accounts: ["16#A", "16#B", "17#A", "17#B", "18#A", "18#B", "19#A", "19#B", "20#A", "20#B", "21#A", "21#B", "22#A", "22#B", "23#A", "23#B", "24#A", "24#B", "25#A", "25#B"],
    dormNumber:'',
    floorNumber: 0,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let dorm = wx.getStorageSync('dorm');
    if(dorm){
      this.setData({
        isBind: true,
        dormNumber: dorm.dormNumber,
        floorNumber: this.data.accounts[dorm.floorNumber]
      });
    }

    common.showFlushMsg();
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
  
  score:function(){
    //如果没有登录跳到登录界面
    var isLogin = common.checkLogin();
    if (!isLogin) {
      wx.navigateTo({
        url: '../login/index'
      })
    }else{
      wx.navigateTo({
        url: '../score/index'
      })
    }
  },


  study: function () {
    //如果没有登录跳到登录界面
    var isLogin = common.checkLogin();
    if (!isLogin) {
      wx.navigateTo({
        url: '../login/index'
      })
    } else {
      wx.navigateTo({
        url: '../study/index'
      })
    }
  },

  book: function () {
      wx.navigateTo({
        url: '../book/index'
      })
  },


  body: function () {
    wx.navigateTo({
      url: '../body/query'
    })
  },

  user : function () {
    wx.navigateTo({
      url: '../user/index'
    })
  },

  lesson : function () {
    //如果没有登录跳到登录界面
    var isLogin = common.checkLogin();
    if (!isLogin) {
      wx.navigateTo({
        url: '../login/index'
      })
    } else {
      wx.navigateTo({
        url: '../lessonTable/index'
      })
    }
  },

  flush : function(){
    wx.showToast({
      title: '数据加载中',
      icon: 'loading',
      duration: 500
    });
    this.onShow();
  }
})