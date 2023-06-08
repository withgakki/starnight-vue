import request from '@/utils/request'

// 查询学科列表
export function listSubject(query) {
  return request({
    url: '/admin/subject/list',
    method: 'get',
    params: query
  })
}

// 查询所有学科列表
export function listAllSubject() {
  return request({
    url: '/admin/subject/list/all',
    method: 'get'
  })
}

// 查询学科详细
export function getSubject(id) {
  return request({
    url: '/admin/subject/' + id,
    method: 'get'
  })
}

// 新增学科
export function addSubject(data) {
  return request({
    url: '/admin/subject',
    method: 'post',
    data: data
  })
}

// 修改学科
export function updateSubject(data) {
  return request({
    url: '/admin/subject',
    method: 'put',
    data: data
  })
}

// 删除学科
export function delSubject(id) {
  return request({
    url: '/admin/subject/' + id,
    method: 'delete'
  })
}
