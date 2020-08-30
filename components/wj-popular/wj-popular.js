Component({
  properties: {
    popular: {
      type: Array,
      value: []
    }
  },
  methods: {
    popularClick(e) {
      const title = e.currentTarget.dataset.title
      if (title === '新人福利') {
        wx.navigateTo({
          url: '/pages/welfare/welfare'
        })
      } else if (title === '0元抽奖') {
        wx.navigateTo({
          url: '/pages/draw/draw'
        })
      } else if (title === '风格好店') {
        wx.navigateTo({
          url: '/pages/stylestore/stylestore'
        })
      } else {
        wx.navigateTo({
          url: '/pages/search-goods/search-goods?key='+ title,
        })
      }
    }
  }
})