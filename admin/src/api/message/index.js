
import request from '@/utils/request'

// 查询消息列表
export function listMessage(query) {
  return request({
    url: '/admin/message/list',
    method: 'get',
    params: query
  })
}

// 发送消息
export function sendMessage(data) {
  return request({
    url: '/admin/message',
    method: 'post',
    data: data
  })
}

// 删除消息
export function delMessage(id) {
  return request({
    url: '/admin/message/' + id,
    method: 'delete'
  })
}
