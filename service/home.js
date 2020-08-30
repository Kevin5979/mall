import config from './config'
import request from './network.js'

// 首页数据
export function getMultiData() {
  return request({
    url: config.baseURL2 + 'home/multidata',
    timeout: config.timeout
  })
}

// 商品数据
export function getGoodsData(type, page) {
  return request({
    url: config.baseURL2 + `home/data/${type}/${page}`,
    timeout: config.timeout
  })
}

// 每周推荐
export function getPopularData(data) {
  return request({
    url: config.baseURL3,
    data,
    timeout: config.timeout
  })
}

// 新人福利
export function getNewWelfare(page) {
  return request({
    url: config.baseURL2 + 'popular/589246/' + page,
    timeout: config.timeout
  })
}

// 0元抽奖
export function getDrawSwiper() {
  return request({
    url: config.baseURL2 + 'draw/banner',
    timeout: config.timeout
  })
}

// 0元抽奖评论
export function getDrawComment(page) {
  return request({
    url: config.baseURL2 + 'draw/595775/' + page,
    timeout: config.timeout
  })
}

// 风格好店列表
export function getStoreBanner() {
  return request({
    url: config.baseURL2 + 'stylestore/swiper',
    timeout: config.timeout
  })
}

// 风格好店商品展示
export function getStoreList(index,page) {
  return request({
    url: config.baseURL2 + `stylestore/list/${index}/${page}`,
    timeout: config.timeout
  })
}