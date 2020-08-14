// components/wj-goods-right/wj-goods-right.js
Component({
  properties: {
    item: {
      type: Object,
      value: {}
    }
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