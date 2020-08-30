Component({
  properties: {
    sideList: {
      type: Array,
      value: []
    }
  },
  data: {
    currentIndex: 0
  },
  methods: {
    itemClick(event) {
      const index = event.currentTarget.dataset.index
      if (index !== this.data.currentIndex) {
        this.setData({
          currentIndex: index
        })
        this.triggerEvent('sideClick', this.data.sideList[index])
      }
    }
  }
})