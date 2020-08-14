import {
  getSideBarData,
  getSideItemData,
  getCategoryDetail
} from "../../service/category"
Page({
  data: {
    sideList: [],
    itemList: [],
    goods: [],
    currentMaitKey: "3627",
    currentMiniWallkey: "10062603"
  },
  sideClick(evnet) {
    const maitKey = evnet.detail.maitKey
    const miniWallkey = evnet.detail.miniWallkey
    this._getSideItemData(maitKey)
    this._getCategoryDetail(miniWallkey)
  },
  onLoad: function (options) {
    this._getSideBarData()
    this._getSideItemData(this.data.currentMaitKey)
    this._getCategoryDetail()
  },

  // 获取分类列表
  _getSideBarData() {
    getSideBarData().then(res => {
      const category = res.data.data.category
      this.setData({
        sideList: category.list
      })
    })
  },

  // 获取各分类的数据
  _getSideItemData(maitKey) {
    if (!maitKey) {
      maitKey = this.data.sideList[0].maitKey
    }
    getSideItemData(maitKey).then(res => {
      this.setData({
        itemList: res.data.data.list
      })
    })
  },
  // 获取分类子项详情
  _getCategoryDetail(miniWallkey, type = 'pop') {
    if (!miniWallkey) {
      miniWallkey = this.data.currentMiniWallkey
    }
    getCategoryDetail(miniWallkey, type).then(res => {
      this.setData({
        goods: res.data
      })
    })
  },


  onReady: function () {

  },
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