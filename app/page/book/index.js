// page/find/index.js
var common = require('../../utils/common.js');
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
      { name: 'text', value: '任意词', checked: 'true' },
      { name: 'name', value: '书名', },
      { name: 'author', value: '作者' },
      { name: 'isbn', value: 'ISBN' },
    ],
    bookList:[],
    page: 1,
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
    // bookList: [
    //   { bname: '谁认识马云', author: '刘世英, 彭征', publish: '中信出版社', ISBN: '7-5086-0752-X', snum: 'K825.38/137', location: '社科书库2', remain: 8, bgColor: 'b-p-color', color: 'p-color'},
    //   { bname: '谁认识马云', author: '刘世英, 彭征', publish: '中信出版社', ISBN: '7-5086-0752-X', snum: 'K825.38/137', location: '社科书库2', remain: 8, bgColor: 'b-l-color', color: 'l-color'},
    //   { bname: '谁认识马云', author: '刘世英, 彭征', publish: '中信出版社', ISBN: '7-5086-0752-X', snum: 'K825.38/137', location: '社科书库2', remain: 8, bgColor: 'b-p-color', color: 'p-color'},
    // ],
    guide: [
      { shorthand: '大', siteName: '大一新生入学必备物品', thing: '一份新生入学必备手册', bgColor: 'b-p-color' },
      { shorthand: '大', siteName: '大一新生入学必备物品', thing: '一份新生入学必备手册', bgColor: 'b-p-color' },
      { shorthand: '大', siteName: '大一新生入学必备物品', thing: '一份新生入学必备手册', bgColor: 'b-p-color' },
      { shorthand: '大', siteName: '大一新生入学必备物品', thing: '一份新生入学必备手册', bgColor: 'b-p-color' },
    ],
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
    wx.getSystemInfo({
      success: res => {
        this.setData({
          sliderLeft: (res.windowWidth / this.data.tabs.length - sliderWidth) / 2,
          sliderOffset: res.windowWidth / this.data.tabs.length * this.data.activeIndex
        });
      }
    });
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

    let strKeyValue = this.data.inputVal;
    let radios = this.data.radios;
    let strType = '';
    for (let i = 0; i < radios.length; i++) {
      if (radios[i].checked) {
        strType = radios[i].name;
      }
    }
    let page = this.data.page + 1;
    this.setData({
      page: page
    })
    this.setBookListData(strType, strKeyValue, page);
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
    })
  },

  search(event){
    let strKeyValue = this.data.inputVal;

    if(!strKeyValue){
      common.showTip('请输入关键词','loading');
      return false;
    }

    let radios = this.data.radios;
    let strType = '';
    for (let i = 0; i < radios.length ; i++){
      if (radios[i].checked) {
        strType = radios[i].name;
      }
    }
    this.setData({
      bookList: [],//置空
      page: 1
    })

    let page = this.data.page;


    this.setBookListData(strType, strKeyValue, page);

    
  },

  setBookListData: function (strType, strKeyValue, page){
    wx.showLoading({
      title: '加载中',
    })
    var token = config.token;
    var bgColorList = this.data.bgColor;
    var colorList = this.data.color;
    //获取图书列表
    wx.request({
      url: config.gdufGetBookListUrl, //教务系统登录地址
      data: {
        strType: strType,
        strKeyValue: strKeyValue,
        page: page,
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded',
        'x-gduf-access-token': token,
      },
      method: 'POST',
      success: res => {
        var bookList = res.data.data ? res.data.data : [];
        var len = bookList.length;
        var arr = new Array();
        for (var i = 0; i < len; i++) {
          var j = i % 6;
          var bgColor = bgColorList[j];
          var color = colorList[j];
          var result = { 
            bname: bookList[i][1], 
            author: bookList[i][2], 
            publish: bookList[i][3], 
            ISBN: bookList[i][5], 
            snum: bookList[i][6], 
            location: '社科书库2', 
            remain: 8, 
            bgColor: bgColor,
            color: color 
          };
          arr.push(result);
        }

        if (this.data.bookList && this.data.bookList.length > 0) {
          if (arr.length == 0) {
            common.showTip('数据已加载完！')
          }
          arr = this.data.bookList.concat(arr);
        }

        this.setData({
          bookList: arr,
        })

        wx.hideLoading();
      }
    })
  }

})