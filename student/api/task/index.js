import request from '@/config/request.js';

export const getTaskListIndex = () => request.get('/student/taskexam/list/index')
