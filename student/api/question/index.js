import request from '@/config/request.js';

export const listQuestionError = (params) => request.get('/student/exampaperquestionanswer/list', params)
