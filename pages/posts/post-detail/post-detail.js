var postLists = require('../../../data/post-data.js');
var app = getApp();
const backgroundAudioManager = wx.getBackgroundAudioManager();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isPlayMusic:false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var that=this;
    var pid = options.id;
    var postData = postLists.dataList[pid];
    this.setData({
      newData: postData
    })

    var ShchLists = wx.getStorageSync('postsListsShch')
    if (ShchLists) {
      var currentShch = ShchLists[pid];
      if(currentShch == undefined){
        currentShch=false;
      }
      this.setData({
        'currentSc':currentShch
      })
    } else {
      var ShchLists = {};
      ShchLists[pid] = false;
      wx.setStorageSync('postsListsShch', ShchLists);
    }
    if (app.globalData.g_isPlayMusic && app.globalData.g_currentMusicPid === this.data.newData.pid){
    this.setData({ 'isPlayMusic': true });
    }
    this.setMusicStatus();
  },

  setMusicStatus:function(){
    var that=this;
    backgroundAudioManager.onPause(function () {
      that.setData({ 'isPlayMusic': false });
      app.globalData.g_isPlayMusic=false;
    });

    backgroundAudioManager.onPlay(function () {
      that.setData({ 'isPlayMusic':true })
      app.globalData.g_isPlayMusic=true;
      app.globalData.g_currentMusicPid=that.data.newData.pid;
    })
  },

  changeStatue: function(event) {
    //获取文章当前的id
    var id = this.data.newData.pid;
    //获取收藏列表
    var Shchs = wx.getStorageSync('postsListsShch')
    //修改文章是否被收藏的状态
    var status = !Shchs[id];
    //写进缓存的数据里
    Shchs[id] = status;
    //设置当前的状态
    this.setData({
      shch: status
    })
    //修改缓存的变化
    wx.setStorageSync('postsListsShch', Shchs);
    //用户提示信息
    var xinxi = status ? '收藏成功' : '取消收藏';
    wx.showToast({
      title: xinxi,
      duration: 1000,
      icon: 'loading'
    })
    // wx.showModal({
    //   title: '文章收藏',
    //   content: '收藏信息',
    //   showCancel:true,
    //   cancelText:'取消收藏',
    //   cancelColor:'#e8e8e8',
    //   confirmText:'确定收藏',
    //   confirmColor:'#f00'
    // })
  },

  fengxiang: function(event) {
    var itemLists = ['分享到QQ',
      '分享到微博',
      '分享到微信',
      '分享到贴吧'
    ]
    wx.showActionSheet({
      itemList: itemLists,
      itemColor: "#f00",
      success: function(res) {
        wx.showModal({
          title: '用户分享到了' + itemLists[res.tapIndex],
          content: '分享给朋友们吧' + res.cancel,
        })
      }
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  },

  onMusicTap: function(event) {
    var that=this;
    var musicStatus = this.data.isPlayMusic;
    var music = this.data.newData.music; 
    
    if(musicStatus){
      backgroundAudioManager.pause()
      that.setData({'isPlayMusic':false});
    }else{
      backgroundAudioManager.title = music.title
      backgroundAudioManager.epname = music.epname
      backgroundAudioManager.singer = music.singer
      backgroundAudioManager.coverImgUrl = music.coverImgUrl
      // 设置了 src 之后会自动播放
      backgroundAudioManager.src = music.src
      that.setData({'isPlayMusic':true});
    }
  }

})