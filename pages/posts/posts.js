var postList = require('../../data/post-data.js')

Page({

  /**
   * 页面的初始数据
   */
  data: {
  },

  onPostTap:function(event){
    var pid=event.currentTarget.dataset.id;
    wx.navigateTo({
      url:"./post-detail/post-detail",
    });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
     this.setData({postKey:postList.dataList})
    //this.data.postKey = postList.dataList
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
    console.log('页面显示')
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {
    console.log('页面隐藏')
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {
    console.log('页面关闭')
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {
    console.log('用户下拉')
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {
    console.log('页面触底')
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {
    console.log('页面分享')
  }
})