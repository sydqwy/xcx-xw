// pages/movies/more-movie/more-movie.js
var app = getApp();
var utils = require('../../../utils/util.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    movieType:'',
    movies:'',
    dataUrl:'',
    totalCount:0,
    isEmpty:false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var type = options.type;
    console.log(type)
    this.setData({'movieType':type});
    var dataUrl='';
    switch (type){
      case "即将上映":
        dataUrl = app.globalData.doubanBase + '/v2/movie/coming_soon';
      break;
      case "正在上映":
        dataUrl = app.globalData.doubanBase + '/v2/movie/in_theaters';
      break;
      case "豆瓣电影":
        dataUrl = app.globalData.doubanBase + '/v2/movie/top250';
      break;
    }
    this.setData({'dataUrl':dataUrl});
    utils.http(dataUrl, this.processDoubanData);
  },

  processDoubanData:function(moveList){
    var movie = [];
    for (var idx in moveList.subjects) {
      var subject = moveList.subjects[idx];
      var title = subject.title;
      if (title.length > 6) {
        title = title.substring(0, 6) + '...';
      }

      var temp = {
        stars: utils.convertToStarsArray(subject.rating.stars),
        title: title,
        average: subject.rating.average,
        coverageUrl: subject.images.large,
        movieId: subject.id
      }
      movie.push(temp);
    }
    var moreMovie={};
    
    if(this.data.isEmpty){
      moreMovie = this.data.movies.concat(movie);
      
      this.setData({'movies':moreMovie});
    }else{
      this.setData({ 'movies': movie });
      this.setData({ 'isEmpty': true });
    }
    this.data.totalCount += 20;
    wx.hideNavigationBarLoading();
    wx.stopPullDownRefresh();
  },

  onReady:function(){
    wx.setNavigationBarTitle({
      title: this.data.movieType
    })
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
  //电影的更新
  onMovieUp:function(event){
    var nextUrl = this.data.dataUrl+'?start='+this.data.totalCount+'&count=20';
    utils.http(nextUrl,this.processDoubanData);
    wx.showNavigationBarLoading();
  },
  //下拉刷新
  onPullDownRefresh:function(event){
    var newUrl = this.data.dataUrl+'?start=0&count=20';
    this.data.movies={};
    this.setData({'isEmpty':false});
    utils.http(newUrl,this.processDoubanData);
    wx.showNavigationBarLoading();
  }
  
})