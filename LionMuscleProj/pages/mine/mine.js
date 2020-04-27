// mine.js
const App = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    hidePopup: true,
    phoneNumber: '请输入',
    userInfo: {},
    flag: false,
    items: [{
        icon: '../../images/mine/Fingerprint.png',
        text: '每日打卡',
        path: '/pages/signin/sign-in'
      },
      {
        icon: '../../images/mine/vip.png',
        text: '我的会员',
        path: ''
      },
      {
        icon: '../../images/mine/support.png',
        text: '联系客服',
        path: '17817282605',
      },
    ],
    settings: [{
      icon: '../../images/mine/About-Us.png',
      text: '关于我们',
      path: '/pages/articles-detail/index?id=8732'
    }, ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    // this.getUserInfo();
    var that = this;
    wx.getStorage({
      //获取数据的key
      key: 'access-token',
      success:function(res){
        that.setData({
          flag: true,
        })
      },
      fail: function(res){
        that.setData({
          flag: false,
        })
      }
    })
    console.log(this.data.flag)
  },
  // getUserInfo() {
  //   var that = this;
  //   wx.getUserInfo({
  //     success: function(res) {
  //       that.setData({
  //         flag: true,
  //         userInfo:res.userInfo
  //       })
  //     }
  //   })
  // },


  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    // console.log(this.data.flag);
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
    return {
      title: "狮子会健身俱乐部",
      path: "/pages/home/home"
    }
  },
  //获取用户信息
  // getUserInfo:function() {
  //   var userInfo = App.globalData.userInfo
  //   var that = this;

  //   if (userInfo) {
  //     that.setData({
  //       userInfo: userInfo
  //     })
  //     return
  //   }

  //   // userInfo = App.getUserInfo();
  //   console.log(userInfo);
  //   that.setData({
  //     userInfo: userInfo
  //   })
  // },

  getUserShow: function(e) {
    App.registerUser();
    // this.getUserInfo();
  },
  navigateTo: function(e) {
    const index = e.currentTarget.dataset.index;
    const path = e.currentTarget.dataset.path;
    switch (index) {
      case 1:
        // this.showPopupTap();
        break;
      case 2:
        wx.makePhoneCall({
          phoneNumber: path
        })
        break;
      default:
        console.log(path);
        // console.log(typeof path);
        wx.navigateTo({
          url: path
        });
    };
  },

  closePopupTap: function() {
    this.setData({
      hidePopup: true
    })
  },
  showPopupTap: function() {
    this.setData({
      hidePopup: false
    })
  },
  formSubmit: function(e) {
    console.log(e);
    const phoneNumber = e.detail.value.phoneNumber;
    if (phoneNumber.length != 11 && phoneNumber.length != 8) {
      wx.showModal({
        title: '提示',
        content: '电话号码不正确，请确认后重新输入。',
      });
      return;
    }
    this.setData({
      phoneNumber: e.detail.value.phoneNumber
    });
    wx.setStorageSync({
      key: "phoneNumber",
      data: phoneNumber
    });
    this.closePopupTap();
  },
})

/*
import __config from '../../etc/config'
const App = getApp()

Page({
	data: {
		userInfo: {},
		items: [
			{
				icon: '../../assets/images/iconfont-order.png',
				text: '我的订单',
				path: '/pages/order/list/index'
			},
			{
				icon: '../../assets/images/iconfont-addr.png',
				text: '收货地址',
				path: '/pages/address/list/index'
			},
			{
				icon: '../../assets/images/iconfont-kefu.png',
				text: '联系客服',
        path: '400-0728-156',
			},
			{
				icon: '../../assets/images/iconfont-help.png',
				text: '常见问题',
				path: '/pages/help/list/index',
			},
		],
		settings: [
			{
				icon: '../../assets/images/iconfont-clear.png',
				text: '清除缓存',
				path: '0.0KB'
			},
			{
				icon: '../../assets/images/iconfont-about.png',
				text: '关于我们',
				path: '/pages/about/index'
			},
		]
	},
	onLoad() {
		this.getUserInfo()
		this.getStorageInfo()
	},
	navigateTo(e) {
		const index = e.currentTarget.dataset.index
		const path = e.currentTarget.dataset.path

		switch(index) {
			case 2:
				App.WxService.makePhoneCall({
					phoneNumber: path
				})
				break
			default:
				App.WxService.navigateTo(path)
		}
    },
    getUserInfo() {
    	const userInfo = App.globalData.userInfo

		if (userInfo) {
			this.setData({
				userInfo: userInfo
			})
			return
		}

		App.getUserInfo()
		.then(data => {
			console.log(data)
			this.setData({
				userInfo: data
			})
		})
    },
    getStorageInfo() {
    	App.WxService.getStorageInfo()
    	.then(data => {
    		console.log(data)
    		this.setData({
    			'settings[0].path': `${data.currentSize}KB`
    		})
    	})
    },
    bindtap(e) {
    	const index = e.currentTarget.dataset.index
		const path = e.currentTarget.dataset.path

		switch(index) {
			case 0:
				App.WxService.showModal({
		            title: '友情提示',
		            content: '确定要清除缓存吗？',
		        })
		        .then(data => {
              if(data.confirm == 1)
              {
                App.WxService.clearStorage()
                this.signIn()
              }
            })
				break
			default:
				App.WxService.navigateTo(path)
		}
    },
    // logout() {
    // 	App.WxService.showModal({
    //         title: '友情提示',
    //         content: '确定要登出吗？',
    //     })
    //     .then(data => data.confirm == 1 && this.signOut())
    // },
    // signOut() {
    // 	App.HttpService.signOut()
    // 	.then(data => {
    // 		console.log(data)
    // 		if (data.meta.code == 0) {
    // 			App.WxService.removeStorageSync('token')
    // 			App.WxService.redirectTo('/pages/login/index')
    // 		}
    // 	})
    // },
    signIn() {
      if (App.WxService.getStorageSync('token')) return
      App.HttpService.signIn({
        username: __config.loginItem.name,
        password: __config.loginItem.psw,
      })
        .then(data => {
          console.log(data)
          if (data.meta.code == 0) {
            App.WxService.setStorageSync('token', data.data.token)
          }
        })
    },
})
 */