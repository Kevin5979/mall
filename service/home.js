import config from './config'
import request from './network.js'

// 首页数据
export function getMultiData() {
  return request({
    url: config.baseURL2 + 'home/multidata',
    timeout: config.timeout
  })
}

export function getGoodsData(type, page) {
  return request({
    url: config.baseURL2 + `home/data/${type}/${page}`,
    timeout: config.timeout
  })
}