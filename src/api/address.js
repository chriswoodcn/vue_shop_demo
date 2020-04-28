import { request } from './request'
import { URL, TOKEN } from '../assets/js/conf/config'

// 收货地址列表
export function getAddresData (uid) {
  return request({ url: URL + '/user/address/index?uid=' + uid + '&token=' + TOKEN })
}

// 删除收货地址
export function delAddressData (params) {
  return request({ url: URL + '/user/address/del?uid=' + params.uid + '&aid=' + params.aid + '&token=' + TOKEN })
}

// 添加收货地址
export function addAddressData (params) {
  console.log(params)
  return request({
    url: URL + '/user/address/add?token=' + TOKEN,
    method: 'post',
    data: params
  })
}

// 收货地址详情
export function getAddressInfoData (params) {
  return request({ url: URL + '/user/address/info?uid=' + params.uid + '&aid=' + params.aid + '&token=' + TOKEN })
}

// 修改收货地址
export function modAddressData (params) {
  return request({
    url: URL + '/user/address/mod?token=' + TOKEN,
    method: 'post',
    data: params
  })
}

// 获取默认地址
export function getDefaultAddressData (uid) {
  return request({ url: URL + '/user/address/defaultAddress?uid=' + uid + '&token=' + TOKEN })
}
