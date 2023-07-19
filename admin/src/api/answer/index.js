import request from '@/utils/request'

// 查询答卷列表
export function listAnswerPaper(query) {
  return request({
    url: '/admin/exampaperanswer/list',
    method: 'get',
    params: query
  })
}

// 查询答卷详细
export function getAnswerPaper(id) {
  return request({
    url: '/admin/exampaperanswer/' + id,
    method: 'get'
  })
}

// 人工批改答卷
export function judgeAnswerPaper(data) {
  return request({
    url: '/admin/exampaperanswer/judge',
    method: 'put',
    data: data
  })
}

// 智能批改答卷
export function judgeAnswerPaperAuto(id) {
  return request({
    url: '/admin/exampaperanswer/judge/' + id,
    method: 'put',
  })
}

// 删除答卷
export function delAnswerPaper(id) {
  return request({
    url: '/admin/exampaperanswer/' + id,
    method: 'delete'
  })
}
