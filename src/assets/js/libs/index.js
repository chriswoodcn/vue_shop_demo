import echo from './echo'

function lazyImg() {
  echo.init({
    offset: 0, // 可视区域多少像素被加载
    throttle: 0 // 设置图片延迟加载时间
  })
}
export default {
  lazyImg
}
