import request from '@/utils/request'

// 查询任务列表
export function listTaskexam(query) {
  return request({
    url: '/admin/taskexam/list',
    method: 'get',
    params: query
  })
}

// 查询任务详细
export function getTaskexam(id) {
  return request({
    url: '/admin/taskexam/' + id,
    method: 'get'
  })
}

// 新增任务
export function addTaskexam(data) {
  return request({
    url: '/admin/taskexam',
    method: 'post',
    data: data
  })
}

// 修改任务
export function updateTaskexam(data) {
  return request({
    url: '/admin/taskexam',
    method: 'put',
    data: data
  })
}

// 删除任务
export function delTaskexam(id) {
  return request({
    url: '/admin/taskexam/' + id,
    method: 'delete'
  })
}
