Component({
  options: {
    styleIsolation: "apply-shared"
  },
  properties: {
    titles: {
      type: Object,
      value: {}
    }
  },
  methods: {
    helpClick() {
      wx.showToast({
        title: '待开发',
        icon: "none"
      })
    }
  }
})