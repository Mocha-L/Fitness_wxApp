// pages/clock/clock.js
const App = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    axis: [{
        ImgUrl: "../../images/breakfast.jpg",
        flag: false,
        check: false,
        id: "1"
      },
      {
        ImgUrl: "../../images/lunchtime.jpg",
        flag: false,
        check: false,
        id: "2"
      },
      {
        ImgUrl: "../../images/addfood.jpg",
        flag: false,
        check: false,
        id: "3"
      },
      {
        ImgUrl: "../../images/dinner.jpg",
        flag: true,
        check: false,
        id: "4"
      },
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.getqueryCheck();
  },
  toSign() {
    wx.navigateTo({
      url: "/pages/signin/sign-in"　　 // 页面 A
    })
  },
  checkpoint: function(e) {
    var that = this;
    if (e.currentTarget.dataset.item.check) {
      return wx.showToast({
        title: '今日已打过卡~',
        image: '../../images/popup-close.png'
      });
    }
    var arr = [];
    arr = that.data.axis;
    wx.showModal({
      title: '提示',
      content: '去记录一下这顿的食物吧，让我们的教练来进行分析。',
      success: function(res) {
        if (res.confirm) {
          wx.navigateTo({
            url: 'Recordfood?user_id=' + e.currentTarget.dataset.item.id　　 // 页面 A
          })
        } else if (res.cancel) {
          // that.getUserTrain(e.currentTarget.dataset.item.id)
          // arr[e.currentTarget.dataset.index].check = true;
          // that.setData({
          //   axis: arr
          // })
        }
      }
    })
  },
  getUserTrain: function(data) {
    wx.getStorage({
      key: 'access-token',
      success: function(res) {
        wx.request({
          url: App.globalData.Url + '/infor/manager/lionMuscle/userTrainCheck',
          data: {
            type: data,
            "token": res.data,
          },
          method: 'POST',
          success: function(res) {
            console.log(res);
          }
        })
      },
      fail: function(res) {
        wx.navigateTo({
          url: '/pages/login/login',
        })
      }
    })

  },
  getqueryCheck: function() {
    var that = this;
    let Month = new Date().getMonth() + 1;
    let date = new Date().getDate();
    let year = new Date().getFullYear();
    if (Month < 10) {
      Month = "0" + Month
    } else if (date < 10) {
      date = "0" + date;
    }
    let time = year + "-" + Month + "-" + date
    wx.getStorage({
      key: 'access-token',
      success: function(res) {
        wx.request({
          url: App.globalData.Url + '/infor/manager/lionMuscle/queryCheck',
          data: {
            type: "1",
            "token": res.data,
            time: time
          },
          method: 'POST',
          success: function(res) {
            let arr = that.data.axis;
            for (var i in res.data.list){
              for(var j in arr){
                if (res.data.list[i].type == arr[j].id){
                  arr[j].check = true;
                }
              }
            }
            that.setData({
              axis:arr
            })
          }
        })
      },
      fail: function(res) {
        wx.navigateTo({
          url: '/pages/login/login',
        })
      }
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {
    // this.getqueryCheck();
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

  }
})