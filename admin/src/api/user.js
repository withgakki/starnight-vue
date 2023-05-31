import request from '@/utils/request'

export function login(data) {
  return request({
    url: '/user/login',
    method: 'post',
    data: data
  })
}

export function logout() {
  return request({
    url: '/user/logout',
    method: 'delete'
  })
}

export function getInfo() {
  return request({
    url: '/user/profile',
    method: 'get',
  })
}

export function updateUserProfile(data) {
  return request({
    url: '/user/profile',
    method: 'put',
    data: data
  })
}

export function updateUserPwd(oldPassword, newPassword) {
  const data = {
    oldPassword,
    newPassword
  }
  return request({
    url: '/user/profile/updatePwd',
    method: 'put',
    params: data
  })
}

export function uploadAvatar(data) {
  return request({
    url: '/user/profile/avatar',
    method: 'post',
    data: data
  })
}
