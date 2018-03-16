// page/index/index.js
var common = require('../../utils/common.js');
var config = require("../../utils/config.js");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isBind: false,
    dormNumber:'',
    floorNumber: 0,
    buildingId: 0,
    accounts: ["16#A", "16#B", "17#A", "17#B", "18#A", "18#B", "19#A", "19#B", "20#A", "20#B", "21#A", "21#B", "22#A", "22#B", "23#A", "23#B", "24#A", "24#B", "25#A", "25#B"],
    dormFeeInt:'0',
    dormFeeFloat: '.00',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let dorm = wx.getStorageSync('dorm');
    if(dorm){
      let floorNumber = this.data.accounts[dorm.floorNumber];
      this.setData({
        isBind: true,
        dormNumber: dorm.dormNumber,
        buildingId: dorm.buildingId,
        floorNumber: floorNumber,
      });
    }

    common.showFlushMsg();


    //强制用智校园的接口
    let jwxtInfo = wx.getStorageSync('jwxtInfo');
    if (jwxtInfo && !jwxtInfo.token){
      //如果有登录过并且没有token信息的,没有登录过不做任何处理
      common.reLoginGduf();
    }
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
    //查询最新的电费
    this.getDormFee();
    common.showFlushMsg();
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
    this.getDormFee();
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


  //***********************自定义函数 **************************//
  
  score:function(){
    //如果没有登录跳到登录界面
    var isLogin = common.checkLogin();
    if (!isLogin) {
      wx.navigateTo({
        url: '../login/index'
      })
    }else{
      wx.navigateTo({
        url: '../score/index'
      })
    }
  },


  study: function () {
    //如果没有登录跳到登录界面
    var isLogin = common.checkLogin();
    if (!isLogin) {
      wx.navigateTo({
        url: '../login/index'
      })
    } else {
      wx.navigateTo({
        url: '../study/index'
      })
    }
  },

  book: function () {
      wx.navigateTo({
        url: '../book/index'
      })
  },


  body: function () {
    common.showModal('体侧暂未开放查询');
    return false;
    wx.navigateTo({
      url: '../body/query'
    })
  },

  getFeeDetail: function(){
    let dorm = wx.getStorageSync('dorm');
    if (!dorm) {
      common.showModal("请先绑定宿舍", '', (res) => {
        if(res.confirm){
          wx.navigateTo({
            url: '../dorm/index',
          })
        }
      });
      return false;
    }
    wx.navigateTo({
      url: '../dorm/detail',
    })
  },

  user : function () {
    wx.navigateTo({
      url: '../user/index'
    })
  },

  lesson : function () {
    //如果没有登录跳到登录界面
    var isLogin = common.checkLogin();
    if (!isLogin) {
      wx.navigateTo({
        url: '../login/index'
      })
    } else {
      wx.navigateTo({
        url: '../lessonTable/index'
      })
    }
  },

  // flush : function(){
  //   this.onShow();
  // },

  getDormFee : function(){
    if (!this.data.dormNumber && !this.data.buildingId){
      return false;
    }
    wx.showNavigationBarLoading() //在标题栏中显示加载

    wx.request({
      url: config.gdufgetCurrentFeeUrl, //教务系统登录地址
      data: {
        buildingId: this.data.buildingId,
        roomName: this.data.dormNumber,
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded',
        'x-gduf-access-token': config.token,
      },
      method: 'POST',
      success: res => {
        if(!res.data){
          common.showTip('查询失败', 'loading');
          wx.hideNavigationBarLoading() //完成停止加载
        }
        if(res.data.status.code == 1001){
          common.showModal("您的宿舍暂时没有录入系统!请切换宿舍",'',(res) => {
            if(res.confirm){
              wx.navigateTo({
                url: '../dorm/index',
              })
            }
          });
          wx.hideNavigationBarLoading() //完成停止加载
          return false;
        }

        let dormFee = res.data.data;
        dormFee = dormFee.split('.');
        this.setData({
          dormFeeInt: dormFee[0],
          dormFeeFloat: '.' + dormFee[1], 
        });

        
      },
      fail: error => {
        common.showTip('查询失败', 'loading');
        console.log(error);
      },
      complete: function () {
        // complete
        wx.hideNavigationBarLoading() //完成停止加载
        wx.stopPullDownRefresh() //停止下拉刷新
      }
    })
  }
})