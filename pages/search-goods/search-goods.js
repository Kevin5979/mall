import {
  getPopularData
} from "../../service/home"
const backTop = 1000

Page({
  data: {
    key: "",
    searchQuery: {
      cKey: 46,
      sort: 'pop',
      page: 1,
      q: '',
      minPrice: null,
      maxPrice: null
    },
    list: [],
    selectIndex: 0,
    showBackTop: false
  },

  onLoad: function (options) {
    this.setData({
      key: options.key,
      'searchQuery.q': options.key
    })
    this._getPopularData(this.data.searchQuery)
  },

  // 网络请求
  _getPopularData(data) {
    getPopularData(data).then(res => {
      const list = [...this.data.list, ...res.data.result.wall.docs]
      this.setData({
        list
      })
    }).catch(err => {
      console.log(err);
    })
  },

  toCart() {
    wx.switchTab({
      url: '/pages/cart/cart',
    })
  },

  itemClick(event) {
    let index = event.target.dataset.index
    let sort = this.data.searchQuery.sort
    if (index == 0) {
      sort = 'pop'
    } else if (index == 1) {
      sort = 'sell'
    } else {
      sort = 'new'
    }
    this.setData({
      selectIndex: index,
      'searchQuery.list': [],
      'searchQuery.sort': sort,
      'searchQuery.page': 1
    })
    this._getPopularData(this.data.searchQuery)
  },

  selectPrice() {
    wx.showToast({
      title: '未开发',
      icon: "none"
    })
  },

  focusClick() {
    wx.navigateTo({
      url: '/pages/search/search?placeholder=' + this.data.key
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
    let page = this.data.searchQuery.page
    page += 1
    this.setData({
      'searchQuery.page': page
    })
    this._getPopularData(this.data.searchQuery)
  },
  // 监听页面滚动
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
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})