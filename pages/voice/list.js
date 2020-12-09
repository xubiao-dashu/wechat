// pages/voice/list.js
let app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    voiceList: [], // 音频列表

  },
  // 播放音频
  play: function(e) {
    console.log('播放：', e.currentTarget.dataset.id)
    
    wx.navigateTo({
      url: '../play/play?id='+ e.currentTarget.dataset.id,
    })
  },
  // 获取音频列表
  getVoiceList: function() {
    wx.request({
      url: app.globalData.baseUrl+'wechatApi/public/index.php/voicelist',
      data: {},
      header: {
        'content-type': 'application/json'
      },
      success: (res) => {
        console.log('列表接口返回：', res)
        this.setData({
          voiceList: res.data
        })
        console.log(this.data.voiceList)
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      this.getVoiceList();
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