// page/study/index.js
var common = require('../../utils/common.js');
var config = require("../../utils/config.js");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    accounts: ["2号教学楼", "1号教学楼", "7号教学楼", "3号教学楼", "6号教学楼", "实验教学楼"],
    accountsId: [1, 4, 5, 10, 14, 17],//教学楼对应的id
    accountIndex: 0,
    index:0,
    emptyRoom: [      // 0 没课   1 有课
      // [0, 1, 0, 1, 1, 0, 1, 1, 0, 0, 0, 0],
      // [0, 1, 0, 1, 1, 0, 1, 1, 0, 0, 0, 0],
      // [0, 1, 0, 1, 1, 0, 1, 1, 0, 0, 0, 0],
      // [0, 1, 0, 1, 1, 0, 1, 1, 0, 0, 0, 0],
      // [0, 1, 0, 1, 1, 0, 1, 1, 0, 0, 0, 0],
      // [0, 1, 0, 1, 1, 0, 1, 1, 0, 0, 0, 0]
      {
        index: 1,
        floor: [
          {
            ceil : 102,
            data: ["1", "1", "1", "1", "1", "1", "0", "1", "1", "1", "0", "1"],
          },
          {
            ceil : 103,
            data: ["1", "1", "1", "1", "1", "1", "0", "1", "1", "1", "0", "1"],
          },
        ]
      },

      {
        index: 2,
        floor: [
          {
            ceil: 202,
            data: ["1", "1", "1", "1", "1", "1", "0", "1", "1", "1", "0", "1"],
          },
          {
            ceil: 203,
            data: ["1", "1", "1", "1", "1", "1", "0", "1", "1", "1", "0", "1"],
          },
        ]
      },

      
      
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

  bindAccountChange: function (e) {
    console.log('picker account 发生选择改变，携带值为', e.detail.value);
    this.setData({
      accountIndex: this.data.accountsId[e.detail.value],
      index: e.detail.value,
    })

    this.setEmptyRoomData();
  },

  setEmptyRoomData : function(){
    let accoutIndex = this.data.accountIndex;
    console.log('00000' + accoutIndex);
    wx.request({
      url: config.gdufRoomUrl, //成绩地址
      data: {
        xqid: 1,
        jzwid: accoutIndex,
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded',
        'x-gduf-access-token': config.token,
      },
      method: 'POST',
      success: res => {
        this.setData({
          emptyRoom : res.data.data,
        });
      }
    })
  }
})