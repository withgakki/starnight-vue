import request from '@/config/request.js';

export const listMessage = (params) => request.get('/student/messageuser/list', params)

export const getUnReadCount = () => request.get('/student/messageuser/unread/count')

export const readOneMessage = (id) => request.post(`/student/messageuser/read/${id}`)
