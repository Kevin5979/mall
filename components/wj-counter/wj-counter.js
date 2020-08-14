Component({
  properties: {
    num: {
      type: Number,
      value: 1,
      observer(newVal) {
        this.setData({
          currentNumber: newVal
        })
      }
    }

  },
  data: {
    currentNumber: 1
  },
  methods: {
    handleSub() {
      if (this.data.currentNumber <= 1) {
        return
      } else {
        this.setData({
          currentNumber: this.data.currentNumber - 1
        })
        this.triggerEvent("handlenumber", this.data.currentNumber)
      }
    },
    handleAdd() {
      this.setData({
        currentNumber: this.data.currentNumber + 1
      })
      this.triggerEvent("handlenumber", this.data.currentNumber)
    }
  }
})