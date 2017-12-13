// sign-in.js
const App = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    hasEmptyGrid: false,
    SigninDays:[],
    cur_year:0,
    cur_month:0,
    cur_day:0,
    jsonId:0,
    btnText:'今日打卡',
    bIsRelMonth:true,
    moveStartX:0,
    bIsActionOver:false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const that = this;
    const date = new Date();
    const cur_day = date.getDate();
    const cur_year = date.getFullYear();
    const cur_month = date.getMonth() + 1;
    const weeks_ch = ['日', '一', '二', '三', '四', '五', '六'];

    wx.request({
      url: 'https://api.it120.cc/' + App.globalData.subDomain + '/json/list',
      data: {
        token: App.globalData.token,
        type: cur_year.toString() + cur_month.toString()
      },
      success: function (res) {
        console.log(res);
        var SigninDays = [];
        var jsonId = 0;
        if (res.data.code == 0) {
          SigninDays = res.data.data[0].jsonData.SigninDays;
          jsonId = res.data.data[0].id;
        }
        that.setData({
          SigninDays: SigninDays,
          jsonId: jsonId
        });
        that.calculateEmptyGrids(cur_year, cur_month);
        that.calculateDays(cur_year, cur_month);
        that.setData({
          cur_day: cur_day,
          cur_year: cur_year,
          cur_month: cur_month,
          weeks_ch
        });
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
    return {
      title: '李大力的健身房',
      desc: '经常打卡还可以领免费次卡哦',
      path: 'pages/home/home'
    }
  },
  getThisMonthDays(year, month) {
    return new Date(year, month, 0).getDate();
  },
  getFirstDayOfWeek(year, month) {
    return new Date(Date.UTC(year, month - 1, 1)).getDay();
  },
  calculateEmptyGrids(year, month) {
    const firstDayOfWeek = this.getFirstDayOfWeek(year, month);
    let empytGrids = [];
    if (firstDayOfWeek > 0) {
      for (let i = 0; i < firstDayOfWeek; i++) {
        empytGrids.push(i);
      }
      this.setData({
        hasEmptyGrid: true,
        empytGrids
      });
    } else {
      this.setData({
        hasEmptyGrid: false,
        empytGrids: []
      });
    }
  },
  calculateDays(year, month) {
    let days = [];
    const that = this;
    const date = new Date();
    const rel_day = date.getDate();
    const rel_year = date.getFullYear();
    const rel_month = date.getMonth() + 1;
    const thisMonthDays = this.getThisMonthDays(year, month);

    for (let i = 1; i <= thisMonthDays; i++) {
      let day = {};
      if (rel_year === year && rel_month === month && i === rel_day){
        day.index = '今';
      }
      else{
        day.index = i;
      }
      day.isSignin = this.contains(this.data.SigninDays,i);
      // console.log(day)
      days.push(day);
    }

    this.setData({
      days
    });
  },
  handleCalendar(e) {
    const handle = e.currentTarget.dataset.handle;
    this.handleCalendarEx(handle);
  },
  handleCalendarEx:function(handle){
    const cur_year = this.data.cur_year;
    const cur_month = this.data.cur_month;
    let newMonth, newYear;
    const that = this;
    if (handle === 'prev') {
      newMonth = cur_month - 1;
      newYear = cur_year;
      if (newMonth < 1) {
        newYear = cur_year - 1;
        newMonth = 12;
      }
    } else {
      newMonth = cur_month + 1;
      newYear = cur_year;
      if (newMonth > 12) {
        newYear = cur_year + 1;
        newMonth = 1;
      }
    }
    wx.request({
      url: 'https://api.it120.cc/' + App.globalData.subDomain + '/json/list',
      data: {
        token: App.globalData.token,
        type: newYear.toString() + newMonth.toString()
      },
      success: function (res) {
        console.log(res);
        var SigninDays = [];
        var jsonId = 0;
        if (res.data.code == 0) {
          SigninDays = res.data.data[0].jsonData.SigninDays;
          jsonId = res.data.data[0].id;
        }
        that.setData({
          SigninDays: SigninDays,
          jsonId: jsonId
        });
        that.calculateDays(newYear, newMonth);
        that.calculateEmptyGrids(newYear, newMonth);
        that.setData({
          cur_year: newYear,
          cur_month: newMonth,
        });

        const date = new Date();
        const rel_year = date.getFullYear();
        const rel_month = date.getMonth() + 1;
        if (rel_year !== newYear || rel_month !== newMonth) {
          that.setData({
            btnText: '回到当月',
            bIsRelMonth: false
          })
        }
        else {
          that.setData({
            btnText: '今日打卡',
            bIsRelMonth: true
          })
        }
      }
    });
  },
  contains: function (arr, obj) {  
    var i = arr.length;  
    while(i--) {
      if (arr[i] === obj) {
        return true;
      }
    }
    return false;  
  },
  SigninToday: function(){
    const that = this;
    const date = new Date();
    const cur_day = date.getDate();
    const cur_year = date.getFullYear();
    const cur_month = date.getMonth() + 1;
    var SigninDays = this.data.SigninDays;
    const jsonId = this.data.jsonId;

    if (!this.data.bIsRelMonth){
      wx.request({
        url: 'https://api.it120.cc/' + App.globalData.subDomain + '/json/list',
        data: {
          token: App.globalData.token,
          type: cur_year.toString() + cur_month.toString()
        },
        success: function (res) {
          console.log(res);
          var SigninDays = [];
          var jsonId = 0;
          if (res.data.code == 0) {
            SigninDays = res.data.data[0].jsonData.SigninDays;
            jsonId = res.data.data[0].id;
          }
          that.setData({
            SigninDays: SigninDays,
            jsonId: jsonId
          });
          that.calculateEmptyGrids(cur_year, cur_month);
          that.calculateDays(cur_year, cur_month);
          that.setData({
            cur_day: cur_day,
            cur_year: cur_year,
            cur_month: cur_month,
            btnText: '今日打卡',
            bIsRelMonth: true
          });
        }
      });
      return;
    }

    if (this.contains(SigninDays, cur_day)){
      wx.showToast({
        title: '今日已打过卡~',
        image:'../../images/popup-close.png'
      });
      return;
    }
    SigninDays.push(cur_day);
    var sendjson = {
      "SigninDays": SigninDays
      };

    var data = {};
    if (jsonId !== 0){
      data = {
        token: App.globalData.token,
        type: cur_year.toString() + cur_month.toString(),
        id: jsonId,
        content: JSON.stringify(sendjson),
      }
    }
    else{
      data = {
        token: App.globalData.token,
        type: cur_year.toString() + cur_month.toString(),
        content: JSON.stringify(sendjson),
      }
    }
    wx.request({
      url: 'https://api.it120.cc/' + App.globalData.subDomain + '/json/set',
      data: data,
      success: function (res) {
        console.log(res);
        if (res.data.code == 0) {
          wx.showToast({
            title: '打卡成功',
          });
          that.setData({
            SigninDays: SigninDays,
          });
          that.calculateDays(cur_year, cur_month);
        }
        else{
          wx.showToast({
            title: '打卡失败',
          });
        }
      }
    });
  },
  handletouchend:function(e){

  },
  handletouchmove:function(e){
    const moveEndX = e.touches[0].pageX;
    if (moveEndX - this.data.moveStartX < -40 && !this.data.bIsActionOver) {
      this.handleCalendarEx('next');
      this.data.bIsActionOver = true;
    } else if (moveEndX - this.data.moveStartX > 40 && !this.data.bIsActionOver) {
      this.handleCalendarEx('prev');
      this.data.bIsActionOver = true;
    }
  },
  handletouchstart: function (e) {
    this.data.moveStartX = e.touches[0].pageX;
    this.data.bIsActionOver = false;
  }
})