import {
  getHotWord
} from '../../../../service/search'
Component({
  data: {
    keyWorks: [],
    colors: [],
    placeholder: ''
  },

  methods: {
    searchClick() {
      wx.navigateTo({
        url: '/pages/search/search?data=' + JSON.stringify(this.data)
      })
    },
    moreClick() {
      wx.showToast({
        title: '待开发',
        icon: "none"
      })
    },
    messageClick() {
      wx.showToast({
        title: '待开发',
        icon: "none"
      })
    }
  },
  created: function () {
    getHotWord().then(res => {
      let keyWorks = []
      let colors = []
      res.data.data.hotWord.data.forEach(element => {
        colors.push(element.color)
        keyWorks.push(element.frontword)
      })

      this.setData({
        placeholder: keyWorks[0],
        keyWorks,
        colors
      })
    }).catch(err => {
      console.log(err);
    })
  }
})