import config from './config'
import request from './network.js'

// 分类侧边栏数据
export function getSideBarData(iid) {
  return request({
    url: config.baseURL2 + 'category',
    timeout: config.timeout
  })
}

// 获取各个分类数据
export function getSideItemData(maitKey) {
  return request({
    url: config.baseURL2 + `subcategory/maitKey/${maitKey}`,
    timeout: config.timeout
  })
}

// 获取分类数据详情
export function getCategoryDetail(miniWallkey, type) {
  return request({
    url: config.baseURL + 'subcategory/detail',
    data: {
      miniWallkey,
      type
    }
  })
}