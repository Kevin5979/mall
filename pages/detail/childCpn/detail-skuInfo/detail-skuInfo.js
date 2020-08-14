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
    coupons:{
      type:Array,
      value:[]
    }
  },
  methods: {
    skuInfoClick() {
      const sheet = this.selectComponent("#action-sheet")
      sheet.__showMaster()
    },
    closeSheet() {
      const sheet = this.selectComponent("#action-sheet")
      sheet.__closeMaster()
    },
    addCart(event) {
      let goodsData = event.detail
      goodsData.goodsID = this.data.goodsID
      goodsData.shopID = this.data.shopID
      goodsData.coupons = this.data.coupons
      const result = checkInfo(goodsData, true)
      result && this.closeSheet()
      wx.showToast({
        title: '已添加到购物车'
      })
    },
    goBuy(event) {
      let goodsData = event.detail
      goodsData.goodsID = this.data.goodsID
      goodsData.shopID = this.data.shopID
      goodsData.coupons = this.data.coupons
      const result = checkInfo(goodsData, false)
      result && this.closeSheet()
    }
  }
})