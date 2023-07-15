import request from '@/utils/request'

// 查询日志列表
export function listUserLog(query) {
  return request({
    url: '/admin/usereventlog/list',
    method: 'get',
    params: query
  })
}
