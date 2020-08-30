import {
  getStoreBanner,
  getStoreList
} from "../../service/home"

Page({
  data: {
    banner1: [],
    banner2: [],
    banner3: [],
    banner4: [],
    tabbars: ['精选好物', '新品速递', '实时女装', '潮流女鞋', '包包配饰', '精致内衣', '风潮男友'],
    currentIndex: 0,
    currentPage: 1,
    listItems: [null, null, null, null, null, null, null]
  },

  onLoad: function (options) {
    this._getStoreBanner()
    this._getStoreList(this.data.currentIndex, this.data.currentPage)
  },

  // 网络请求
  _getStoreBanner() {
    getStoreBanner().then(res => {
      let banner = res.data.data
      this.setData({
        banner1: banner.banner1.list,
        banner2: banner.banner2.list,
        banner3: banner.banner3.list,
        banner4: banner.banner4.list
      })
    }).catch(err => {
      console.log(err);
    })
  },
  _getStoreList(index, page) {
    if (index !== 0) {
      wx.showToast({
        title: '暂无数据',
        icon: 'none'
      })
      return
    }
    if (page > 3) {
      wx.showToast({
        title: '暂无更多数据',
        icon: 'none'
      })
      return
    }
    getStoreList(index, page).then(res => {
      let tempList = this.data.listItems
      let tempItem = tempList[this.data.currentIndex]
      if (tempItem) {
        tempList[this.data.currentIndex] = [...tempItem, ...res.data.data.wall.docs]
      } else {
        tempList[this.data.currentIndex] = res.data.data.wall.docs
      }
      this.setData({
        listItems: tempList,
      })
      this.data.currentPage += 1
    }).catch(err => {
      console.log(err);
    })
  },

  tabClick(event) {
    const index = event.currentTarget.dataset.index
    this.setData({
      currentIndex: index
    })
    this._getStoreList(this.data.currentIndex, this.data.currentPage)
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
    this._getStoreList(this.data.currentIndex, this.data.currentPage)
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})