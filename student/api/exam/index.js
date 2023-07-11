import request from '@/config/request.js';

export const getExamListIndex = () => request.get('/student/exampaper/list/index')

export const getExamInfo = (id) => request.get(`/student/exampaper/${id}`)

export const submitAnswer = (params) => request.post('/student/exampaperanswer/submit', params)
