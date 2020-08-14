Component({
  properties: {
    skuInfo: {
      type: Object,
      value: {},
      observer(newVal) {
        if (newVal.labels && newVal.list) {
          let tempData = {
            labels: [],
            list: []
          }
          tempData.labels = newVal.labels.split(' ').filter(item => item !== '')
          tempData.list = newVal.list
          tempData.skus = newVal.skus
          this.setData({
            showData: tempData
          })
        }
        if (newVal.skus) {
          this.setData({
            currentImage: newVal.skus[0].img,
            currentStock: newVal.skus[0].stock
          })
        }
      }
    },
    price: {
      type: Number,
      value: 0
    },
    confirm: {
      type: String,
      value: "add"
    },
    title: {
      type: String,
      value: "",
      observer(newVal) {
        this.data.totalSelect.title = newVal
      }
    },
    shopname: {
      type: String,
      value: "",
      observer(newVal) {
        this.data.totalSelect.shopname = newVal
      }
    }
  },
  data: {
    showData: {},
    currentImage: "",
    currentStock: 0,
    buyNum: 1,
    selectItems: [],
    isSelect: false,
    selectStyle: "",
    selectSize: "",
    totalSelect: {
      style: null,
      size: null,
      counter: 1,
      price: null,
      stock: null,
      img: null,
      title: null,
      shopname: null
    }
  },
  methods: {
    closeSheet() {
      this.triggerEvent('closeSheet')
    },
    handleNumber(event) {
      this.data.buyNum = event.detail
      this.setData({
        'totalSelect.counter': this.data.buyNum
      })
    },
    // 加入购物车
    addCart() {
      this.triggerEvent('addcart', this.data.totalSelect)
    },
    // 立即购买
    goBuy() {
      this.triggerEvent('gobuy', this.data.totalSelect)
    },
    // 确认按钮
    goConfirm() {
      this.triggerEvent('goconfirm', this.data.totalSelect)
    },
    itemClick(event) {
      const {
        index,
        indey,
        value
      } = event.target.dataset
      if (!this.data.isSelect) {
        this.setData({
          isSelect: true
        })
      }

      if (value.type === "size") {
        this.setData({
          selectSize: value.name,
          'totalSelect.size': value.name
        })
      }
      if (value.type === "style") {
        let tempArr = this.data.showData.skus.find(item => {
          return item.style === value.name
        })
        this.setData({
          currentImage: tempArr.img,
          price: tempArr.nowprice / 100,
          currentStock: tempArr.stock,
          selectStyle: tempArr.style,
          'totalSelect.img': tempArr.img,
          'totalSelect.price': tempArr.nowprice / 100,
          'totalSelect.stock': tempArr.stock,
          'totalSelect.style': tempArr.style,
        })
      }
      let temp = this.data.selectItems
      if (temp[index]) {
        temp[index].fill(0)
        temp[index][indey] = 1
      }
      this.setData({
        selectItems: temp
      })
    }
  },
  ready() {
    let labelsLen = null
    if (this.data.showData.labels) {
      labelsLen = this.data.showData.labels.length
    }
    let tempArray = []
    for (let i = 0; i < labelsLen; i++) {
      let listLen = this.data.showData.list[i].length
      let tempArr = new Array(listLen).fill(0)
      tempArray.push(tempArr)
    }
    this.setData({
      selectItems: tempArray
    })
  }
})