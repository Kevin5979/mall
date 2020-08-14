Component({
  properties: {
    tops: {
      type: String //content高度值百分比例
    }
  },
  data: {
    isShowSheet: false,
    openSheet: '',
    contentAnimate: null,
    masterAnimate: null,
  },
  methods: {
    __closeMaster() {
      this.contentAnimate.top("0%").step();
      this.masterAnimate.opacity(0).step();
      this.setData({
        contentAnimate: this.contentAnimate.export(),
        masterAnimate: this.masterAnimate.export(),
      });
      setTimeout(() => {
        this.setData({
          isShowSheet: false,
        })
      }, 250)
    },
    __showMaster() {
      //创建动画  展开
      this.setData({
        isShowSheet: true,
      });
      // 容器上弹
      let contentAnimate = wx.createAnimation({
        duration: 250,
      })
      contentAnimate.top(`-${this.properties.tops}`).step();
      //master透明度
      let masterAnimate = wx.createAnimation({
        duration: 250,
      })
      masterAnimate.opacity(.5).step();
      this.contentAnimate = contentAnimate;
      this.masterAnimate = masterAnimate;
      this.setData({
        contentAnimate: contentAnimate.export(),
        masterAnimate: masterAnimate.export(),
      })
    }
  }
})