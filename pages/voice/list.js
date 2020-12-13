// pages/voice/list.js
let app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isLoad: false,
    isShow: true,
    title: '治愈电台',
    voiceList: [], // 音频列表

  },
  // 播放音频
  play: function (e) {
    console.log('播放：', e.currentTarget.dataset.id)
    if(!this.data.isShow) {
      wx.navigateTo({
        url: '../detail/detail?id=' + e.currentTarget.dataset.id,
      })
      return;
    }
    wx.navigateTo({
      url: '../play/play?id=' + e.currentTarget.dataset.id,
    })
  },
  // 获取音频列表
  getVoiceList: function () {
    wx.request({
      url: app.globalData.baseUrl + 'wechatApi/public/index.php/voicelist',
      data: {},
      header: {
        'content-type': 'application/json'
      },
      success: (res) => {
        console.log('音频列表接口返回：', res)
        this.setData({
          voiceList: res.data,
          isLoad: true
        })
        console.log(this.data.voiceList)
      }
    })
  },
  // 获取音乐列表
  getVoiceList2: function () {
    wx.request({
      url: app.globalData.baseUrl + 'wechatApi/public/index.php/voicelist2',
      data: {},
      header: {
        'content-type': 'application/json'
      },
      success: (res) => {
        console.log('音乐列表接口返回：', res)
        this.setData({
          voiceList: res.data,
          isLoad: true
        })
        console.log(this.data.voiceList)
      }
    })
  },
  // 获取文章列表
  getVoiceList3: function () {
    wx.request({
      url: app.globalData.baseUrl + 'wechatApi/public/index.php/voicelist3',
      data: {},
      header: {
        'content-type': 'application/json'
      },
      success: (res) => {
        console.log('文章列表接口返回：', res)
        this.setData({
          voiceList: res.data,
          isLoad: true,
          isShow: false
        })
        console.log(this.data.voiceList)
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log('onShow:', options.id);
    // 音频列表
    if (options.id == 1) {
      this.setData({
        title: '治愈电台'
      })
      this.getVoiceList();
    }
    // 音乐列表
    if (options.id == 2) {
      this.setData({
        title: '经典老歌'
      })
      this.getVoiceList2();
    }
    // 文章列表
    if (options.id == 3) {
      this.setData({
        title: '治愈语录'
      })
      this.getVoiceList3();
    }
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