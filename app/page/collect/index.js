// page/collect/index.js
var Bmob = require("../../utils/bmob.js");
var common = require('../../utils/common.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabs: [
      { name: "电话", img: "../../images/icon_tel.png" },
      { name: "图书", img: "../../images/icon_book.png" },
      { name: "指南", img: "../../images/icon_guide.png" },
    ],
    activeIndex: 0,
    sliderOffset: 0,
    sliderLeft: 0,
    bgColor: [
      'b-p-color',
      'b-e-color',
      'b-b-color',
      'b-y-color',
      'b-g-color',
      'b-l-color',
    ],
    phoneList: [],
    guide: [
      { shorthand: '大', siteName: '大一新生入学必备物品', thing: '一份新生入学必备手册', bgColor: 'b-p-color' },
      { shorthand: '大', siteName: '大一新生入学必备物品', thing: '一份新生入学必备手册', bgColor: 'b-p-color' },
      { shorthand: '大', siteName: '大一新生入学必备物品', thing: '一份新生入学必备手册', bgColor: 'b-p-color' },
      { shorthand: '大', siteName: '大一新生入学必备物品', thing: '一份新生入学必备手册', bgColor: 'b-p-color' },
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
    this.setPhoneList();
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

  setPhoneList : function(){
    var that = this;
    var Phone = Bmob.Object.extend("phone");
    var query = new Bmob.Query(Phone);
    var bgColorList = that.data.bgColor;
    // 查询所有数据
    query.find({
      success: function (results) {
        var Collect = Bmob.Object.extend("collect");
        var collect = new Bmob.Query(Collect);
        var isme = new Bmob.User();
        var user = Bmob.User.current();
        isme.id = user.id;        //当前用户的objectId
        collect.equalTo("user", isme);
        collect.equalTo("type", 0);
        collect.find({
          success: function (collectData) {
            var collectArr = [];
            for (var i = 0; i < collectData.length; i++) {
              var object = collectData[i];
              collectArr.push(object.get('message'));
            }
            // 循环处理查询到的数据
            var phoneList = [];
            for (var i = 0; i < results.length; i++) {
              var object = results[i];
              var fname = object.get('siteName').substr(0, 1);
              var j = i % 6;
              var bgColor = bgColorList[j];
              var iscollect = false;
              if (collectArr.indexOf(object.id) != "-1") {
                var a = { pid: object.id, shorthand: fname, bgColor: bgColor, siteName: object.get('siteName'), phone: object.get('phone')};
                phoneList.push(a);
              }
            }
            that.setData({
              phoneList: phoneList,
            })
          },
          error: function (error) {
          }
        });
      },
      error: function (error) {
        console.log("查询失败: " + error.code + " " + error.message);
      }
    });
  },

  cancel: function (event) {
    var collectid = event.target.dataset.id;
    var phoneList = this.data.phoneList;
    phoneList.splice(collectid, 1);
    this.setData({
      phoneList: phoneList,
    })

    var Collect = Bmob.Object.extend("collect");
    var collect = new Bmob.Query(Collect);
    console.log(phoneList[collectid].pid);
    collect.equalTo("message", phoneList[collectid].pid);
    collect.destroyAll({
      success: function (myObject) {
        // 删除成功
      },
      error: function (myObject, error) {
        // 删除失败
      }
    });

    common.showTip('取消收藏成功');
  },


})