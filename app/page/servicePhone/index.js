// page/servicePhone/index.js
var Bmob = require("../../utils/bmob.js");
Page({
  /**
   * 页面的初始数据
   */
  data: {
    bgColor: [
      'b-p-color',
      'b-e-color',
      'b-b-color',
      'b-y-color',
      'b-g-color',
      'b-l-color',
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setPhoneListData();
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

    this.setPhoneListData(e.detail.value);
  },

  call: function (e) {
    let phone = e.target.dataset.phone;
    wx.makePhoneCall({
      phoneNumber: phone
    })
  },

  // 设置电话列表的值，可根据名字搜索
  setPhoneListData : function (where){
      var that = this;
      var Phone = Bmob.Object.extend("phone");
      var query = new Bmob.Query(Phone);
      if (where){
        query.equalTo("siteName", { "$regex": "" + where + ".*" });//模糊查询
      }
      var bgColorList = that.data.bgColor;
      // 查询所有数据
      query.find({
        success: function (results) {
          // 循环处理查询到的数据
          var phoneList = [];
          for (var i = 0; i < results.length; i++) {
            var object = results[i];
            var fname = object.get('siteName').substr(0, 1);
            var j = i % 6;
            var bgColor = bgColorList[j];
            var a = { shorthand: fname, bgColor: bgColor, siteName: object.get('siteName'), phone: object.get('phone') };
            phoneList.push(a);
          }
          that.setData({
            phoneList: phoneList,
          })
        },
        error: function (error) {
          console.log("查询失败: " + error.code + " " + error.message);
        }
      });
  }
})