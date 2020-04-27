const urlMap = {
  development: '/api',
  production: 'http://vueshop.glbuys.com/api'
}
const baiduUrlMap = {
  development: '/baiduapi',
  production: 'http://api.map.baidu.com/reverse_geocoding/v3'
}
export const URL = urlMap[process.env.NODE_ENV]
export const TOKEN = '1ec949a15fb709370f'
export const BAIDU_URL = baiduUrlMap[process.env.NODE_ENV]
