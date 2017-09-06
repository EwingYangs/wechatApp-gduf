// page/find/index.js
var sliderWidth = 188; // 需要设置slider的宽度，用于计算中间位置
Page({

  /**
   * 页面的初始数据
   */
  data: {
    books:[],
    tabs: [{ name: "图书查询", img: "../../images/icon_book.png" }, { name: "校园指南", img: "../../images/icon_guide.png"}],
    activeIndex: 0,
    sliderOffset: 0,
    sliderLeft: 0,
    radios: [
      { name: 'anycode', value: '任意词' ,checked: 'true' },
      { name: 'name', value: '书名', },
      { name: 'title', value: '主题词' },
      { name: 'ISBN', value: 'ISBN' },
    ],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    wx.getSystemInfo({
      success: function (res) {
        that.setData({
          sliderLeft: (res.windowWidth / that.data.tabs.length - sliderWidth) / 2,
          sliderOffset: res.windowWidth / that.data.tabs.length * that.data.activeIndex
        });
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
  }

})