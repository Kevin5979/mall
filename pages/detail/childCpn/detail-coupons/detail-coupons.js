import {
  sheetHeight
} from "../../../../utils/config"
Component({
  properties: {
    coupons: {
      type: Array,
      value: []
    }
  },
  data: {
    sheetHeight: 0
  },
  methods: {
    couponsClick() {
      const sheet = this.selectComponent("#action-sheet")
      sheet.__showMaster()
    },
    complete() {
      const sheet = this.selectComponent("#action-sheet")
      sheet.__closeMaster()
    },
    getCoupons(){
      wx.showToast({
        title: '待完善',
        icon:"none"
      })
    }
  },
  ready() {
    wx.nextTick(() => {
      if (this.data.coupons.length) {
        let length = this.data.coupons.length
        if (length > 0) {
          this.setData({
            sheetHeight: sheetHeight[length - 1]
          })
        }
      }
    })
  }
})