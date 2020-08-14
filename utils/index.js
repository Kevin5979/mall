import addCart from "./addCart"
import buy from "./buy"
/**
 * 检测数据是否合格
 * @param {*} info 数据
 * @param {*} goCart 是否加入购物车
 */
export function checkInfo(info, goCart) {
  const {
    counter,
    size,
    style,
    stock
  } = info
  if (!stock) {
    wx.showToast({
      title: '亲，还未选择商品',
      icon: "none"
    })
    return false
  }
  if (counter >= stock) {
    wx.showToast({
      title: '库存不足,请联系商家',
      icon: "none"
    })
    return false
  }
  if (!size || !style) {
    wx.showToast({
      title: '选项未齐全',
      icon: "none"
    })
    return false
  }

  if (goCart) {
    info.isSelect = false
    addCart(info)
  } else {
    buy(info)
  }
  return true
}

/**
 * 查找并返回数据, 没有则添加
 * @param {*} tempCart 当前购物车
 * @param {*} item 查找的对象
 */
export function checkCart(tempCart, item) {
  for (const [k, v] of Object.entries(tempCart)) {
    if (item.shopID === k) {
      // 该店铺已在购物车
      for (const j of v) {
        // 检测相同规格商品
        if (j.goodsID === item.goodsID && j.style === item.style && j.size === item.size) {
          // 数量 + counter
          j.counter += item.counter
          return tempCart
        }
      }
      // 该店铺中的另一个商品
      v.push(item)
      return tempCart
    }
  }
  // 购物车中添加新店铺和新商品
  tempCart[item.shopID] = []
  tempCart[item.shopID].push(item)
  return tempCart
}