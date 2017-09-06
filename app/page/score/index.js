// page/score/index.js
var common = require('../../utils/common.js');
Page({
  /**
   * 页面的初始数据
   */
  data: {
    accounts: ["2016-2017-2", "QQ", "Email"],
    accountIndex: 0,
    scoreData : [
      { course: '微积分Ⅰ', num: '	16130014', attr: '必修', character: '专业基础课', credit: 4, term: '2013-2014-1', point: 3.7, score: 85},
      { course: '信息技术导论', num: '15412007', attr: '必修', character: '专业基础课', credit: 3, term: '2013-2014-1', point: 1, score: 61 },
    ],
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

  bindCountryChange: function (e) {
    console.log('picker country 发生选择改变，携带值为', e.detail.value);

    this.setData({
      countryIndex: e.detail.value
    })
  },
  bindAccountChange: function (e) {
    console.log('picker account 发生选择改变，携带值为', e.detail.value);

    this.setData({
      accountIndex: e.detail.value
    })
  },


})