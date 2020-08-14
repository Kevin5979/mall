// pages/detail/childCpn/detail-good/detail-good.js
Component({
  properties: {
    detailgood: {
      type: Object,
      value: {}
    }
  },
  data: {
    infoImages: [],
    tabItems: ['图文详情', '商品参数', '热卖推荐']
  },
  methods: {
    previewImage(event) {
      const currentImg = 'http:' + event.target.dataset.img
      wx.previewImage({
        current: currentImg,
        urls: this.data.infoImages
      })
    },
    tabClick(event){
      let index = event.detail
      this.triggerEvent("tabclick",index)
    }
  },
  ready() {
    if (this.data.detailgood.detailImage) {
      this.data.detailgood.detailImage[0].list.map(item => {
        this.data.infoImages.push("http:" + item)
      })
    }
  }
})