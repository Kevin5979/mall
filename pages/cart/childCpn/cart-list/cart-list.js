Component({
  properties: {
    value: {
      type: Object,
      value: {},
      observer(v) {
        this.setData({
          listValue: v
        })
      }
    },
    indey: {
      type: Number,
      value: 0
    },
    key: {
      type: String,
      value: ""
    },
    isSelectAll: {
      type: Boolean,
      value: false
    }
  },
  data: {
    listValue: {}
  },
  methods: {
    toDetail(event) {
      const iid = event.target.dataset.iid
      iid && wx.navigateTo({
        url: `/pages/detail/detail?iid=${iid}`
      })
    },
    // 数量加减
    handleNumber(event) {
      const num = event.detail
      const indey = this.data.indey
      this.triggerEvent('recalc', {
        num,
        indey
      })
    },
    // 选择商品
    selectGood() {
      this.setData({
        'listValue.isSelect': !this.data.listValue.isSelect
      })
      this.triggerEvent('itemSelect', this.data.indey)
    },
  },
  ready() {}
})