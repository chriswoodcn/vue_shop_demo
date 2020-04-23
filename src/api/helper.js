import axios from 'axios'
import qs from 'qs'
const load = document.querySelector('.load')
export function request(config = {}) {
  // 请求拦截器
  axios.interceptors.request.use(
    function (config) {
      load.style.display = 'block'
      // eslint-disable-next-line
      let method = config.method.toLocaleLowerCase()
      if (method === 'post') {
        config.data = qs.stringify(config.data)
      } else if (method === 'file') {
        config.method = 'post'
        if (config.data && config.data instanceof Object) {
          const formData = new FormData()
          for (const key in config.data) {
            formData.append(key, config.data[key])
          }
          config.data = formData
        }
      }
      return config
    },
    function (error) {
      return Promise.reject(error)
    }
  )
  // 响应拦截器
  axios.interceptors.response.use(
    function (response) {
      // 对响应数据做点什么
      load.style.display = ''
      return response
    },
    function (error) {
      // 对响应错误做点什么
      return Promise.reject(error)
    }
  )
  return axios.request(config).then((res) => res.data)
}
