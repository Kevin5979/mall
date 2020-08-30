import {
  getHotWord
} from "../../service/search"

Page({
  data: {
    placeholder: "",
    keyWorks: [],
    colors: [],
    isFocus: true,
    init: false,
    searchHistory: []
  },

  toggleClick() {
    if (!this.data.init) {
      this.data.init = true
      let searchHistory = wx.getStorageSync('searchHistory')
      if (!searchHistory) {
        wx.setStorageSync('searchHistory', [])
      } else {
        this.setData({
          searchHistory
        })
      }
      return
    }
    this.setData({
      isFocus: !this.data.isFocus
    })
  },

  inputClick(event) {
    this.setData({
      placeholder: event.detail.value
    })
  },

  itemClick(event) {
    let item = event.currentTarget.dataset.item
    this.setData({
      placeholder: item
    })
    this.toSearch()
  },

  delete() {
    wx.setStorageSync('searchHistory', [])
    this.setData({
      searchHistory: []
    })
  },

  toSearch() {
    let item = this.data.placeholder
    let history = this.data.searchHistory
    let index = history.indexOf(item)
    if (index !== -1) {
      history.splice(index, 1)
    }
    history.unshift(item)
    this.setData({
      searchHistory: history
    })
    wx.setStorageSync('searchHistory', history)
    wx.navigateTo({
      url: '/pages/search-goods/search-goods?key=' + this.data.placeholder,
    })
  },

  onLoad: function (options) {
    if (options.data) {
      const {
        placeholder,
        colors,
        keyWorks
      } = JSON.parse(options.data)
      this.setData({
        placeholder,
        keyWorks,
        colors
      })
    } else {
      this.setData({
        placeholder: options.placeholder
      })
      getHotWord().then(res => {
        let keyWorks = []
        let colors = []
        res.data.data.hotWord.data.forEach(item => {
          keyWorks.push(item.frontword)
          colors.push(item.color)
        })
        this.setData({
          keyWorks,
          colors
        })
      }).catch(err => {
        console.log(err);
      })
    }
  },

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