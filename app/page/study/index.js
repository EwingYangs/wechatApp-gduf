// page/study/index.js
var common = require('../../utils/common.js');
var config = require("../../utils/config.js");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    accounts: ["北教A", "北教B", "北教C", "北教D", "北阶","2号教学楼", "1号教学楼", "7号教学楼", "3号教学楼", "6号教学楼", "实验教学楼"],
    accountsId: [15, 16, 20, 18, 19, 1, 4, 5, 10, 14, 17],//教学楼对应的id
    accountIndex: 15,//默认北教A
    index:0,
    emptyRoom: []// 0 没课   1 有课
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
    common.showModal('绿色数字代表空教室');
    this.setEmptyRoomData();
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
      accountIndex: this.data.accountsId[e.detail.value],
      index: e.detail.value,
    })

    this.setEmptyRoomData();
  },

  setEmptyRoomData : function(){
    wx.showLoading({
      title: '加载中',
    })
    let accoutIndex = this.data.accountIndex;
    var jwxt = wx.getStorageSync('jwxtInfo');
    if (!jwxt) {
      common.showTip('获取用户信息失败，请重新登录');
    }
    var encoded = jwxt.encoded;
    wx.request({
      url: config.gdufRoomUrl, //成绩地址
      data: {
        xqid: 1,
        jzwid: accoutIndex,
        encoded: encoded,
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded',
        'x-gduf-access-token': config.token,
      },
      method: 'POST',
      success: res => {
        if (res.data.status.code == 1005) {
          //重新登录
          common.reLogin();
          this.setEmptyRoomData();
        }else{
          this.setData({
            emptyRoom: res.data.data,
          });
          wx.hideLoading();
        }
      }
    })
  }
})