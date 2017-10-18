// page/lessonTable/index.js
var common = require('../../utils/common.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    week: [
      '第1周',
      '第2周',
      '第3周',
      '第4周',
      '第5周',
      '第6周',
      '第7周',
      '第8周',
      '第9周',
      '第10周',
      '第11周',
      '第12周',
      '第13周',
      '第14周',
      '第15周',
      '第16周',
      '第17周',
      '第18周',
      '第19周',
      '第20周'
    ],
    weekIndex: 0,
    lesson: [
      [               // 周一
        {
          site: '北教A503',     // 上课地点
          teacher: '邓超',      // 任课老师
          subject: '国际商务国际商务国际商务',  // 科目
          class: 1             // 节次： 1 => 1,2 节
                               // 2 => 3,4 节
                               // 3 => 3,4,5 节
                               // 4 => 6,7 节
                               // 5 => 6,7,8 节
                               // 6 => 9,10 节
                               // 7 => 11,12 节
        },
        {
          site: '北教D401',     // 上课地点
          teacher: '胡歌',      // 任课老师
          subject: '语文',      // 科目
          class: 3
        },
        {
          site: '北教D401',     // 上课地点
          teacher: '胡歌',      // 任课老师
          subject: '数学',      // 科目
          class: 5
        },
        {
          site: '北教D401',     // 上课地点
          teacher: '胡歌',      // 任课老师
          subject: '英语',      // 科目
          class: 6
        },
        {
          site: '北教D401',     // 上课地点
          teacher: '胡歌',      // 任课老师
          subject: '体育',      // 科目
          class: 7
        }
      ],
      [
        {
          site: '北教A503',     // 上课地点
          teacher: '邓超',      // 任课老师
          subject: '国际商务',  // 科目
          class: 1             // 节次： 1 => 1,2 节
                               // 2 => 3,4 节
                               // 3 => 3,4,5 节
                               // 4 => 6,7 节
                               // 5 => 6,7,8 节
                               // 6 => 9,10 节
                               // 7 => 11,12 节
        },
        {
          site: '北教D401',     // 上课地点
          teacher: '胡歌',      // 任课老师
          subject: '语文',      // 科目
          class: 3
        },
        {
          site: '北教D401',     // 上课地点
          teacher: '胡歌',      // 任课老师
          subject: '数学',      // 科目
          class: 4
        },
        {
          site: '北教D401',     // 上课地点
          teacher: '胡歌',      // 任课老师
          subject: '英语',      // 科目
          class: 6
        },
        {
          site: '北教D401',     // 上课地点
          teacher: '胡歌',      // 任课老师
          subject: '体育',      // 科目
          class: 7
        }
      ],
      [
        {
          site: '北教D401',     // 上课地点
          teacher: '胡歌',      // 任课老师
          subject: '语文',      // 科目
          class: 3
        },
        {
          site: '北教D401',     // 上课地点
          teacher: '胡歌',      // 任课老师
          subject: '数学',      // 科目
          class: 4
        },
        {
          site: '北教D401',     // 上课地点
          teacher: '胡歌',      // 任课老师
          subject: '体育',      // 科目
          class: 7
        }
      ],
      [
        {
          site: '北教D401',     // 上课地点
          teacher: '胡歌',      // 任课老师
          subject: '语文',      // 科目
          class: 1
        },
        {
          site: '北教D401',     // 上课地点
          teacher: '胡歌',      // 任课老师
          subject: '数学',      // 科目
          class: 5
        },
        {
          site: '北教D401',     // 上课地点
          teacher: '胡歌',      // 任课老师
          subject: '体育',      // 科目
          class: 7
        }
      ],
      [
        {
          site: '北教D401',     // 上课地点
          teacher: '胡歌',      // 任课老师
          subject: '语文',      // 科目
          class: 5
        },
        {
          site: '北教D401',     // 上课地点
          teacher: '胡歌',      // 任课老师
          subject: '数学',      // 科目
          class: 6
        },
        {
          site: '北教D401',     // 上课地点
          teacher: '胡歌',      // 任课老师
          subject: '体育',      // 科目
          class: 7
        }
      ],
      [],
      []
    ],
    day: ['一', '二', '三', '四', '五', '六', '日'],
    class: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
    bgColorArr: [
      'b-p-color',
      'b-e-color',
      'b-b-color',
      'b-y-color',
      'b-g-color',
      'b-l-color'
    ]
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

  bindWeekChange: function (e) {
    this.setData({
      weekIndex: e.detail.value
    })
  }

})