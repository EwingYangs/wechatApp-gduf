// page/info/infodetail.js
var Bmob = require("../../utils/bmob.js");
const WxParse = require('../../utils/wxParse/wxParse.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    var optionId = options.id;
    var Article = Bmob.Object.extend("_Article");
    //创建查询对象，入口参数是对象类的实例
    var query = new Bmob.Query(Article);
    //查询单条数据，第一个参数是这条数据的objectId值
    query.get(optionId, {
      success: function (result) {
        // 查询成功，调用get方法获取对应属性的值
        var title = result.get("title");
        var content = result.get("content");
        content = content.replace('<title>素材预览</title>','');
        WxParse.wxParse('content', 'html', content, that);
        var detail = { title: title, createdAt: result.createdAt};
        that.setData({
          detail: detail,
        });
      },
      error: function (object, error) {
        // 查询失败
      }
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
  
  }
})