Component({
  properties: {
    item: {
      type: Array,
      value: [],
      observer(v) {
        this.setData({
          itemData: v
        })
      }
    },
    key: {
      type: String,
      value: 0
    }
  },
  data: {
    isSelectAll: false,
    itemData: []
  },
  methods: {
    // 选择店铺
    selectShop() {
      this.setData({
        isSelectAll: !this.data.isSelectAll
      }, () => {
        let temp = this.data.itemData
        let flag = this.data.isSelectAll
        temp.map(item => {
          item.isSelect = flag
        })
        this.setData({
          itemData: temp
        })
        this.triggerEvent('itemSelect', {
          flag,
          key: this.data.key,
          itemData: temp
        })
      })
    },
    // 检测是否全选
    checkSelectAll() {
      let flag = this.data.itemData.some(item => {
        return item.isSelect === false
      })
      this.triggerEvent('itemSelect', {
        flag: !flag,
        key: this.data.key,
        itemData: this.data.itemData
      })
      this.setData({
        isSelectAll: flag ? false : true
      })
    },
    // 选择单项
    itemSelect(e) {
      let temp = this.data.itemData
      temp[e.detail].isSelect = !temp[e.detail].isSelect
      this.setData({
        itemData: temp
      }, () => {
        this.checkSelectAll()
      })
    },
    // 重新计算
    reCalc(e) {
      const {
        num,
        indey
      } = e.detail
      let temp = this.data.itemData
      temp[indey].counter = num
      this.setData({
        itemData: temp
      })
      this.triggerEvent('recalc', {
        key: this.data.key,
        itemData: temp
      })
    }
  }
})