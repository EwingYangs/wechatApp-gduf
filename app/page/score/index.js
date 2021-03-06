// page/score/index.js
var common = require('../../utils/common.js');
var config = require("../../utils/config.js");
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
    color: [
      'p-color',
      'e-color',
      'b-color',
      'y-color',
      'g-color',
      'l-color',
    ],
    accounts: config.scoreFrom,
    accountIndex: 1,
    scoreData : [],
    loading:true,
    page:1
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
    var page = this.data.page;//默认第一页
    var accounts = this.data.accounts;
    var accountIndex = this.data.accountIndex;
    var kksj = accounts[accountIndex];
    kksj = kksj.replace(/\(.*\)/, '');
    this.setData({
      loading: true
    })
    
    this.setscoreData(kksj , page);
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
    wx.showToast({
      title: '数据加载中',
      icon: 'loading',
      duration: 1000
    });
    var accounts = this.data.accounts;
    var kksj = accounts[this.data.accountIndex];
    kksj = kksj.replace(/\(.*\)/, '');
    if (this.data.accountIndex == 0) {
      kksj = '';
    }
    var page = this.data.page + 1;
    this.setData({
      page: page
    })
    this.setscoreData(kksj , page);
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  },

  bindAccountChange: function (e) {
    var accounts = this.data.accounts;
    var kksj = accounts[e.detail.value];
    kksj = kksj.replace(/\(.*\)/,'');
    if (e.detail.value == 0){
      kksj = '';
    }
    this.setData({
      loading: true,
      scoreData : [],//置空
      page:1
    })

    this.setscoreData(kksj, this.data.page);
    this.setData({
      accountIndex: e.detail.value
    })
  },

  setscoreData: function (kksj,page){
    if(config.isGdufApi){
      //判断是否使用智校园的接口
      this.request(kksj, page);
    }else{
      this.request(kksj, page);
    }
  },

  //新版请求，调用智校园接口获取数据（因无法显示绩点，暂时用旧版的请求）
  requestGduf: function (kksj, page){
    var bgColorList = this.data.bgColor;
    var colorList = this.data.color;
    var jwxt = wx.getStorageSync('jwxtInfo');
    if (!jwxt) {
      common.showTip('获取用户信息失败，请重新登录');
    }
    var encoded = jwxt.encoded;
    //实现成绩请求
    wx.request({
      url: config.zgdufScoreUrl, //成绩地址
      data: {
        xh: jwxt.sno,
        xnxqid: kksj,
        page: page,
        token: jwxt.token,
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded',
        'x-gduf-access-token': config.token,
      },
      method: 'POST',
      success: res => {
        if (res.data.status.code == 1006) {
          common.showModal('身份认证出错，请重新登录', '', function () {
            wx.navigateBack({
              delta: 1
            })
          });
          wx.hideLoading();
          return false;
        }

        let scoreListData = res.data.data;
        let scoreData = this.data.scoreData;

        if (scoreData.length == 0 && scoreListData.length == 0) {
          this.setData({
            loading: false
          })
          return false;
        }

        for (let ids in scoreListData) {
          let j = ids % 6;
          let bgColor = bgColorList[j];
          let color = colorList[j];
          scoreListData[ids].bgColor = bgColor;
          scoreListData[ids].color = color;
        }

        if (this.data.scoreData.length > 0) {
          if (scoreListData.length == 0) {
            common.showTip('数据已加载完！');
            return false;
          }
          scoreListData = this.data.scoreData.concat(scoreListData);
        }

        this.setData({
          scoreData: scoreListData,
          loading: false
        })
      }
    })
  },


  //旧版请求，调用抓取网页接口获取数据
  request: function (kksj, page){
    var that = this;
    var bgColorList = that.data.bgColor;
    var colorList = that.data.color;
    var jwxt = wx.getStorageSync('jwxtInfo');
    if (!jwxt) {
      common.showTip('获取用户信息失败，请重新登录');
    }
    var encoded = jwxt.encoded;
    //实现成绩请求
    wx.request({
      url: config.gdufScoreUrl, //成绩地址
      data: {
        page: page,
        kksj: kksj,
        encoded: encoded,
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded',
        'x-gduf-access-token': config.token,
      },
      method: 'POST',
      success: res => {
        if (res.data.status.code == 1005) {
          //重新登录
          common.reLogin();
          var page = this.data.page;//默认第一页
          var kksj = '';//默认查询全部
          this.setscoreData(kksj, page);
        } else {
          var scoreListData = res.data.data.data;
          var len = scoreListData.length;
          var arr = new Array();
          for (var i = 0; i < len; i++) {
            var j = i % 6;
            var bgColor = bgColorList[j];
            var color = colorList[j];
            scoreListData[i][7] = isNaN(scoreListData[i][7]) ? 0 : parseInt(scoreListData[i][7]);

            var result = {
              course: scoreListData[i][3],
              num: scoreListData[i][2],
              attr: scoreListData[i][9],
              character: scoreListData[i][10],
              credit: parseInt(scoreListData[i][6]),
              term: scoreListData[i][1],
              point: scoreListData[i][7],
              score: parseInt(scoreListData[i][5]),
              bgColor: bgColor,
              color: color
            };
            arr.push(result);
          }

          if (that.data.scoreData.length > 0) {
            if (arr.length == 0) {
              common.showTip('数据已加载完！')
            }
            arr = that.data.scoreData.concat(arr);
          }

          that.setData({
            scoreData: arr,
            loading: false
          })
        }
      }
    })
  }


})