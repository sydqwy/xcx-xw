// pages/movies/movies.js
var app = getApp();
var utils = require('../../utils/util.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    inTheater:{},
    comingSoon:{},
    top250:{}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var inTheaterUrl = app.globalData.doubanBase+'/v2/movie/in_theaters'+"?start=0&count=3";
    var comingSoonUrl = app.globalData.doubanBase + '/v2/movie/coming_soon'+"?start=0&count=3";
    var top250Url = app.globalData.doubanBase + '/v2/movie/top250' + "?start=0&count=3";
    this.getMovieListData(inTheaterUrl, 'inTheater');
    this.getMovieListData(comingSoonUrl, 'comingSoon');
    this.getMovieListData(top250Url,'top250');
  },

  getMovieListData:function(url,keyName){
    var that=this;
    //url: 'https://douban.uieee.com/v2/movie/top250',
    wx.request({
      url: url,
      data: {},
      header: { "content-type":"json" },
      method: 'GET',
      success: function (res) {
        console.log(res)
        that.processDoubanData(res.data,keyName);
      },
      fail: function () {
        console.log('调用失败了')
      },
      complete: function () {

      }
    })
  },

  //检查数据
  processDoubanData:function(moveList,keyName){
    var movie=[];
    var movie_title = moveList.title.substring(0,4);
    for(var idx in moveList.subjects){
      var subject = moveList.subjects[idx];
      var title = subject.title;
      if(title.length > 6){
        title = title.substring(0,6)+'...';
      }

      var temp={
        stars: utils.convertToStarsArray(subject.rating.stars),
        title: title,
        average:subject.rating.average,
        coverageUrl:subject.images.large,
        movieId:subject.id
      }
      movie.push(temp);
    }
    console.log(movie)
    var readKey={};
    readKey[keyName]={
      title:movie_title,
      moviesLists:movie
    };
    this.setData(readKey)
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

  }
})