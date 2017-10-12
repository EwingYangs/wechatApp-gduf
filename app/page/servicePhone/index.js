// page/servicePhone/index.js
var Bmob = require("../../utils/bmob.js");
var common = require('../../utils/common.js');
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
    ],
    phoneList: [],
    loading: true,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      loading: true
    })
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
                if (collectArr.indexOf(object.id) != "-1"){
                  iscollect = true;
                }
                var a = { pid: object.id, shorthand: fname, bgColor: bgColor, siteName: object.get('siteName'), phone: object.get('phone'), iscollect: iscollect };
                phoneList.push(a);
              }
              that.setData({
                phoneList: phoneList,
                loading: false
              })
            },
            error: function (error) {
            }
          });
        },
        error: function (error) {
          console.log("查询失败: " + error.code + " " + error.message);
          that.setData({
            loading: false
          })
        }
      });
  },


  collect: function (event){
    var collectid = event.target.dataset.id;
    var phoneList = this.data.phoneList;
    phoneList[collectid].iscollect = true;
    this.setData({
      phoneList: phoneList,
    })

    //创建类和实例
    var Collect = Bmob.Object.extend("collect");
    var collect = new Collect();
    var user = Bmob.User.current();
    var user = Bmob.Object.createWithoutData("_User", user.id);
    collect.set("user", user);
    collect.set("type", 0);//收藏电话
    collect.set("message", phoneList[collectid].pid);
    //添加数据，第一个入口参数是null
    collect.save(null, {
      success: function (result) {
        
      },
      error: function (result, error) {
        
      }
    });

    common.showTip('收藏成功');
    
  },

  cancel: function (event){
    var collectid = event.target.dataset.id;
    var phoneList = this.data.phoneList;
    phoneList[collectid].iscollect = false;
    this.setData({
      phoneList: phoneList,
    })

    var Collect = Bmob.Object.extend("collect");
    var collect = new Bmob.Query(Collect);
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