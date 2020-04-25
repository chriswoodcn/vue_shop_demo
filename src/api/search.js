import { request } from './helper'
import { URL, TOKEN } from '../assets/js/conf/config'

// 热门搜索
export function getHotKeywordData() {
  return request(URL + '/home/public/hotwords?token=' + TOKEN)
}

// 搜索商品结果
export function getSearchData(data) {
  const kwords = data.keyword ? data.keyword : ''
  const page = data.page ? data.page : 1
  const otype = data.otype ? data.otype : 'all'
  const cid = data.cid ? data.cid : ''
  const price1 = data.price1 ? data.price1 : ''
  const price2 = data.price2 ? data.price2 : ''
  const param = data.param && data.param !== '[]' ? data.param : ''
  const url =
    URL +
    '/home/goods/search?kwords=' +
    kwords +
    '&param=' +
    param +
    '&page=' +
    page +
    '&price1=' +
    price1 +
    '&price2=' +
    price2 +
    '&otype=' +
    otype +
    '&cid=' +
    cid +
    '&token=' +
    TOKEN
  // console.log(url);
  return request(url)
}

// 商品属性
export function getAttrsData(keyword) {
  return request(URL + '/home/goods/param?kwords=' + keyword + '&token=' + TOKEN)
}
