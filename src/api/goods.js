import { request } from './helper'
import { URL, TOKEN } from '../assets/js/conf/config'
// 左侧分类
export function getClassifyData() {
  return request({ url: URL + '/home/category/menu?token=' + TOKEN })
}

// 右侧商品
export function getGoodsData(cid = '') {
  return request({ url: URL + '/home/category/show?cid=' + cid + '&token=' + TOKEN })
}

// 商品详情
export function getDetailsData(gid = '') {
  return request({ url: URL + '/home/goods/info?gid=' + gid + '&type=details&token=' + TOKEN })
}

// 获取商品规格
export function getSpecData(gid = '') {
  return request({ url: URL + '/home/goods/info?gid=' + gid + '&type=spec&token=' + TOKEN })
}

// 加入收藏
export function addFavData(data) {
  return request({ url: URL + '/goods/fav?uid=' + data.uid + '&gid=' + data.gid + '&token=' + TOKEN + '' })
}

// 获取商品评价
export function getReviewsData(gid = '', page = 1) {
  return request({ url: URL + '/home/reviews/index?gid=' + gid + '&token=' + TOKEN + '&page=' + page })
}
