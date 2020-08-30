import config from './config'
import request from './network.js'

// 每日热搜
export function getHotWord() {
  return request({
    url: 'https://list.mogu.com/module/mget?code=sketch%2ChotWord',
    timeout: config.timeout
  })
}