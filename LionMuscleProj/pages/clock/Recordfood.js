// pages/clock/Recordfood.js
const App = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    remank:"",
    evalList: [{ tempFilePaths: [], imgList: [] }],
    id:"",
    picId:""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options.user_id)
    this.setData({
      id: options.user_id
    })
  },


  getUserTrain: function (data) {
    var that = this;
    wx.getStorage({
      key: 'access-token',
      success: function (res) {
        wx.request({
          url: App.globalData.Url + '/infor/manager/lionMuscle/userTrainCheck',
          data: {
            type: that.data.id,
            remark: that.data.remank,
            picId:that.data.picId,
            "token": res.data,
          },
          method: 'POST',
          success: function (res) {
            wx.navigateTo({
              url: '/pages/clock/clock',
            })
          }
        })
      },
    })

  },
  remankInput: function (e) {
    console.log(e.detail.value);
    this.setData({
      remank: e.detail.value
    })
  },

  //添加图片
  joinPicture: function (e) {
    var index = e.currentTarget.dataset.index;
    var evalList = this.data.evalList;
    var that = this;
    var imgNumber = evalList[index].tempFilePaths;
    if (imgNumber.length >= 1) {
      wx.showModal({
        title: '',
        content: '最多上传一张图片',
        showCancel: false,
      })
      return;
    }
    wx.showActionSheet({
      itemList: ["从相册中选择", "拍照"],
      itemColor: "#000",
      success: function (res) {
        if (!res.cancel) {
          if (res.tapIndex == 0) {
            that.chooseWxImage("album", imgNumber);
          } else if (res.tapIndex == 1) {
            that.chooseWxImage("camera", imgNumber);
          }
        }
      }
    })
  },
  chooseWxImage: function (type, list) {
    var img = list;
    var len = img.length;
    var that = this;
    var evalList = this.data.evalList;
    wx.chooseImage({
      count: 3,
      sizeType: ["original", "compressed"],
      sourceType: [type],
      success: function (res) {
        var addImg = res.tempFilePaths;
        wx.getStorage({
          key: 'access-token',
          success: function (res) {
            wx.uploadFile({
              url: App.globalData.Url + '/infor/manager/lionMuscle/checkPic',
              filePath:addImg[0],
              name:"checkPic",
              formData: {
                "token": res.data,
              },
              method: 'POST',
              success: function (res) {
               
                that.setData({
                  picId: JSON.parse(res.data).msg
                })
              }
            })
          },
          fail: function (res) {
            wx.navigateTo({
              url: '/pages/login/login',
            })
          }
        })
        console.log(res.tempFilePaths)
        var addLen = addImg.length;
        if ((len + addLen) > 3) {
          for (var i = 0; i < (addLen - len); i++) {
            var str = {};
            str.pic = addImg[i];
            img.push(str);
          }
        } else {
          for (var j = 0; j < addLen; j++) {
            var str = {};
            str.pic = addImg[j];
            img.push(str);
          }
        }
        that.setData({
          evalList: evalList
        })
        that.upLoadImg(img);
      },
    })
  },
  submit(){
    this.getUserTrain();
    // wx.navigateTo({
    //   url: 'clock?id=111'　　// 页面 A
    // })
  },
  upLoadImg: function (list) {
    var that = this;
    // this.upload(that,list);
  },
  // //多张图片上传
  // upload: function (page, path) {
  //   var that = this;
  //   var curImgList = [];
  //   for (var i = 0; i < path.length; i++) {
  //     wx.showToast({
  //       icon: "loading",
  //       title: "正在上传"
  //     }),
  //       wx.uploadFile({
  //       url: App.globalData.subDomain + '/API/AppletApi.aspx',//接口处理在下面有写
  //         filePath: path[i].pic,
  //         name: 'file',
  //         header: { "Content-Type": "multipart/form-data" },
  //         formData: {
  //           douploadpic: '1'
  //         },
  //         success: function (res) {
  //           curImgList.push(res.data);
  //           var evalList = that.data.evalList;
  //           evalList[0].imgList = curImgList;
  //           that.setData({
  //             evalList: evalList
  //           })
  //           if (res.statusCode != 200) {
  //             wx.showModal({
  //               title: '提示',
  //               content: '上传失败',
  //               showCancel: false
  //             })
  //             return;
  //           }
  //           var data = res.data
  //           page.setData({  //上传成功修改显示头像
  //             src: path[0]
  //           })
  //         },
  //         fail: function (e) {
  //           wx.showModal({
  //             title: '提示',
  //             content: '上传失败',
  //             showCancel: false
  //           })
  //         },
  //         complete: function () {
  //           wx.hideToast();  //隐藏Toast
  //         }
  //       })
    // }
  // },
  //删除图片
  clearImg: function (e) {
    var index = e.currentTarget.dataset.index;
    var evalList = this.data.evalList;
    var img = evalList[0].tempFilePaths;
    img.splice(index, 1);
    this.setData({
      evalList: evalList
    })
    this.upLoadImg(img);
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
    wx.getStorage({
      key: 'access-token',
      fail: function (res) {
        wx.redirectTo({
          url: '/pages/login/login',
        })
      }
    })
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