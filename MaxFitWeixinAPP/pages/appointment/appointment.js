// appointment.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
      coaches:[],
      starCoaches: [],      
      coachcategoryid:0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log('appoint onload');
    const that = this;
    wx.request({
      url: 'https://api.it120.cc/' + app.globalData.subDomain + '/cms/category/list',
      success: function (res) {
        var coachcategoryid = 0;
        for (var i = 0; i < res.data.data.length; i++) {
          if (res.data.data[i].name == "coach") {
            coachcategoryid = res.data.data[i].id;
          }
        }
        that.data.coachcategoryid = coachcategoryid;
        that.getNewsList(that.data.coachcategoryid);
      }
    });
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
  getNewsList: function (categoryId) {
    if (categoryId == 0) {
      categoryId = "";
    }
    //console.log(categoryId)
    var that = this;
    wx.request({
      url: 'https://api.it120.cc/' + app.globalData.subDomain + '/cms/news/list',
      data: {
        categoryId: categoryId
      },
      success: function (res) {
        var StarCoaches = [];
        var Coaches = [];
        for (var i = 0; i < res.data.data.length; i++) {
          if (res.data.data[i].isRecommend === true){
            StarCoaches.push(res.data.data[i]);
          }
          else{
            Coaches.push(res.data.data[i]);
          }
        }
        that.setData({
          coaches: Coaches,
          starCoaches: StarCoaches
        });
      }
    });
  }
})