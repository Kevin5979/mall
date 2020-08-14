// components/wj-solt-bar/wj-solt-bar.js
Component({
  options: {
    multipleSlots: true
  },
  methods: {
    barClick() {
      this.triggerEvent('handleclick')
    }
  }
})