//index.js
//获取应用实例
var Bmob = require("../../utils/bmob.js");
var common = require('../../utils/common.js')
var app = getApp()
var that;

Page({
  data: {
    moodList: [],
    pageSize: 2,//每次加载多少条
    limit: 2,//跟上面要一致
    loading: false,
    windowHeight1: 0,
    windowWidth1: 0,
    count: 0,
    scrollTop: {
      scroll_top1: 0,
      goTop_show: false
    }
  },
  onLoad: function (e) {
    that = this;
    that.setData({
      loading: false
    })

  },
  onShow: function () {
    var molist = new Array();
    that = this;
    getReturn(that);
    var Diary = Bmob.Object.extend("Cricle");
    var query = new Bmob.Query(Diary);


    //此处查一次总计条数
    query.count({
      success: function (results) {
        that.setData({
          count: results
        })
        console.log(that.data.count, results)
      }
    });



    wx.getSystemInfo({
      success: (res) => {
        that.setData({
          windowHeight1: res.windowHeight,
          windowWidth1: res.windowWidth
        })
      }
    })
  },

  onShareAppMessage: function () {
    return {
      title: '遇见广金',
      desc: '倾心为广金人服务的小程序app',
      path: '/pages/index/index'
    }
  },
  onReachBottom: function (e) {
    var limit = that.data.limit
    console.log("上拉加载更多...." + that.data.limit)
    that.setData({
      limit: limit + that.data.pageSize,

    });
    this.onShow()
  },
  onPullDownRefresh: function () {
    wx.stopPullDownRefresh();
    var limit = that.data.limit
    console.log("下拉刷新....." + that.data.limit)
    that.setData({
      limit: that.data.pageSize,

    })
    that.onShow()
  },
  scrollTopFun: function (e) {
    if (e.detail.scrollTop > 300) {
      this.setData({
        'scrollTop.goTop_show': true
      });
    } else {
      this.setData({
        'scrollTop.goTop_show': false
      });
    }
  },

})

// 获取广金圈数据
function getReturn() {
  //如果是最后一页则不执行下面代码
  if (that.data.limit > that.data.pageSize && that.data.limit - that.data.pageSize >= that.data.count) {
    console.log("stop")
    common.showTip("已经是最后一页",'loading')
    return false;
  }
  that.setData({
    loading: false
  });
  var molist = new Array();
  wx.getStorage({
    key: 'user_id',
    success: function (ress) {
      if (ress.data) {
        var Cricle = Bmob.Object.extend("Cricle");
        var query = new Bmob.Query(Cricle);

        if (that.data.limit == that.data.pageSize) {
          query.limit(that.data.limit);
        }
        if (that.data.limit > that.data.pageSize) {
          query.limit(that.data.limit)
        }
        console.log('252');
        //条件查询
        query.equalTo("is_hide", "0");
        query.descending("title");
        query.include("publisher");
        
        // 查询所有数据
        query.find({
          success: function (results) {
            that.setData({
              loading: true
            });
            for (var i = 0; i < results.length; i++) {
              console.log(results[i]);
              var publisherId = results[i].get("publisher").id;
              var title = results[i].get("title");
              var content = results[i].get("content");
              var id = results[i].id;
              var createdAt = results[i].createdAt;
              var _url;
              var likeNum = results[i].get("likeNum");
              var commentNum = results[i].get("commentNum");
              var pic = results[i].get("pic");
              if (pic) {
                _url = results[i].get("pic")._url;
              }
              else {
                _url = null;
              }
              var name = results[i].get("publisher").get("nickName");
              var userPic = results[i].get("publisher").get("userPic");
              var liker = results[i].get("liker");
              var isLike = 0;
              for (var j = 0; j < liker.length; j++) {
                if (liker[j] == ress.data) {
                  isLike = 1;
                  break;
                }
              }
              var jsonA;
              if (pic) {
                jsonA = {
                  "title": title || '',
                  "content": content || '',
                  "id": id || '',
                  "avatar": userPic || '',
                  "created_at": createdAt || '',
                  "attachment": _url || '',
                  "likes": likeNum,
                  "comments": commentNum,
                  "is_liked": isLike || '',
                  "username": name || ''
                }
              }
              else {
                jsonA = {
                  "title": title || '',
                  "content": content || '',
                  "id": id || '',
                  "avatar": userPic || '',
                  "created_at": createdAt || '',
                  "attachment": _url || '',
                  "likes": likeNum,
                  "comments": commentNum,
                  "is_liked": isLike || '',
                  "username": name || ''
                }
              }

              molist.push(jsonA)
              that.setData({
                moodList: molist,
              })
            }
          },
          error: function (error) {
            common.showTip(error, "loading");
            console.log(error)
          }
        });

      }

    },
    fail: function (error) {
      console.log("失败")
    }
  })
}