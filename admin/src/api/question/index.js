import request from '@/utils/request'

// 查询题目列表
export function listQuestion(query) {
  return request({
    url: '/admin/question/list',
    method: 'get',
    params: query
  })
}

// 查询题目详细
export function getQuestion(id) {
  return request({
    url: '/admin/question/' + id,
    method: 'get'
  })
}

// 新增题目
export function addQuestion(data) {
  return request({
    url: '/admin/question',
    method: 'post',
    data: data
  })
}

// 修改题目
export function updateQuestion(data) {
  return request({
    url: '/admin/question',
    method: 'put',
    data: data
  })
}

// 删除题目
export function delQuestion(id) {
  return request({
    url: '/admin/question/' + id,
    method: 'delete'
  })
}
