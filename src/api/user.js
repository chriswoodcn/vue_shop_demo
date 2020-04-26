import { request } from './helper'
import { URL, TOKEN } from '../assets/js/conf/config'

// 会员登录
export function loginData (data) {
  return request({
    url: URL + '/home/user/pwdlogin?token=' + TOKEN,
    method: 'post',
    data
  })
}

// 会员安全认证
export function safeUserData (data) {
  return request({
    url: URL + '/home/user/safe?token=' + TOKEN,
    method: 'post',
    data
  })
}

// 安全退出
export function safeOutLoginData (data) {
  return request({
    url: URL + '/home/user/safeout?token=' + TOKEN,
    method: 'post',
    data
  })
}

// 检测图文验证码是否正确
export function checkVCodeData (vcode) {
  return request({
    url: URL + '/home/user/checkvcode?token=' + TOKEN,
    method: 'post',
    data:
      {
        vcode: vcode
      }
  })
}

// 是否注册过会员
export function isRegData (username) {
  return request({
    url: URL + '/home/user/isreg?token=' + TOKEN,
    method: 'post',
    data: {
      username: username
    }
  })
}

// 会员注册
export function regUserData (data) {
  return request({
    url: URL + '/home/user/reg?token=' + TOKEN,
    method: 'post',
    data
  })
}

// 获取会员信息
export function getUserInfoData (uid) {
  return request({ url: URL + '/user/myinfo/userinfo/uid/' + uid + '?token=' + TOKEN })
}

// 上传头像
export function uploadHeadData (data) {
  return request({
    url: URL + '/user/myinfo/formdatahead?token=' + TOKEN,
    method: 'file',
    data
  })
}

// 修改会员信息
export function updateUserInfoData (data) {
  return request({
    url: URL + '/user/myinfo/updateuser?token=' + TOKEN,
    method: 'post',
    data
  })
}

// 修改手机号
export function updateCellphoneData (data) {
  return request({
    url: URL + '/user/myinfo/updatecellphone?token=' + TOKEN,
    method: 'post',
    data
  })
}

// 修改密码
export function updatePasswordData (data) {
  return request({
    url: URL + '/user/myinfo/modpwd?token=' + TOKEN,
    method: 'post',
    data
  })
}

// 我的收藏
export function getFavData (data) {
  return request({ url: URL + '/user/fav/index?uid=' + data.uid + '&token=' + TOKEN + '&page=' + data.page + '' })
}

// 删除收藏
export function delFavData (data) {
  return request({ url: URL + '/user/fav/del?uid=' + data.uid + '&fid=' + data.fid + '&token=' + TOKEN })
}
