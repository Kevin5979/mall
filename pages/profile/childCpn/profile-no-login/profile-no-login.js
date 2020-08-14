Component({
  properties: {

  },

  data: {

  },

  methods: {
    toLogin(e) {
      const userInfo = e.detail.userInfo
      if (userInfo) {
        wx.setStorageSync('isLogin', true)
        wx.setStorageSync('userInfo', userInfo)
        this.triggerEvent('tologin')
      } else {
        wx.setStorageSync('isLogin', false)
      }
    },
    otherLogin() {
      wx.showToast({
        title: '暂不支持该登录方式',
        icon: "none"
      })
    }
  }
})