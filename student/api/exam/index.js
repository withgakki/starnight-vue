import request from '@/config/request.js';

export const getExamListIndex = () => request.get('/student/exampaper/list/index')

export const getExamInfo = (id) => request.get(`/student/exampaper/${id}`)

export const submitAnswer = (params) => request.post('/student/exampaperanswer/submit', params)

export const listAnswerInfo = (params) => request.get('/student/exampaperanswer/list', params)

export const getAnswerInfo = (id) => request.get(`/student/exampaperanswer/${id}`)
