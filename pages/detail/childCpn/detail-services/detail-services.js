Component({
  options: {
    styleIsolation: "apply-shared"
  },
  properties: {
    services: {
      type: Array,
      value: []
    }
  },
  data: {
    sheetHeight: "60%"
  },
  methods: {
    servicesClick() {
      const sheet = this.selectComponent("#action-sheet")
      sheet.__showMaster()
    },
    closeSheet() {
      const sheet = this.selectComponent("#action-sheet")
      sheet.__closeMaster()
    }
  }
})