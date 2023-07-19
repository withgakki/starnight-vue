import request from '@/config/request.js';

export const listQuestionError = (params) => request.get('/student/exampaperquestionanswer/list', params)

export const gptGptQuestionAnalyze = (id) => request.get(`/student/question/analyze/${id}`)
