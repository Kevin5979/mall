Component({
  externalClasses:['ext-class'],
  properties: {
    titles: {
      type: Array,
      value: []
    }
  },
  data: {
    currentindex: 0
  },
  methods: {
    tabClick(event) {
      let index = event.target.dataset.index
      this.setData({
        currentindex: index
      })
      this.triggerEvent('itemClick', index)
    }
  }
})