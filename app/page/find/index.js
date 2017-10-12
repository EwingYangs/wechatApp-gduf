// page/find/index.js
var config = require("../../utils/config.js");
var sliderWidth = 188; // 需要设置slider的宽度，用于计算中间位置
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
    tabs: [{ name: "图书查询", img: "../../images/icon_book.png" }, { name: "校园指南", img: "../../images/icon_guide.png" }],
    activeIndex: 0,
    sliderOffset: 0,
    sliderLeft: 0,
    radios: [
      { name: 'anycode', value: '任意词', checked: 'true' },
      { name: 'name', value: '书名', },
      { name: 'title', value: '主题词' },
      { name: 'ISBN', value: 'ISBN' },
    ],

    bookList: [],

    guide: [
      { shorthand: '大', siteName: '大一新生入学必备物品', thing: '一份新生入学必备手册', bgColor: 'b-p-color' },
      { shorthand: '大', siteName: '大一新生入学必备物品', thing: '一份新生入学必备手册', bgColor: 'b-p-color' },
      { shorthand: '大', siteName: '大一新生入学必备物品', thing: '一份新生入学必备手册', bgColor: 'b-p-color' },
      { shorthand: '大', siteName: '大一新生入学必备物品', thing: '一份新生入学必备手册', bgColor: 'b-p-color' },
    ],
    loading: true,
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
    var that = this;
    wx.getSystemInfo({
      success: function (res) {
        that.setData({
          sliderLeft: (res.windowWidth / that.data.tabs.length - sliderWidth) / 2,
          sliderOffset: res.windowWidth / that.data.tabs.length * that.data.activeIndex
        });
      }
    });

    this.setData({
      loading: true
    })

    this.setBookList();
    
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


  radioChange: function (e) {
    var checked = e.detail.value
    var changed = {}
    for (var i = 0; i < this.data.radios.length; i++) {
      if (checked.indexOf(this.data.radios[i].name) !== -1) {
        changed['radios[' + i + '].checked'] = true
      } else {
        changed['radios[' + i + '].checked'] = false
      }
    }
    this.setData(changed)
  },

  inputTyping: function (e) {
    this.setData({
      inputVal: e.detail.value
    });
  },

  bookdetail : function(){
    wx.navigateTo({
      url: 'bdetail',
      success: function(res) {},
      fail: function(res) {},
      complete: function(res) {},
    })
  },

  setBookList: function (strKeyValue, strType, page ){
    var that = this;
    var bgColorList = that.data.bgColor;
    var colorList = that.data.color;
    //实现成绩请求
    wx.request({
      url: config.gdufGetBookListUrl, //成绩地址
      data: {
        strKeyValue: '马云',
        strType: 'text',
        page: 1
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded',
        'x-gduf-access-token': config.token,
      },
      method: 'POST',
      success: function (res) {
        var bookListData = res.data.data;
        var len = bookListData.length;
        var arr = new Array();
        for (var i = 0; i < len; i++) {
          var j = i % 6;
          var bgColor = bgColorList[j];
          var color = colorList[j];
          var result = { bname: bookListData[i][1], author: bookListData[i][2], publish: bookListData[i][3], ISBN: bookListData[i][5], snum: bookListData[i][6], remain: 8 , page: bookListData[i][8], price: bookListData[i][9],  bgColor: bgColor, color: color };
          arr.push(result);
        }

        if (that.data.bookList.length > 0) {
          if (arr.length == 0) {
            common.showTip('数据已加载完！')
          }
          arr = that.data.bookList.concat(arr);
        }
console.log(arr);
console.log('1111');
        that.setData({
          bookList: arr,
          loading: false
        })

      }
    })
  }

})