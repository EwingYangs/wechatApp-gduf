// page/dorm/index.js
var common = require('../../utils/common.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    accounts: ["16A", "16B", "17A", "17B", "18A", "18B", "19A", "19B", "20A", "20B", "21A", "21B", "22A", "22B", "23A", "23B", "24A", "24B", "25A", "25B"],
    buildingId: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "2384", "2601", "2602", "2603", "2604", "2605", "2606", "2607", "2608", "2609"],
    accountIndex: 0,
    dormNumber:'',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let dorm = wx.getStorageSync('dorm');
    let accountIndex = parseInt(dorm.floorNumber);
    this.setData({
      accountIndex: accountIndex,
      dormNumber:dorm.dormNumber,
    });
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

  bindDorm: function (event){
    let dormNumber = event.detail.value.dormNumber;
    let floorNumber = this.data.accountIndex;
    let buildingId = this.data.buildingId[floorNumber];
    wx.setStorageSync('dorm', {
      dormNumber: dormNumber,
      floorNumber: floorNumber,
      buildingId:buildingId,
    });
    common.showModal('绑定成功', '', function () {
      wx.navigateTo({
        url: '../index/index',
      })
    });
  }
})