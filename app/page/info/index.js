// page/info/index.js
var common = require('../../utils/common.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    guide: [
      { shorthand: '大', siteName: '大一新生入学必备物品', thing: '一份新生入学必备手册', bgColor: 'b-p-color' ,iscollect: false},
      { shorthand: '大', siteName: '大一新生入学必备物品', thing: '一份新生入学必备手册', bgColor: 'b-p-color' ,iscollect: false},
      { shorthand: '大', siteName: '大一新生入学必备物品', thing: '一份新生入学必备手册', bgColor: 'b-p-color' ,iscollect: false},
      { shorthand: '大', siteName: '大一新生入学必备物品', thing: '一份新生入学必备手册', bgColor: 'b-p-color' ,iscollect: false},
    ]
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

  collect: function (event) {
    var collectid = event.target.dataset.id;
    var guide = this.data.guide;
    console.log(collectid);
    guide[collectid].iscollect = true;
    this.setData({
      guide: guide,
    })
    common.showTip('收藏成功');
  },

  cancel: function (event) {
    var collectid = event.target.dataset.id;
    var guide = this.data.guide;
    guide[collectid].iscollect = false;
    this.setData({
      guide: guide,
    })
    common.showTip('取消收藏成功');
  }
})