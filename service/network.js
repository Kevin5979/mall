export default function (options) {
  return new Promise((resolve, reject) => {
    wx.showLoading({
      title: '加载中...',
      mask: true
    })
    wx.request({
      url: options.url,
      method: options.method || 'get',
      data: options.data || {},
      timeout: options.timeout,
      success: (res) => {
        wx.hideLoading({
          fail: () => {}
        })
        resolve(res)
      },
      fail: (res) => {
        wx.hideLoading({
          fail: () => {}
        })
        reject(res)
      },
      complete: () => {
        wx.hideLoading({
          fail: () => {}
        })
      }
    })
  })
}