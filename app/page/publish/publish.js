//获取应用实例
var app = getApp()
var Bmob = require("../../utils/bmob.js");
var common = require('../../utils/common.js');
var that;
Page({
  onLoad: function (options) {
    that = this;
    that.setData({//初始化数据
      isSrc: false,
      ishide: "0",
      autoFocus: true,
      isLoading: false,
      loading: true,
      isdisabled: false,
      filesUrl: [],
      files: []
    })
  },
  onReady: function () {
    wx.hideToast()
  },
  onShow: function () {
    var myInterval = setInterval(getReturn, 500);
    function getReturn() {
      wx.getStorage({
        key: 'openid',
        success: function (ress) {
          if (ress.data) {
            clearInterval(myInterval)
            that.setData({
              loading: true
            })
          }
        }
      })
    }
  },
  uploadPic: function () {//选择图标
    wx.chooseImage({
      count: 8, // 默认9
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        var files = res.tempFilePaths;
        
        var own = wx.getStorageSync('user_id')
        if (!own) {
          common.showModal("非常抱歉！获取授权信息失败，请在小程序页面删除本程序，重新搜索进入本程序允许授权");
          return false;
        }
        //上传
        var urlArr = that.data.filesUrl;
        //上传图片
        if (files.length > 0) {
          for (var i = 0; i < files.length; i++) {
            wx.showNavigationBarLoading()
            var newDate = new Date();
            var newDateStr = newDate.toLocaleDateString();
            var extension = /\.([^.]*)$/.exec(files[i]);
            if (extension) {
              extension = extension[1].toLowerCase();
            }
            var name = own + "-" + newDateStr + "." + extension;//上传的图片的别名
            var file = new Bmob.File(name, [files[i]]);
            file.save().then(function (res) {
              var url = res.url()
              urlArr.push(url);
              that.setData({
                filesUrl: urlArr,
              });
              console.log(url, urlArr);
            }, function (error) {
              console.log(error)
            })
          }
          that.setData({
            isSrc: true,
          })
        }
      }
    })
  },
  clearPic: function (event) {//删除图片
    var picurl = event.target.dataset.picurl
    var imgArr = that.data.filesUrl
    imgArr.splice(imgArr.indexOf(picurl, imgArr), 1);
    var s = new Bmob.Files.del(picurl).then(function (res) {
      if (res.msg == "ok") {
        console.log('删除成功');
        if (imgArr) {
          that.setData({
            isSrc: true,
            filesUrl: imgArr
          })
        } else {
          that.setData({
            isSrc: false,
            filesUrl: imgArr
          })
        }
      }
    },
      function (error) {
        console.log(error)
      });
  },
  changePublic: function (e) {//switch开关
    console.log(e.detail.value)
    if (e.detail.value == true) {
      wx.showModal({
        title: '是否匿名',
        content: '是否匿名发送',
        showCancel: true,
        confirmColor: "#a07c52",
        cancelColor: "#646464",
        success: function (res) {
          if (res.confirm) {
            that.setData({
              ishide: "1"
            })
          }
          else {
            that.setData({
              isPublic: true
            })
          }
        }
      })

    }
    else {
      wx.showModal({
        title: '是否匿名',
        content: '确定要将该心情退回吗？（退回的心情将在信箱模块消失，不再显示）',
        showCancel: true,
        confirmColor: "#a07c52",
        cancelColor: "#646464",
        success: function (res) {
          if (res.confirm) {
            that.setData({
              ishide: "0"
            })
          }
          else {
            that.setData({
              isPublic: false
            })
          }
        }
      })

    }
  },
  sendNewMood: function (e) {//保存心情
    //判断心情是否为空

    var content = e.detail.value.content;
    var title = e.detail.value.title;

    if (content == "") {
      common.showTip("内容不能为空", "loading");
    }
    else {
      that.setData({
        isLoading: true,
        isdisabled: true
      })
      wx.getStorage({
        key: 'user_id',
        success: function (ress) {
          var Cricle = Bmob.Object.extend("Cricle");
          var cricle = new Cricle();
          var me = new Bmob.User();
          me.id = ress.data;
          cricle.set("title", title);
          cricle.set("content", content);
          cricle.set("is_hide", that.data.ishide);
          cricle.set("publisher", me);
          cricle.set("likeNum", 0);
          cricle.set("commentNum", 0);
          cricle.set("liker", []);
          if (that.data.isSrc == true) {
            var filesUrl = that.data.filesUrl;//上传的图片url
            cricle.set("pic", filesUrl);
          }
          cricle.save(null, {
            success: function (result) {
              that.setData({
                isLoading: false,
                isdisabled: false
              })
              // 添加成功，返回成功之后的objectId（注意：返回的属性名字是id，不是objectId），你还可以在Bmob的Web管理后台看到对应的数据
              common.showTip("发布成功", "success", function () {
                wx.reLaunch({
                  url: '../cricle/cricle'
                })
              });
            },
            error: function (result, error) {
              // 添加失败
              console.log(error)
              common.showTip("发布失败", "loading");
              that.setData({
                isLoading: false,
                isdisabled: false
              })

            }
          });


        }
      })


    }

  },
  onPullDownRefresh: function () {
    wx.stopPullDownRefresh()
  }
})
