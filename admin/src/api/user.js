import request from '@/utils/request'

export function login(data) {
  return request({
    url: '/user/login',
    method: 'post',
    data
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
    url: '/user/profile/info',
    method: 'get',
  })
}
