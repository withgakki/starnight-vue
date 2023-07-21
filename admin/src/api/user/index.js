import request from '@/utils/request'

// 查询用户列表
export function listUser(query) {
  return request({
    url: '/admin/user/list',
    method: 'get',
    params: query
  })
}

// 查询用户详细
export function getUser(id) {
  return request({
    url: '/admin/user/' + id,
    method: 'get'
  })
}

// 新增用户
export function addUser(data) {
  return request({
    url: '/admin/user',
    method: 'post',
    data: data
  })
}

// 修改用户
export function updateUser(data) {
  return request({
    url: '/admin/user',
    method: 'put',
    data: data
  })
}

// 删除用户
export function delUser(id) {
  return request({
    url: '/admin/user/' + id,
    method: 'delete'
  })
}

// 修改用户状态
export function updateUserStatus(id) {
  return request({
    url: '/admin/user/status/' + id,
    method: 'put',
  })
}

// 搜索用户
export function searchUser(keyword) {
  return request({
    url: '/admin/user/search',
    method: 'get',
    params: { keyword }
  })
}
