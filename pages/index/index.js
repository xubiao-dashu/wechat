//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    StatusBar: app.globalData.StatusBar,
    CustomBar: app.globalData.CustomBar,
    motto: 'Hi 开发者！',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    cardCur: 0,
    swiperList: [],
    // swiperList: [{
    //   id: 0,
    //   type: 'image',
    //   url: 'https://www.daxuzhan.top/static/04.jpg'
    // }, {
    //   id: 1,
    //   type: 'image',
    //   url: 'https://www.daxuzhan.top/static/02.jpg',
    // }, {
    //   id: 2,
    //   type: 'image',
    //   url: 'https://www.daxuzhan.top/static/03.jpg'
    // }, {
    //   id: 3,
    //   type: 'image',
    //   url: 'https://www.daxuzhan.top/static/05.jpg'
    // }],
    voiceList: [], // 推荐列表
  },
  //事件处理函数
  bindViewTap: function () {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  // 播放音频
  play: function (e) {
    console.log('播放：', e.currentTarget.dataset.id)
    wx.navigateTo({
      url: '../play/play?id=' + e.currentTarget.dataset.id,
    })
  },
  // 轮播跳转
  toUrl: function (e) {
    console.log('跳转：', e)
    this.data.swiperList.map((item) => {
      if (item.id == e.currentTarget.dataset.id) {
        wx.navigateTo({
          url: item.content,
        });
      }
    });
    // wx.navigateTo({
    //   url: e.currentTarget.dataset.to,
    // })
  },
  success: function(e) {
    console.log('success：', e);
  },
  error: function(e) {
    console.log('fail：', e);
  },
  // 获取轮播列表(推荐)
  getLunList: function () {
    wx.request({
      url: app.globalData.baseUrl + 'wechatApi/public/index.php/lunlist',
      data: {},
      header: {
        'content-type': 'application/json'
      },
      success: (res) => {
        console.log('轮播列表接口返回：', res)
        let list = [];
        res.data.map((item) => {
          list.push({
            id: item.id,
            type: 'image',
            url: item.imgurl,
            content: item.content
          });
        });
        this.setData({
          swiperList: list,
        });
      }
    })
  },
  // 获取音频列表(推荐)
  getVoiceList: function () {
    wx.request({
      url: app.globalData.baseUrl + 'wechatApi/public/index.php/voicelist4',
      data: {},
      header: {
        'content-type': 'application/json'
      },
      success: (res) => {
        console.log('音频列表接口返回：', res)
        this.setData({
          voiceList: res.data,
        })
        console.log(this.data.voiceList)
      }
    })
  },
  // 执行路由跳转
  enter: function (e) {
    if (e.currentTarget.dataset.id == 4) {
      wx.showToast({
        title: '正在建设中，敬请期待',
        icon: 'none',
        duration: 2000
      })
      return;
    }
    wx.navigateTo({
      url: '../voice/list?id=' + e.currentTarget.dataset.id,
    })
  },
  onLoad: function () {
    this.getLunList();
    this.getVoiceList();
    this.towerSwiper('swiperList');
    // 初始化towerSwiper 传已有的数组名即可
    // if (app.globalData.userInfo) {
    //   this.setData({
    //     userInfo: app.globalData.userInfo,
    //     hasUserInfo: true
    //   })
    // } else if (this.data.canIUse){
    //   // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
    //   // 所以此处加入 callback 以防止这种情况
    //   app.userInfoReadyCallback = res => {
    //     this.setData({
    //       userInfo: res.userInfo,
    //       hasUserInfo: true
    //     })
    //   }
    // } else {
    //   // 在没有 open-type=getUserInfo 版本的兼容处理
    //   wx.getUserInfo({
    //     success: res => {
    //       app.globalData.userInfo = res.userInfo
    //       this.setData({
    //         userInfo: res.userInfo,
    //         hasUserInfo: true
    //       })
    //     }
    //   })
    // }
  },
  DotStyle(e) {
    this.setData({
      DotStyle: e.detail.value
    })
  },
  // cardSwiper
  cardSwiper(e) {
    this.setData({
      cardCur: e.detail.current
    })
  },
  // towerSwiper
  // 初始化towerSwiper
  towerSwiper(name) {
    let list = this.data[name];
    for (let i = 0; i < list.length; i++) {
      list[i].zIndex = parseInt(list.length / 2) + 1 - Math.abs(i - parseInt(list.length / 2))
      list[i].mLeft = i - parseInt(list.length / 2)
    }
    this.setData({
      swiperList: list
    })
  },
  // towerSwiper触摸开始
  towerStart(e) {
    this.setData({
      towerStart: e.touches[0].pageX
    })
  },
  // towerSwiper计算方向
  towerMove(e) {
    this.setData({
      direction: e.touches[0].pageX - this.data.towerStart > 0 ? 'right' : 'left'
    })
  },
  // towerSwiper计算滚动
  towerEnd(e) {
    let direction = this.data.direction;
    let list = this.data.swiperList;
    if (direction == 'right') {
      let mLeft = list[0].mLeft;
      let zIndex = list[0].zIndex;
      for (let i = 1; i < list.length; i++) {
        list[i - 1].mLeft = list[i].mLeft
        list[i - 1].zIndex = list[i].zIndex
      }
      list[list.length - 1].mLeft = mLeft;
      list[list.length - 1].zIndex = zIndex;
      this.setData({
        swiperList: list
      })
    } else {
      let mLeft = list[list.length - 1].mLeft;
      let zIndex = list[list.length - 1].zIndex;
      for (let i = list.length - 1; i > 0; i--) {
        list[i].mLeft = list[i - 1].mLeft
        list[i].zIndex = list[i - 1].zIndex
      }
      list[0].mLeft = mLeft;
      list[0].zIndex = zIndex;
      this.setData({
        swiperList: list
      })
    }
  }
  // getUserInfo: function(e) {
  //   console.log(e)
  //   app.globalData.userInfo = e.detail.userInfo
  //   this.setData({
  //     userInfo: e.detail.userInfo,
  //     hasUserInfo: true
  //   })
  // }
})