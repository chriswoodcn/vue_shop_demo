/*eslint-disable*/
import axios from 'axios'

const load = document.querySelector('.load')

export function request (config = {}) {
  load.style.display = 'block'
  return axiosRequest(config)
}

function axiosRequest (config = {}) {
  let url = config.url
  let method = config.method || 'get'
  let data = config.data
  if (method.toLowerCase() === 'post') {
    if (data instanceof Object) {
      let params = new URLSearchParams()
      for (let key in data) {
        params.append(key, data[key])
      }
      data = params
    }
  } else if (method.toLowerCase() === 'file') {
    method = 'post'
    if (data instanceof Object) {
      let params = new FormData()
      for (let key in data) {
        params.append(key, data[key])
      }
      data = params
    }
  }
  let axiosConfig = {
    url: url,
    method: method.toLowerCase(),
    data: data
  }
  if (config.config instanceof Object) {
    for (let key in config.config) {
      axiosConfig[key] = config.config[key]
    }
  }
  return axios(axiosConfig).then(res => {
    load.style.display = 'none'
    return res.data
  })
}
