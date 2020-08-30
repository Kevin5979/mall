import {
  getGoodsInfo,
  getRecommend
} from '../../service/goodsDetail'
const backTop = 1000
Page({
  data: {
    showBackTop: false,
    topImages: [], // 轮播图
    titles: {}, // 标题
    coupons: [], // 优惠券
    services: [], // 服务
    skuInfo: {}, // 商品参数
    comment: {}, // 买家评价
    shop: {}, // 店铺
    detailgood: {}, // 商品详情
    info: {}, // 产品参数
    rule: {}, // 产品尺寸
    recommend: [], // 推荐数据
    toIndex: "null",
    scrollHeight: 0,
    goodsID: null,
    shopID: null
  },
  tabClick(event) {
    const index = event.detail
    
    if (index === 0) {
      this.setData({
        toIndex: "detail-goods"
      })
    } else if (index === 1) {
      this.setData({
        toIndex: "detail-info"
      })
    } else {
      this.setData({
        toIndex: "detail-recommend"
      })
    }
  },
  viewScroll(event) {
    const scrollTop = event.detail.scrollTop
    const flag = scrollTop >= backTop
    if (flag != this.data.showBackTop) {
      this.setData({
        showBackTop: flag
      })
    }
  },
  backTop() {
    this.setData({
      scrollHeight: 0
    })
  },

  onLoad: function (options) {
    // getGoodsInfo("1m70y5k").then(res => {
      getGoodsInfo(options.iid).then(res => {
      const result = res.data.result
      const info = result.itemInfo
      const shopInfo = result.shopInfo
      const skuInfo = result.skuInfo
      const tempTitles = {
        discountDesc: info.discountDesc,
        lowNowPrice: info.lowNowPrice,
        oldPrice: info.oldPrice,
        title: info.title,
        address: info.extra.sendAddress
      }

      let tempCoupons = []
      if (result.promotions) {
        tempCoupons = result.promotions.list
      }

      const tempServices = shopInfo.services.map(item => item.name)

      const labels = skuInfo.props.map(item => item.label).join(',').replace(/,|:/g, ' ')
      const list = skuInfo.props.map(item => item.list)
      const skus = skuInfo.skus

      const tempSkuInfo = {
        labels,
        list,
        skus
      }

      const tempStop = {
        name: shopInfo.name,
        cFans: shopInfo.cFans,
        cGoods: shopInfo.cGoods,
        cSells: shopInfo.cSells,
        shopLogo: shopInfo.shopLogo,
        score: shopInfo.score
      }

      const tempDetailInfo = {
        desc: result.detailInfo.desc,
        detailImage: result.detailInfo.detailImage
      }

      this.setData({
        topImages: info.topImages,
        titles: tempTitles,
        coupons: tempCoupons,
        services: tempServices,
        skuInfo: tempSkuInfo,
        comment: result.rate,
        shop: tempStop,
        detailgood: tempDetailInfo,
        info: result.itemParams.info,
        rule: result.itemParams.rule ? result.itemParams.rule : '',
        goodsID: res.data.iid,
        shopID: shopInfo.shopId
      })
    }).catch(err => {
      wx.showToast({
        title: '暂无该商品数据',
        icon: "none",
        complete() {
          setTimeout(() => {
            wx.navigateBack()
          }, 1500)
        }
      })
      console.log(err);
    })
    getRecommend().then(res => {
      this.setData({
        recommend: res.data.data.list
      })
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

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
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})