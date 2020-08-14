import config from './config'
import request from './network.js'

// 商品详情数据
export function getGoodsInfo(iid) {
  return request({
    url: config.baseURL + 'detail',
    timeout: config.timeout,
    data: {
      iid
    }
  })
}

// 推荐数据
export function getRecommend() {
  return request({
    url: config.baseURL + 'recommend',
    timeout: config.timeout
  })
}