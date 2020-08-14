Component({
  properties: {
    list: {
      type: Array,
      value: [],
      observer: function (newVal) {
        newVal.map(item => {
          if (item.extraInfo) {
            item.extraInfo = item.extraInfo.join(",")
          }
          if (item.images) {
            this.data.images = item.images.map(item => 'http:' + item)
            
          }
        })
      }
    }
  },
  data: {
    images: []
  },
  methods: {
    previewImage(options) {
      wx.previewImage({
        current: options.target.dataset.img,
        urls: this.data.images
      })
    }
  }
})