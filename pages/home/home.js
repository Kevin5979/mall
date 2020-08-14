// pages/home/home.js
import {
  getMultiData,
  getGoodsData
} from '../../service/home.js'

const types = ['pop', 'new', 'sell']
const backTop = 1000

Page({
  data: {
    banners: [],
    recommends: [],
    popular: "",
    titles: ["流行", "新款", "精选"],
    goods: {
      pop: {
        page: 0,
        list: []
      },
      new: {
        page: 0,
        list: []
      },
      sell: {
        page: 0,
        list: []
      }
    },
    currentType: 'pop',
    showBackTop: false,
    isTabFixed: false,
    tabScrollTop: 0
  },
  handleClick(event) {
    const index = event.detail;
    this.setData({
      currentType: types[index]
    })
  },
  onLoad: function (options) {
    // 请求 轮播图/推荐 数据
    this._getMultiData()
    this._getGoodsData('pop')
    this._getGoodsData('new')
    this._getGoodsData('sell')
  },
  /** 网络请求 */
  _getMultiData() {
    getMultiData().then(res => {
      const banners = res.data.data.banner.list.map(item => item.image)
      const recommends = res.data.data.recommend.list
      const popular = res.data.data.popular.list
      this.setData({
        banners,
        recommends,
        popular
      })
    }).catch(err => {
      wx.showToast({
        title: '数据错误',
        icon: "none",
        duration: 2000
      })
    })
  },
  _getGoodsData(type) {
    // 获取页码
    const page = this.data.goods[type].page + 1
    // 发送请求
    getGoodsData(type, page).then(res => {
      if (res.data.data.isEnd) {
        wx.showToast({
          title: 'o(╥﹏╥)o 没有更多数据了',
          icon: "none",
          mask: true,
          duration: 2000
        })
        return false
      }
      const list = res.data.data.list
      const oldList = this.data.goods[type].list
      oldList.push(...list)
      const typeKey = `goods.${type}.list`
      const pageKey = `goods.${type}.page`
      this.setData({
        [typeKey]: oldList,
        [pageKey]: page
      })
    }).catch(err => {
      wx.showToast({
        title: '数据错误',
        icon: "none",
        mask: true,
        duration: 2000
      })
    })
  },

  // 生命周期函数--监听页面初次渲染完成
  onReady: function () {},

  // 生命周期函数--监听页面显示
  onShow: function () {},

  // 生命周期函数--监听页面隐藏
  onHide: function () {},

  //生命周期函数--监听页面卸载
  onUnload: function () {},

  // 页面相关事件处理函数--监听用户下拉动作
  onPullDownRefresh: function () {},

  // 页面上拉触底事件的处理函数
  onReachBottom: function () {
    this._getGoodsData(this.data.currentType)
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

  // 用户点击右上角分享
  onShareAppMessage: function () {}
})