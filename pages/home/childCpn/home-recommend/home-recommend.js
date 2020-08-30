// pages/home/childCpn/wj-recommend/wj-recommend.js
Component({
  properties: {
    list: {
      type: Array,
      value: []
    }
  },
  methods: {
    recommendClick() {
      wx.showToast({
        title: '暂无数据',
        icon: "none"
      })
    }
  }
})