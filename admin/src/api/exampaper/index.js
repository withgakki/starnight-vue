import request from '@/utils/request'

// 查询试卷列表
export function listExampaper(query) {
  return request({
    url: '/admin/exampaper/list',
    method: 'get',
    params: query
  })
}

// 查询任务试卷列表
export function listByTaskExamPaper(query) {
  return request({
    url: '/admin/exampaper/list/taskexampaper',
    method: 'get',
    params: query
  })
}

// 查询试卷详细
export function getExampaper(id) {
  return request({
    url: '/admin/exampaper/' + id,
    method: 'get'
  })
}

// 新增试卷
export function addExampaper(data) {
  return request({
    url: '/admin/exampaper',
    method: 'post',
    data: data
  })
}

// 随机新增试卷
export function addRandomExampaper(data) {
  return request({
    url: '/admin/exampaper/random',
    method: 'post',
    data: data
  })
}

// 修改试卷
export function updateExampaper(data) {
  return request({
    url: '/admin/exampaper',
    method: 'put',
    data: data
  })
}

// 删除试卷
export function delExampaper(id) {
  return request({
    url: '/admin/exampaper/' + id,
    method: 'delete'
  })
}
