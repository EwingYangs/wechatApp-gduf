var config = require("./config.js");

function requestScore(page){
  //实现成绩请求
  wx.request({
    url: config.gdufScoreUrl, //成绩地址
    data: {
      page: page,
    },
    header: {
      'content-type': 'application/x-www-form-urlencoded',
      'x-gduf-access-token': config.token,
    },
    method: 'POST',
    success: function (res) {
        return res;
    }
  })
}


module.exports.requestScore = requestScore;

