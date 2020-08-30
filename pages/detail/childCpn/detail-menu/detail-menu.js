import {
  checkInfo
} from "../../../../utils/index"
Component({
  options: {
    styleIsolation: "apply-shared"
  },
  properties: {
    skuInfo: {
      type: Object,
      value: {}
    },
    price: {
      type: Number,
      value: 0
    },
    title: {
      type: String,
      value: ""
    },
    shopname: {
      type: String,
      value: ""
    },
    goodsID: {
      type: String,
      value: ""
    },
    shopID: {
      type: String,
      value: ""
    },
    coupons: {
      type: Array,
      value: []
    }
  },
  data: {
    goCart: false,
    isStarred: false
  },
  methods: {
    addCart() {
      this.showSheet()
      this.data.goCart = true
    },
    nowBuy() {
      wx.showToast({
        title: "该功能待开发",
        icon: "none"
      })
    },
    showSheet() {
      const sheet = this.selectComponent("#action-sheet")
      sheet.__showMaster()
    },
    closeSheet() {
      const sheet = this.selectComponent("#action-sheet")
      sheet.__closeMaster()
    },
    goConfirm(event) {
      let goodsData = event.detail
      goodsData.goodsID = this.data.goodsID
      goodsData.shopID = this.data.shopID
      goodsData.coupons = this.data.coupons
      const result = checkInfo(goodsData, this.data.goCart)
      // 关闭弹窗
      result && this.closeSheet()
      if (this.data.goCart) {
        wx.showToast({
          title: '已添加到购物车'
        })
      }
    },
    starred() {
      this.setData({
        isStarred: !this.data.isStarred
      })
      if (this.data.isStarred) {
        wx.showToast({
          title: '已收藏',
          icon: "none"
        })
      } else {
        wx.showToast({
          title: '取消收藏',
          icon: 'none'
        })
      }
    }
  }
})