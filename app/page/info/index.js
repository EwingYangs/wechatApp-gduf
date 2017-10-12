// page/info/index.js
var common = require('../../utils/common.js');
var Bmob = require("../../utils/bmob.js");
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
    guide: [],
    loading: true,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      loading: true
    })
    this.setGuideData();
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

  //搜索
  inputTyping: function (e) {
    this.setData({
      inputVal: e.detail.value
    });

    this.setGuideData(e.detail.value);
  },

  collect: function (event) {
    var collectid = event.target.dataset.id;
    var guide = this.data.guide;
    console.log(collectid);
    guide[collectid].iscollect = true;
    this.setData({
      guide: guide,
    })

    //创建类和实例
    var Collect = Bmob.Object.extend("collect");
    var collect = new Collect();
    var user = Bmob.User.current();
    var user = Bmob.Object.createWithoutData("_User", user.id);
    collect.set("user", user);
    collect.set("type", 1);//收藏指南
    collect.set("message", guide[collectid].gid);
    //添加数据，第一个入口参数是null
    collect.save(null, {
      success: function (result) {

      },
      error: function (result, error) {

      }
    });

    common.showTip('收藏成功');
  },

  cancel: function (event) {
    var collectid = event.target.dataset.id;
    var guide = this.data.guide;
    guide[collectid].iscollect = false;
    this.setData({
      guide: guide,
    })

    var Collect = Bmob.Object.extend("collect");
    var collect = new Bmob.Query(Collect);
    collect.equalTo("message", guide[collectid].gid);
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

  // 设置校园指南列表的值，可根据标题搜索
  setGuideData: function (where) {
    var that = this;
    var Article = Bmob.Object.extend("_Article");
    var query = new Bmob.Query(Article);
    if (where) {
      query.equalTo("title", { "$regex": "" + where + ".*" });//模糊查询
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
        collect.equalTo("type", 1);
        collect.find({
          success: function (collectData) {
            var collectArr = [];
            for (var i = 0; i < collectData.length; i++) {
              var object = collectData[i];
              collectArr.push(object.get('message'));
            }
            // 循环处理查询到的数据
            var guide = [];
            for (var i = 0; i < results.length; i++) {
              var object = results[i];
              var fname = object.get('title').substr(0, 1);
              var j = i % 6;
              var bgColor = bgColorList[j];
              var iscollect = false;
              if (collectArr.indexOf(object.id) != "-1") {
                iscollect = true;
              }
              var a = { gid: object.id, shorthand: fname, bgColor: bgColor, siteName: object.get('title'), thing: object.get('desc'), iscollect: iscollect };
              guide.push(a);
            }
            that.setData({
              guide: guide,
              loading: false
            })
          },
          error: function (error) {
          }
        });
      },
      error: function (error) {
        console.log(error);
        console.log("查询失败: " + error.code + " " + error.message);
        that.setData({
          loading: false
        })
      }
    });
    
  },
})