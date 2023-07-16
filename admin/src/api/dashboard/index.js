import request from '@/utils/request'

// 查询图表数据
export function getDashboardCharts() {
  return request({
    url: '/admin/dashboard/chart',
    method: 'get',
  })
}