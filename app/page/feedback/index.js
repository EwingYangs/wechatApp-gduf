// pages/center/feedback/feedback.js
var Bmob = require("../../utils/bmob.js");
var common = require('../../utils/common.js');
Page({
  /**
   * 页面的初始数据
   */
  data: {
    content: ''
  },
  input(e) {
    this.setData({
      content: e.detail.value
    })
  },
  //添加反馈建议
  addFeedback(event) {
    var contact = event.detail.value.contact;
    var content = event.detail.value.content;

    if (!contact) {
      common.showTip("联系方式不能为空", "loading");
      return false;
    }

    if (!content) {
      common.showTip("内容不能为空", "loading");
      return false;
    }

    if (!(/^1[34578]\d{9}$/.test(contact))) {
      common.showTip("手机号码有误", "loading");
      return false;
    }

    this.setData({
      loading: true
    })

    let User = Bmob.Object.extend("_User");
    let currentUser = Bmob.User.current();
    let objectid = currentUser.id;
    let Diary = Bmob.Object.extend("feedback");
    let diary = new Diary();
    let me = new Bmob.User();
    me.id = objectid;
    diary.set("contact", contact);
    diary.set("content", content);
    diary.set("user", me);

    diary.save(null, {
      success: (result) => {
        // 添加成功，返回成功之后的objectId（注意：返回的属性名字是id，不是objectId），你还可以在Bmob的Web管理后台看到对应的数据
        common.showModal("反馈提交成功", '提示', function () {
          wx.navigateBack({
            delta: 1
          })
        }, false);
        this.setData({
          loading: false
        })

      },
      error: (result, error) => {
        // 添加失败
        common.showModal('反馈提交失败，请重新发布');
      }
    });

  },

})