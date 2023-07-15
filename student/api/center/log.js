import request from '@/config/request.js';

// 获取操作日志
export const listOperLog = () => request.get('/student/usereventlog/list')