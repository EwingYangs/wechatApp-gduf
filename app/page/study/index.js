// page/study/index.js
var common = require('../../utils/common.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    accounts: ["北教A", "北教B", "北教C", "北教D"],
    accountIndex: 0,
    emptyRoom: [      // 0 没课   1 有课
      [0, 1, 0, 1, 1, 0, 1, 1, 0, 0, 0, 0],
      [0, 1, 0, 1, 1, 0, 1, 1, 0, 0, 0, 0],
      [0, 1, 0, 1, 1, 0, 1, 1, 0, 0, 0, 0],
      [0, 1, 0, 1, 1, 0, 1, 1, 0, 0, 0, 0],
      [0, 1, 0, 1, 1, 0, 1, 1, 0, 0, 0, 0],
      [0, 1, 0, 1, 1, 0, 1, 1, 0, 0, 0, 0]
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //如果没有登录跳到登录界面
    var isLogin = common.checkLogin();
    if (!isLogin) {
      wx.redirectTo({
        url: '../login/index'
      })
    }
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

  bindAccountChange: function (e) {
    console.log('picker account 发生选择改变，携带值为', e.detail.value);

    this.setData({
      accountIndex: e.detail.value
    })
  },
})