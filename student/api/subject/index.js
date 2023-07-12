import request from '@/config/request.js';

export const listSubject = () => request.get('/student/subject/list')