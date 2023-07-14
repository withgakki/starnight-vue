import request from '@/utils/request'

// 查询答卷列表
export function listAnswerPaper(query) {
  return request({
    url: '/admin/exampaperanswer/list',
    method: 'get',
    params: query
  })
}

// 删除答卷
export function delAnswerPaper(id) {
  return request({
    url: '/admin/exampaperanswer/' + id,
    method: 'delete'
  })
}
