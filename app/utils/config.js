var host = "https://www.itbasket.top";
// var host = "http://www.gduf.cn";
module.exports = {
  // API 接口www.gduf-api.com
  token: "bad0f20dbd034357e6bff27e7a4453b3",
  gdufLoginUrl: host + "/site/login",//登录接口
  gdufScoreUrl: host + "/site/score",//查询成绩接口
  gdufRoomUrl: host + "/room/get-room",//查询自习室接口
  gdufLessonUrl: host + "/lesson/get-lesson",//查看课表接口
  gdufGetBookListUrl: host + "/book/get-book-list",//查询图书接口
  gdufGetBookImageUrl: host + "/book/get-book-image",//查询图书图片接口
  gdufgetBookDetailUrl: host + "/book/get-book-detail",//查询图书详情接口
  gdufgetCurrentFeeUrl: host + "/fee/get-current-fee",//查询当前水电费接口
  gdufgetFeeListUrl: host + "/fee/get-fee-list",//查询水电费详情接口
  scoreFrom: ["全部", "2017-2018-2(第二学期)", "2017-2018-1(第一学期)", "2016-2017-2(第二学期)", "2016-2017-1(第一学期)", "2015-2016-2(第二学期)", "2015-2016-1(第一学期)", "2014-2015-2(第二学期)", "2014-2015-1(第一学期)", "2013-2014-2(第二学期)", "2013-2014-1(第一学期)"],//成绩查询学期列表，每个学期要新增一个
  termStartTime:'2018-03-05',
}
