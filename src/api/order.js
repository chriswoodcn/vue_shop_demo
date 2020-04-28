import { request } from './request'
import { URL, TOKEN } from '../assets/js/conf/config'

// 提交订单
export function addOrderData (data) {
  return request({
    url: URL + '/order/add?token=' + TOKEN,
    method: 'post',
    data
  })
}

// 获取订单编号
export function getOrderNumData (uid) {
  return request({ url: URL + '/order/lastordernum?uid=' + uid + '&token=' + TOKEN })
}

// 我的订单
export function getMyOrderData (data) {
  return request({ url: URL + '/user/myorder/index?uid=' + data.uid + '& status=' + data.status + '&token=' + TOKEN + '&page=' + data.page })
}

// 取消订单
export function cancelOrderData (data) {
  return request({ url: URL + '/user/myorder/clearorder?uid=' + data.uid + '&ordernum=' + data.orderNum + '&token=' + TOKEN + '' })
}

// 确认订单
export function sureOrderData (data) {
  return request({ url: URL + '/user/myorder/finalorder?uid=' + data.uid + '&ordernum=' + data.orderNum + '&token=' + TOKEN })
}

// 获取订单详情
export function getOrderInfoData (data) {
  return request({ url: URL + '/user/myorder/desc?uid=' + data.uid + '&ordernum=' + data.ordernum + '&token=' + TOKEN })
}

// 待评价订单
export function getReviewOrderData (data) {
  return request({ url: URL + '/user/myorder/reviewOrder?uid=' + data.uid + '&page=' + data.page + '&token=' + TOKEN })
}

// 评价项目选项
export function getReviewServiceData () {
  return request({ url: URL + '/home/reviews/service?token=' + TOKEN })
}

// 提交评价
export function addReviewData (data) {
  return request({
    url: URL + '/home/reviews/add?token=' + TOKEN,
    method: 'post',
    data
  })
}
