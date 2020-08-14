// components/wj-back-top/wj-back-top.js
Component({
  methods: {
    handleBackTop() {
      wx.pageScrollTo({
        scrollTop: 0
      })
      this.triggerEvent('backtop')
    }
  }
})