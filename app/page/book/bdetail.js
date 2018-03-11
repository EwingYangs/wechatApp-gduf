// page/find/bdetail.js
var config = require("../../utils/config.js");
var common = require('../../utils/common.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    title:'',
    bimage:'../../images/cover-default-s.png',
    author:'',
    price:'未获取',
    publish:'未获取',
    snum: '',
    isbn: '',
    recno:'',
    page: '',
    date: '未获取',
    desc: '未获取',
    localList:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options);
    if (options.isbn && options.recno && options.snum){
      this.setData({
        isbn: options.isbn,
        recno: options.recno,
        snum: options.snum,
      });
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
    this.getBookDetail();
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

  getBookDetail: function(){
    if (!this.data.isbn && !this.data.recno) {
      common.showModal("数据获取错误", '', (res) => {
          wx.navigateTo({
            url: '../book/index',
          })
      });
      return false;
    }

    wx.showLoading({
      title: '加载中',
    })

    wx.request({
      url: config.gdufgetBookDetailUrl, //教务系统登录地址
      data: {
        ListISBN: this.data.isbn,
        ListRecno: this.data.recno,
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded',
        'x-gduf-access-token': config.token,
      },
      method: 'POST',
      success: res => {
        if (!res.data) {
          common.showTip('查询失败', 'loading');
          wx.hideLoading();
        }

        if (res.data.status.code == 1001) {
          common.showModal("ISBN损坏，无法查询详细", '', (res) => {
            wx.navigateTo({
              url: '../book/index',
            })
          });
          wx.hideLoading();
          return false;
        }

        let bookDetail = res.data.data;
        console.log(bookDetail);
        this.setData({
          desc: bookDetail.baseInfo.summary,
          title: bookDetail.baseInfo.title,
          author: bookDetail.baseInfo.author,
          price: bookDetail.baseInfo.price,
          publish: bookDetail.baseInfo.publisher,
          page: bookDetail.baseInfo.pages,
          date: bookDetail.baseInfo.pubdate,
          localList: bookDetail.bookLocal.book
        });


        //兼容一条信息
        if (bookDetail.bookLocal.book.hasOwnProperty('bookid')){
          let local = [];
          local[0] = bookDetail.bookLocal.book;
          this.setData({
            localList: local
          });
        }

        if (bookDetail.bookImage){
          this.setData({
            bimage: bookDetail.bookImage
          });
        }

        wx.hideLoading();
      },
      fail: error => {
        wx.hideLoading();
        common.showTip('查询失败', 'loading');
        console.log(error);
      }
    })
  }
})