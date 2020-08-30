let app = getApp()
Page({
  data: {
    isLogin: false,
    goodsNumber: 0
  },
  toLogin() {
    const prePage = app.globalData.prePage
    if (prePage) {
      wx.redirectTo({
        url: prePage
      })
    } else {
      wx.switchTab({
        url: '/pages/home/home'
      })
    }
    this.setData({
      isLogin: true
    })
  },
  exitLogin() {
    wx.setStorageSync('isLogin', false)
    wx.removeStorageSync('userInfo')
    this.setData({
      isLogin: false
    })
  },

  toCart() {
    wx.switchTab({
      url: '/pages/cart/cart'
    })
  },

  onLoad: function (options) {
    const isLogin = wx.getStorageSync('isLogin')
    const userInfo = wx.getStorageSync('userInfo')
    this.setData({
      isLogin,
      userInfo
    })
  },
  onShow: function (options) {
    const goodsNumber = wx.getStorageSync('goodsNumber')
    this.setData({
      goodsNumber
    })
  },
  onHide: function () {

  },
  onUnload: function () {

  },

  onPullDownRefresh: function () {

  },
  onReachBottom: function () {

  },
  onShareAppMessage: function () {

  }
})