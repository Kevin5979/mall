Component({
  externalClasses: ['detail-swiper'],
  properties: {
    list: {
      type: Array,
      value: [],
      observer: function (newVal) {
        this.data.images = newVal.map(item => 'http:' + item)
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