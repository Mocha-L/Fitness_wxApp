// pages/login/login.js
const App = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    motto: '欢迎登录WXapp',
    userName: '',
    userPassword: '',
    userInfo: {},
    id_token: '',//方便存在本地的locakStorage
    response: '' //存取返回数据
  },

  userNameInput: function (e) {
    this.setData({
      userName: e.detail.value
    })
  },
  userPasswordInput: function (e) {
    this.setData({
      userPassword: e.detail.value
    })
  },
  logIn: function () {
    var that = this
    wx.request({
      url: App.globalData.Url +'/infor/manager/lionMuscle/login',
      data: {
        userName: this.data.userName,
        userPassword: this.data.userPassword,
      },
      method: 'POST',
      success: function (res) {
        if(res.data.code == 200){
          wx.setStorageSync('access-token',res.data.token)
          wx.showToast({
            title: '登录成功',
          })
          wx.navigateBack({})
        }
        else{
          wx.showToast({
            icon: 'none',
            title: '登录失败',
          })
        }
      },
      fail: function (res) {
        console.log('is failed')
      }
    })
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

  }
})