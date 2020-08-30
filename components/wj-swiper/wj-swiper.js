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
      if( /https:/.test(options.currentTarget.dataset.img)){
        return
      }
      wx.previewImage({
        current: options.currentTarget.dataset.img,
        urls: this.data.images
      })
    }
  }
})