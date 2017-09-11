// page/collect/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabs: [
      { name: "电话", img: "../../images/icon_book.png" },
      { name: "图书", img: "../../images/icon_guide.png" },
      { name: "指南", img: "../../images/icon_guide.png" },
    ],
    activeIndex: 0,
    sliderOffset: 0,
    sliderLeft: 0,
    bgColor: [
      'p-color',
      'e-color',
      'b-color',
      'y-color',
      'g-color',
      'l-color',
    ],
    phoneList: [
      { shorthand: '教', siteName: '教务处', phone: '020-85588888', bgColor: 'p-color' },
      { shorthand: '教', siteName: '教务处', phone: '020-85588888', bgColor: 'p-color' },
      { shorthand: '教', siteName: '教务处', phone: '020-85588888', bgColor: 'p-color' },
      { shorthand: '教', siteName: '教务处', phone: '020-85588888', bgColor: 'p-color' },
    ],
    guide: [
      { shorthand: '大', siteName: '大一新生入学必备物品', thing: '一份新生入学必备手册', bgColor: 'p-color' },
      { shorthand: '大', siteName: '大一新生入学必备物品', thing: '一份新生入学必备手册', bgColor: 'p-color' },
      { shorthand: '大', siteName: '大一新生入学必备物品', thing: '一份新生入学必备手册', bgColor: 'p-color' },
      { shorthand: '大', siteName: '大一新生入学必备物品', thing: '一份新生入学必备手册', bgColor: 'p-color' },
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

  tabClick: function (e) {
    this.setData({
      sliderOffset: e.currentTarget.offsetLeft,
      activeIndex: e.currentTarget.id
    });
  },

  call: function (e) {
    let phone = e.target.dataset.phone;
    wx.makePhoneCall({
      phoneNumber: phone
    })
  },

})