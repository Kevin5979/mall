import {
  getDrawComment,
  getDrawSwiper
} from "../../service/home"
Page({
  data: {
    currentPage: 1,
    banners: [],
    images: [],
    comments: []
  },

  previewImage(options) {
    wx.previewImage({
      current: options.currentTarget.dataset.img,
      urls: this.data.images
    })
  },

  moreClick() {
    wx.showToast({
      title: '暂无数据',
      icon: "none"
    })
  },
  dianzan() {
    wx.showToast({
      title: '待开发',
      icon: "none"
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this._getDrawComment(this.data.currentPage)
    this._getDrawSwiper()
  },

  // 网络请求
  _getDrawComment(page) {
    if (page > 11) {
      wx.showToast({
        title: "暂无更多数据",
        icon: "none"
      })
      return
    }
    getDrawComment(page).then(res => {
      const comments = res.data.data.comments
      this.setData({
        comments: [...this.data.comments, ...comments]
      })
      this.data.currentPage += 1
    }).catch(err => {
      console.log(err);
    })
  },
  _getDrawSwiper() {
    getDrawSwiper().then(res => {
      let banners = res.data.banners
      let tempImages = []
      banners.forEach(item => {
        tempImages.push(item.image)
      });
      this.setData({
        banners: banners,
        images: tempImages
      })
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {},

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
    this._getDrawComment(this.data.currentPage)
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})