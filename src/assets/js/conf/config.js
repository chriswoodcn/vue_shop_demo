const urlMap = {
  development: '/api',
  production: 'http://vueshop.glbuys.com/api'
}
export const URL = urlMap[process.env.NODE_ENV]
export const TOKEN = '1ec949a15fb709370f'
