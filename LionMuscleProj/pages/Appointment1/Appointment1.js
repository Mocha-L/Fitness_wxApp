// pages/Appointment1/Appointment1.js
const App = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    categories: [],
    list: [],
    dataTime: ""
  },

  getTimeArr() {
    let TimeArr = [];
    let Date_ = new Date().valueOf();
    let weekList = ["周天", "周一", "周二", "周三", "周四", "周五", "周六"];
    for (let x = 0; x <= 6; x++) {
      let Month = new Date(Date_ + 86400000 * x).getMonth() + 1;
      let date_ = new Date(Date_ + 86400000 * x).getDate();
      let week = weekList[new Date(Date_ + 86400000 * x).getDay()];
      let year = new Date(Date_ + 86400000 * x).getFullYear();
      if (Month < 10) {
        Month = "0" + Month;
      }
      if (date_ < 10) {
        date_ = "0" + date_;
      }
      let data = {
        week: week,
        date: Month + "-" + date_,
        time: year + "-" + Month + "-" + date_,
        flag: false
      };
      TimeArr.push(data);
      TimeArr[0].flag = true;
      this.setData({
        categories: TimeArr,
      })
    }
  },


  tabClick(e) {
    let arr = []
    for (let item in this.data.categories) {
      this.data.categories[item].flag = false;
    }
    this.data.categories[e.currentTarget.dataset.index].flag = true;
    let dataStr = this.data.categories[e.currentTarget.dataset.index].time;
    this.ChooseTime(dataStr)
    this.setData({
      categories: this.data.categories,
      dataTime: dataStr
    })
  },

  ChooseTime(data) {
    var that = this;
    let Month2 = new Date().getMonth() + 1;
    let date2_ = new Date().getDate();
    let year2 = new Date().getFullYear();
    let dataTime = year2 + '-' + Month2 + '-' + date2_;
    wx.getStorage({
      key: 'access-token',
      success: function(res) {
        wx.request({
          url: App.globalData.Url + '/infor/manager/lionMuscle/subcribeTrain',
          data: {
            "time": data || dataTime,
            "token": res.data
          },
          method: 'POST',
          success: function(res) {
            that.setData({
              list: res.data.list,
              dataTime: data || dataTime
            })
          },
          fail: function(res) {
            console.log('is failed')
          }
        })
      },
      fail: function (res) {
        console.log(res);
        wx.navigateTo({
          url: '/pages/login/login'　　// 页面 A
        })
      }
    })

  },

  Appointment(e) {
    var that = this;
    wx.getStorage({
      //获取数据的key
      key: 'access-token',
      success: function (res) {
        wx.showModal({
          title: '提示',
          content: '请确认一下预约信息：\r\n[日期]' + that.data.dataTime + '\r\n[时间]' + e.currentTarget.dataset.item.time + '\r\n点击确认发起预约',
          success: function (modal_res) {
            if (modal_res.confirm) {
              wx.request({
                url: App.globalData.Url + '/infor/manager/lionMuscle/userSubcribeTrain',
                data: {
                  Id: e.currentTarget.dataset.item.Id,
                  token: res.data,
                  time: that.data.dataTime
                },
                method: 'POST',
                success: function (res) {
                  wx.showToast({
                    title: res.data.msg,  //标题
                    duration: 2000, //提示的延迟时间，单位毫秒，默认：1500
                    mask: false,  //是否显示透明蒙层，防止触摸穿透，默认：false
                  })
                }
              })
            } else if (modal_res.cancel) {
            }
          }
        })
        
      },
      /**
       * 失败会调用
       */
      fail: function (res) {
        console.log(res);
        wx.navigateTo({
          url: '/pages/login/login'　　// 页面 A
        })
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.getTimeArr();
    console.log(this.data.dataTime)
    this.ChooseTime();
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

  }
})