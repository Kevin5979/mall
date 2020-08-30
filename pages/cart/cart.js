Page({
  data: {
    cart: {},
    selectObj: {},
    isSelectAll: false,
    allPrice: '0.00',
    itemNum: 0
  },
  // 子项选择
  itemSelect(e) {
    const {
      flag,
      key,
      itemData
    } = e.detail
    let temp = this.data.selectObj
    temp[key] = flag
    let temp2 = this.data.cart
    temp2[key] = itemData
    this.setData({
      selectObj: temp,
      cart: temp2
    })
    this.checkSelectAll()
    this.calcPrice()
  },
  // 检测全选
  checkSelectAll() {
    const temp = this.data.selectObj
    let flag = true
    for (const v of Object.values(temp)) {
      if (v === false && flag) {
        flag = false
        this.setData({
          isSelectAll: false
        })
      }
    }
    flag && this.setData({
      isSelectAll: true
    })
  },
  // 全选按钮
  selectAll() {
    this.setData({
      isSelectAll: !this.data.isSelectAll
    })
    const flag = this.data.isSelectAll
    let temp = this.data.cart
    let tempNum = 0
    let tempPrice = 0
    if (flag) {
      for (const v of Object.values(temp)) {
        v.map(item => {
          item.isSelect = flag
          tempNum += 1
          tempPrice += item.price * item.counter
        })
      }
    } else {
      for (const v of Object.values(temp)) {
        v.map(item => {
          item.isSelect = flag
        })
      }
    }
    this.setData({
      cart: temp,
      allPrice: parseFloat(tempPrice).toFixed(2),
      itemNum: tempNum
    }, () => {
      const cartItems = this.selectAllComponents('.cart-item')
      cartItems.map(item => item.checkSelectAll())
    })
  },
  // 计算价格
  calcPrice() {
    let tempPrice = 0
    for (const value of Object.values(this.data.cart)) {
      value.map(item => {
        if (item.isSelect) {
          tempPrice += item.price * item.counter
        }
      })
    }
    this.setData({
      allPrice: parseFloat(tempPrice).toFixed(2)
    })
  },
  // 重新计算
  reCalc(e) {
    const {
      key,
      itemData
    } = e.detail
    let temp = this.data.cart
    temp[key] = itemData
    this.setData({
      cart: temp
    }, () => {
      this.calcPrice()
    })
  },
  // 支付功能
  topay() {
    wx.showToast({
      title: "该功能待开发",
      icon: "none"
    })
  },
  editClick() {
    wx.showToast({
      title: "该功能待开发",
      icon: "none"
    })
  },
  onLoad: function (options) {
    const tempCart = wx.getStorageSync('cart')
    for (const key of Object.keys(tempCart)) {
      this.data.selectObj[key] = false
    }
    this.setData({
      cart: tempCart
    })
  },
  onShow() {
    const tempCart = wx.getStorageSync('cart')
    this.setData({
      cart: tempCart
    })
  },
  onReady: function () {

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