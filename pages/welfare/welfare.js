import {
  getNewWelfare
} from "../../service/home"
let app = getApp()
const backTop = 1000

Page({
  data: {
    currentPage: 1,
    docs: [],
    showBackTop: false
  },
  topClick() {
    const userInfo = wx.getStorageSync("userInfo")
    app.globalData.prePage = "/pages/welfare/welfare"
    if (userInfo) {
      wx.showToast({
        title: '待开发',
        icon: "none"
      })
    } else {
      wx.switchTab({
        url: '/pages/profile/profile'
      })
    }
  },
  onLoad: function (options) {
    this._getNewWelfare()
  },
  // 网络请求
  _getNewWelfare() {
    const page = this.data.currentPage
    if (page > 7) {
      wx.showToast({
        title: '没有更多数据了',
        icon: "none"
      })
      return
    }
    getNewWelfare(page).then(res => {
      const tempDocs = res.data.data.wall.docs
      this.setData({
        docs: [...this.data.docs, ...tempDocs]
      })
      this.data.currentPage += 1
    }).catch(err => {
      console.log(err);
    })
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
   * 监听用户滚动
   */
  onPageScroll(options) {
    const scrollTop = options.scrollTop
    const flag = scrollTop >= backTop
    if (flag != this.data.showBackTop) {
      this.setData({
        showBackTop: flag
      })
    }
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
    this._getNewWelfare()
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})