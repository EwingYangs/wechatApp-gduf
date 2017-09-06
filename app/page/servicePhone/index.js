// page/servicePhone/index.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    phoneList: [
      { shorthand: '教', bgColor: '#E183A8', siteName: '教务处', phone: '020-8558888' },
      { shorthand: '保', bgColor: '#7EB1C6', siteName: '保卫处', phone: '020-8558888' },
      { shorthand: '龙', bgColor: '#F3BD5B', siteName: '龙会酒店', phone: '020-8558888' }
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

  inputTyping: function (e) {
    this.setData({
      inputVal: e.detail.value
    });
  },

  call: function (e) {
    let phone = e.target.dataset.phone;
    wx.makePhoneCall({
      phoneNumber: phone
    })
  }
})