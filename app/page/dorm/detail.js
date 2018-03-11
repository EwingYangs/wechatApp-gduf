// page/dorm/detail.js
var config = require("../../utils/config.js");
var common = require('../../utils/common.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    feeList: [],
    buyList: [],
    dormNumber: '',
    floorNumber: 0,
    buildingId: 0,
    accounts: ["16#A", "16#B", "17#A", "17#B", "18#A", "18#B", "19#A", "19#B", "20#A", "20#B", "21#A", "21#B", "22#A", "22#B", "23#A", "23#B", "24#A", "24#B", "25#A", "25#B"],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let dorm = wx.getStorageSync('dorm');
    if(dorm){
      let floorNumber = this.data.accounts[dorm.floorNumber];
      this.setData({
        dormNumber: dorm.dormNumber,
        buildingId: dorm.buildingId,
        floorNumber: floorNumber,
      });
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
    this.getFeeList();
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

  getFeeList: function () {
    if (!this.data.dormNumber && !this.data.buildingId) {
      return false;
    }
    wx.showLoading({
      title: '加载中',
    })

    wx.request({
      url: config.gdufgetFeeListUrl, //教务系统登录地址
      data: {
        buildingId: this.data.buildingId,
        roomName: this.data.dormNumber,
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded',
        'x-gduf-access-token': config.token,
      },
      method: 'POST',
      success: res => {
        if (!res.data) {
          common.showTip('查询失败', 'loading');
          wx.hideLoading();
        }
        if (res.data.status.code == 1001) {
          common.showModal("您的宿舍暂时没有录入系统!请切换宿舍", '', (res) => {
            if (res.confirm) {
              wx.navigateTo({
                url: '../dorm/index',
              })
            }
          });
          wx.hideLoading();
          return false;
        }

        this.setData({
          feeList: res.data.data.feeListArr,
          buyList: res.data.data.buyListArr,
        });

        wx.hideLoading();
      },
      fail: error => {
        wx.hideLoading();
        common.showTip('查询失败', 'loading');
        console.log(error);
      }
    })
  }
})