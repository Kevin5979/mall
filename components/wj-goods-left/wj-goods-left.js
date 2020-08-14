Component({
  properties: {
    item: {
      type: Object,
      value: {}
    }
  },
  data: {
    goodsInfo: {}
  },
  methods: {
    itemClick() {
      let iid = this.data.item.iid
      iid && wx.navigateTo({
        url: `/pages/detail/detail?iid=${iid}`
      })
    }
  }
})