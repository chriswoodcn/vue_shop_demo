import { request } from './request'
import { BAIDU_URL } from '../assets/js/conf/config'

// 百度地图逆地理编码接口
export function getLocationInfo (location) {
  if (location.lat !== 0 && location.lng !== 0) {
    return request({ url: BAIDU_URL + '/?ak=zb18k7Sn55uUauHn9xqqFp0mjI5AntYx&output=json&coordtype=wgs84ll&location=' + location.lat + ',' + location.lng })
  } else {
    throw new Error('没有传递正确坐标')
  }
}
