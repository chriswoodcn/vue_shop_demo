import { request } from './helper'
import { URL, TOKEN } from '../assets/js/conf/config'

export function getNavsData() {
  return request({
    url: URL + '/home/index/nav?token=' + TOKEN
  }).then((res) => {
    if (res.code === 200) {
      return res
    } else {
      console.error('获取数据失败!')
    }
  })
}

export function getSwiperData() {
  return request({
    url: URL + '/home/index/slide?token=' + TOKEN
  }).then((res) => {
    if (res.code === 200) {
      return res
    } else {
      console.error('获取数据失败!')
    }
  })
}

export function getGoodsData() {
  return request({
    url: URL + '/home/index/goodsLevel?token=' + TOKEN
  }).then((res) => {
    if (res.code === 200) {
      return res
    } else {
      console.error('获取数据失败!')
    }
  })
}

export function getRecomGoodsData() {
  return request({
    url: URL + '/home/index/recom?token=' + TOKEN
  }).then((res) => {
    if (res.code === 200) {
      return res
    } else {
      console.error('获取数据失败!')
    }
  })
}
