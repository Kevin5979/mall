const TOKEN = 'token'
App({
  globalData: {
    token: ""
  },
  onLaunch: function () {
    if (!wx.getStorageSync('cart')) {
      wx.setStorageSync('cart', {})
    }
    if (!wx.getStorageSync('isLogin')) {
      wx.setStorageSync('isLogin', false)
    }
    if (!wx.getStorageSync('goodsNumber')) {
      wx.setStorageSync('goodsNumber', 0)
    }

    // 0.先从缓存中取出token
    const token = wx.getStorageSync(TOKEN)
    // 判断token是否有值
    if (token && token.length !== 0) {
      // 验证token是否过期
      this.check_token(token)
    } else {
      this.login()
    }
  },
  // 登录操作
  login() {
    wx.login({
      // code只有5分钟有效期
      success: (res) => {
        // 1.获取code
        const code = res.code
        // 2.将code发送个服务器
        wx.request({
          url: 'http://123.207.32.32:3000/login',
          method: "post",
          data: {
            code
          },
          success: (res) => {
            // 1.取出token
            const token = res.data.token
            // 2.保存token
            this.globalData.token = token
            // 3.本地存储
            wx.setStorageSync(TOKEN, token)
          }
        })
      }
    })
  },
  // 验证token是否过期
  check_token(token) {
    wx.request({
      url: 'http://123.207.32.32:3000/auth',
      method: "post",
      header: {
        token
      },
      success: (res) => {
        if (!res.data.errCode) {
          this.globalData.token = token
        } else {
          this.login()
        }
      },
      fail: (err) => {
        console.log(err);
      }
    })
  }
})