import {
  checkCart
} from "./index"
// 加入购物车数据处理
export default function addCart(data) {
  let tempCart = wx.getStorageSync('cart')
  const tempCart2 = checkCart(tempCart, data)
  let counter = wx.getStorageSync('goodsNumber')
  wx.setStorageSync('goodsNumber', counter + 1)
  wx.setStorageSync('cart', tempCart2)
}